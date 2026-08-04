import { supabase, checkSupabaseConnection } from './supabase';
import {
  idbGetAllProducts,
  idbSaveProducts,
  idbSaveProduct,
  idbDeleteProduct,
  idbGetAllEntities,
  idbSaveEntities,
  idbSaveEntity,
  idbDeleteEntity,
  idbGetAllSales,
  idbSaveSale,
  idbGetAllFinances,
  idbSaveFinance,
  idbGetAllInstallments,
  idbSaveInstallments,
  idbGetSyncQueue,
  idbRemoveFromSyncQueue,
  idbAddToSyncQueue,
} from './offlineDb';
import { Product, Entity, Sale, Finance, Installment, SyncQueueItem } from '../types';

export async function initialDataLoad(): Promise<{
  isOnline: boolean;
  products: Product[];
  entities: Entity[];
  sales: Sale[];
  finances: Finance[];
  installments: Installment[];
}> {
  const isOnline = await checkSupabaseConnection();

  if (isOnline) {
    try {
      // Load Products
      const { data: remoteProducts } = await supabase.from('produtos').select('*').order('nome');
      const products: Product[] = remoteProducts || [];
      if (products.length > 0) {
        await idbSaveProducts(products);
      }

      // Load Entities
      const { data: remoteEntities } = await supabase.from('entidades').select('*').order('nome_completo');
      const entities: Entity[] = remoteEntities || [];
      if (entities.length > 0) {
        await idbSaveEntities(entities);
      }

      // Load Sales
      const { data: remoteSales } = await supabase.from('vendas').select('*').order('created_at', { ascending: false }).limit(100);
      const sales: Sale[] = remoteSales || [];
      for (const sale of sales) {
        await idbSaveSale(sale);
      }

      // Load Finances
      const { data: remoteFinances } = await supabase.from('financas').select('*').order('created_at', { ascending: false });
      const finances: Finance[] = remoteFinances || [];
      for (const fin of finances) {
        await idbSaveFinance(fin);
      }

      // Load Installments
      const { data: remoteInstallments } = await supabase.from('parcelas').select('*').order('data_vencimento');
      const installments: Installment[] = remoteInstallments || [];
      if (installments.length > 0) {
        await idbSaveInstallments(installments);
      }

      return { isOnline: true, products, entities, sales, finances, installments };
    } catch {
      // Fallback to offline DB if network fails during query
    }
  }

  // Offline or Supabase unavailable: read from IndexedDB
  const products = await idbGetAllProducts();
  const entities = await idbGetAllEntities();
  const sales = await idbGetAllSales();
  const finances = await idbGetAllFinances();
  const installments = await idbGetAllInstallments();

  return { isOnline: false, products, entities, sales, finances, installments };
}

/**
 * Flush pending sync queue to Supabase when connection restores
 */
export async function flushSyncQueue(): Promise<{ syncedCount: number; errorsCount: number }> {
  const queue = await idbGetSyncQueue();
  if (queue.length === 0) return { syncedCount: 0, errorsCount: 0 };

  const isOnline = await checkSupabaseConnection();
  if (!isOnline) return { syncedCount: 0, errorsCount: queue.length };

  let syncedCount = 0;
  let errorsCount = 0;

  for (const item of queue) {
    try {
      let err = null;
      if (item.action === 'insert') {
        const { error } = await supabase.from(item.table_name).insert([item.data]);
        err = error;
      } else if (item.action === 'update') {
        const { error } = await supabase.from(item.table_name).update(item.data).eq('id', item.data.id);
        err = error;
      } else if (item.action === 'delete') {
        const { error } = await supabase.from(item.table_name).delete().eq('id', item.data.id);
        err = error;
      }

      if (!err) {
        await idbRemoveFromSyncQueue(item.id);
        syncedCount++;
      } else {
        errorsCount++;
      }
    } catch {
      errorsCount++;
    }
  }

  return { syncedCount, errorsCount };
}

/**
 * Sync helper when creating or updating a product
 */
export async function syncSaveProduct(product: Product, isOnline: boolean): Promise<void> {
  await idbSaveProduct(product);

  if (isOnline) {
    // Ensure product payload matches Supabase schema
    const payload: any = { ...product };
    // If ID is not a valid UUID format (e.g. client temp string), remove it so Supabase assigns gen_random_uuid() or format as UUID
    const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(product.id);
    if (!isUuid) {
      delete payload.id;
    }

    const { data: savedData, error } = await supabase.from('produtos').upsert([payload]).select().single();
    if (error) {
      console.warn('Supabase product upsert error:', error.message);
      await idbAddToSyncQueue({
        id: `prod_${Date.now()}_${Math.random()}`,
        table_name: 'produtos',
        action: 'update',
        data: payload,
        timestamp: Date.now(),
      });
    } else if (savedData && savedData.id !== product.id) {
      // Update local storage with the generated UUID from Supabase
      const updatedProduct = { ...product, id: savedData.id };
      await idbSaveProduct(updatedProduct);
    }
  } else {
    await idbAddToSyncQueue({
      id: `prod_${Date.now()}_${Math.random()}`,
      table_name: 'produtos',
      action: 'update',
      data: product,
      timestamp: Date.now(),
    });
  }
}

/**
 * Sync helper when deleting a product
 */
export async function syncDeleteProduct(id: string, isOnline: boolean): Promise<void> {
  await idbDeleteProduct(id);

  if (isOnline) {
    await supabase.from('produtos').delete().eq('id', id);
  } else {
    await idbAddToSyncQueue({
      id: `del_prod_${Date.now()}`,
      table_name: 'produtos',
      action: 'delete',
      data: { id },
      timestamp: Date.now(),
    });
  }
}

import { openDB, DBSchema, IDBPDatabase } from 'idb';
import { Product, Entity, Sale, Finance, Installment, EcommerceOrder, StoreConfig, SyncQueueItem } from '../types';

interface SupermarketERPDB extends DBSchema {
  products: {
    key: string;
    value: Product;
    indexes: { 'by-barcode': string; 'by-category': string };
  };
  entities: {
    key: string;
    value: Entity;
    indexes: { 'by-cpf': string; 'by-type': string };
  };
  sales: {
    key: string;
    value: Sale;
    indexes: { 'by-date': string; 'by-origin': string };
  };
  finances: {
    key: string;
    value: Finance;
    indexes: { 'by-type': string; 'by-status': string };
  };
  installments: {
    key: string;
    value: Installment;
    indexes: { 'by-finance': string; 'by-status': string; 'by-due': string };
  };
  ecommerce_orders: {
    key: string;
    value: EcommerceOrder;
    indexes: { 'by-status': string; 'by-date': string };
  };
  comprovantes: {
    key: string;
    value: { id: string; filename: string; mimeType: string; dataUrl: string; createdAt: string };
  };
  sync_queue: {
    key: string;
    value: SyncQueueItem;
  };
  settings: {
    key: string;
    value: { key: string; data: any };
  };
}

const DB_NAME = 'ERP_ABP_Supermarket_DB';
const DB_VERSION = 1;

let dbPromise: Promise<IDBPDatabase<SupermarketERPDB>> | null = null;

export function getDB() {
  if (!dbPromise) {
    dbPromise = openDB<SupermarketERPDB>(DB_NAME, DB_VERSION, {
      upgrade(db) {
        // Products
        if (!db.objectStoreNames.contains('products')) {
          const prodStore = db.createObjectStore('products', { keyPath: 'id' });
          prodStore.createIndex('by-barcode', 'codigo_barras');
          prodStore.createIndex('by-category', 'categoria');
        }

        // Entities
        if (!db.objectStoreNames.contains('entities')) {
          const entStore = db.createObjectStore('entities', { keyPath: 'id' });
          entStore.createIndex('by-cpf', 'cpf_cnpj');
          entStore.createIndex('by-type', 'tipo_entidade');
        }

        // Sales
        if (!db.objectStoreNames.contains('sales')) {
          const saleStore = db.createObjectStore('sales', { keyPath: 'id' });
          saleStore.createIndex('by-date', 'created_at');
          saleStore.createIndex('by-origin', 'origem');
        }

        // Finances
        if (!db.objectStoreNames.contains('finances')) {
          const finStore = db.createObjectStore('finances', { keyPath: 'id' });
          finStore.createIndex('by-type', 'tipo');
          finStore.createIndex('by-status', 'status_lancamento');
        }

        // Installments
        if (!db.objectStoreNames.contains('installments')) {
          const instStore = db.createObjectStore('installments', { keyPath: 'id' });
          instStore.createIndex('by-finance', 'financa_id');
          instStore.createIndex('by-status', 'status');
          instStore.createIndex('by-due', 'data_vencimento');
        }

        // E-commerce Orders
        if (!db.objectStoreNames.contains('ecommerce_orders')) {
          const orderStore = db.createObjectStore('ecommerce_orders', { keyPath: 'id' });
          orderStore.createIndex('by-status', 'status');
          orderStore.createIndex('by-date', 'created_at');
        }

        // Comprovantes / Receipts Storage (Local Files / Data URLs)
        if (!db.objectStoreNames.contains('comprovantes')) {
          db.createObjectStore('comprovantes', { keyPath: 'id' });
        }

        // Sync Queue
        if (!db.objectStoreNames.contains('sync_queue')) {
          db.createObjectStore('sync_queue', { keyPath: 'id' });
        }

        // Settings
        if (!db.objectStoreNames.contains('settings')) {
          db.createObjectStore('settings', { keyPath: 'key' });
        }
      },
    });
  }
  return dbPromise;
}

// Helper methods for IndexedDB persistence
export async function idbSaveProducts(products: Product[]): Promise<void> {
  const db = await getDB();
  const tx = db.transaction('products', 'readwrite');
  for (const product of products) {
    await tx.store.put(product);
  }
  await tx.done;
}

export async function idbGetAllProducts(): Promise<Product[]> {
  const db = await getDB();
  return db.getAll('products');
}

export async function idbSaveProduct(product: Product): Promise<void> {
  const db = await getDB();
  await db.put('products', product);
}

export async function idbDeleteProduct(id: string): Promise<void> {
  const db = await getDB();
  await db.delete('products', id);
}

// Entities IDB
export async function idbSaveEntities(entities: Entity[]): Promise<void> {
  const db = await getDB();
  const tx = db.transaction('entities', 'readwrite');
  for (const entity of entities) {
    await tx.store.put(entity);
  }
  await tx.done;
}

export async function idbGetAllEntities(): Promise<Entity[]> {
  const db = await getDB();
  return db.getAll('entities');
}

export async function idbSaveEntity(entity: Entity): Promise<void> {
  const db = await getDB();
  await db.put('entities', entity);
}

export async function idbDeleteEntity(id: string): Promise<void> {
  const db = await getDB();
  await db.delete('entities', id);
}

// Sales IDB
export async function idbSaveSale(sale: Sale): Promise<void> {
  const db = await getDB();
  await db.put('sales', sale);
}

export async function idbGetAllSales(): Promise<Sale[]> {
  const db = await getDB();
  return db.getAll('sales');
}

// Finances IDB
export async function idbSaveFinance(finance: Finance): Promise<void> {
  const db = await getDB();
  await db.put('finances', finance);
}

export async function idbGetAllFinances(): Promise<Finance[]> {
  const db = await getDB();
  return db.getAll('finances');
}

export async function idbSaveInstallments(installments: Installment[]): Promise<void> {
  const db = await getDB();
  const tx = db.transaction('installments', 'readwrite');
  for (const inst of installments) {
    await tx.store.put(inst);
  }
  await tx.done;
}

export async function idbGetAllInstallments(): Promise<Installment[]> {
  const db = await getDB();
  return db.getAll('installments');
}

// E-commerce Orders
export async function idbSaveEcommerceOrder(order: EcommerceOrder): Promise<void> {
  const db = await getDB();
  await db.put('ecommerce_orders', order);
}

export async function idbGetAllEcommerceOrders(): Promise<EcommerceOrder[]> {
  const db = await getDB();
  return db.getAll('ecommerce_orders');
}

// Local Receipts / Comprovantes (IndexedDB File Folder)
export async function idbSaveComprovante(
  id: string,
  filename: string,
  mimeType: string,
  dataUrl: string
): Promise<string> {
  const db = await getDB();
  await db.put('comprovantes', {
    id,
    filename,
    mimeType,
    dataUrl,
    createdAt: new Date().toISOString(),
  });
  return id;
}

export async function idbGetComprovante(id: string) {
  const db = await getDB();
  return db.get('comprovantes', id);
}

// Sync Queue
export async function idbAddToSyncQueue(item: SyncQueueItem): Promise<void> {
  const db = await getDB();
  await db.put('sync_queue', item);
}

export async function idbGetSyncQueue(): Promise<SyncQueueItem[]> {
  const db = await getDB();
  return db.getAll('sync_queue');
}

export async function idbRemoveFromSyncQueue(id: string): Promise<void> {
  const db = await getDB();
  await db.delete('sync_queue', id);
}

// Settings
export async function idbSaveSettings(settings: StoreConfig): Promise<void> {
  const db = await getDB();
  await db.put('settings', { key: 'store_config', data: settings });
}

export async function idbGetSettings(): Promise<StoreConfig | null> {
  const db = await getDB();
  const record = await db.get('settings', 'store_config');
  return record ? record.data : null;
}

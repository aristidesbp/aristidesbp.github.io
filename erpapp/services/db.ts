
import { BankAccount, Entity, Installment, UserConfig } from '../types';

const DB_NAME = 'NexusFinanceDB';
const DB_VERSION = 1;

export class LocalDB {
  private db: IDBDatabase | null = null;

  async init(): Promise<void> {
    if (this.db) return;
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains('accounts')) db.createObjectStore('accounts', { keyPath: 'id' });
        if (!db.objectStoreNames.contains('entities')) db.createObjectStore('entities', { keyPath: 'id' });
        if (!db.objectStoreNames.contains('installments')) db.createObjectStore('installments', { keyPath: 'id' });
        if (!db.objectStoreNames.contains('config')) db.createObjectStore('config', { keyPath: 'key' });
      };

      request.onsuccess = (event) => {
        this.db = (event.target as IDBOpenDBRequest).result;
        resolve();
      };

      request.onerror = () => reject(request.error);
    });
  }

  private async getStore(name: string, mode: IDBTransactionMode = 'readonly'): Promise<IDBObjectStore> {
    await this.init();
    return this.db!.transaction(name, mode).objectStore(name);
  }

  async getAll<T>(storeName: string): Promise<T[]> {
    const store = await this.getStore(storeName);
    return new Promise((resolve, reject) => {
      const request = store.getAll();
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async put(storeName: string, item: any): Promise<void> {
    const store = await this.getStore(storeName, 'readwrite');
    return new Promise((resolve, reject) => {
      const request = store.put(item);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  async delete(storeName: string, id: string): Promise<void> {
    const store = await this.getStore(storeName, 'readwrite');
    return new Promise((resolve, reject) => {
      const request = store.delete(id);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  async getConfig(): Promise<Partial<UserConfig>> {
    try {
      const store = await this.getStore('config');
      return new Promise((resolve) => {
        const request = store.get('user_settings');
        request.onsuccess = () => resolve(request.result?.value || {});
        request.onerror = () => resolve({});
      });
    } catch { return {}; }
  }

  async setConfig(config: Partial<UserConfig>): Promise<void> {
    const store = await this.getStore('config', 'readwrite');
    return new Promise((resolve) => {
      const request = store.put({ key: 'user_settings', value: config });
      request.onsuccess = () => resolve();
    });
  }
}

export const db = new LocalDB();

/**
 * Minimal IndexedDB wrapper used ONLY as the offline cache / outbox.
 * Supabase remains the source of truth.
 */
const DB_NAME = 'erp_abp';
const DB_VERSION = 1;

export const CACHE_STORES = [
  'entidades',
  'produtos',
  'financas',
  'parcelas',
  'vendas',
] as const;

export type CacheStore = (typeof CACHE_STORES)[number];

let dbPromise: Promise<IDBDatabase> | null = null;

function openDb(): Promise<IDBDatabase> {
  if (typeof indexedDB === 'undefined') {
    return Promise.reject(new Error('IndexedDB indisponível'));
  }
  if (!dbPromise) {
    dbPromise = new Promise((resolve, reject) => {
      const req = indexedDB.open(DB_NAME, DB_VERSION);
      req.onupgradeneeded = () => {
        const db = req.result;
        for (const store of CACHE_STORES) {
          if (!db.objectStoreNames.contains(store)) {
            db.createObjectStore(store, { keyPath: 'id' });
          }
        }
        if (!db.objectStoreNames.contains('outbox')) {
          db.createObjectStore('outbox', { keyPath: 'id', autoIncrement: true });
        }
      };
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });
  }
  return dbPromise;
}

function tx<T>(store: string, mode: IDBTransactionMode, run: (s: IDBObjectStore) => IDBRequest): Promise<T> {
  return openDb().then(
    (db) =>
      new Promise<T>((resolve, reject) => {
        const t = db.transaction(store, mode);
        const req = run(t.objectStore(store));
        req.onsuccess = () => resolve(req.result as T);
        req.onerror = () => reject(req.error);
      }),
  );
}

export async function idbGetAll<T>(store: string): Promise<T[]> {
  try {
    return (await tx<T[]>(store, 'readonly', (s) => s.getAll())) || [];
  } catch {
    return [];
  }
}

export async function idbPutMany<T extends { id: string }>(store: string, rows: T[]): Promise<void> {
  try {
    const db = await openDb();
    await new Promise<void>((resolve, reject) => {
      const t = db.transaction(store, 'readwrite');
      const s = t.objectStore(store);
      s.clear();
      rows.forEach((r) => s.put(r));
      t.oncomplete = () => resolve();
      t.onerror = () => reject(t.error);
    });
  } catch {
    /* cache is best-effort */
  }
}

export async function idbPut<T extends { id: string }>(store: string, row: T): Promise<void> {
  try {
    await tx(store, 'readwrite', (s) => s.put(row));
  } catch {
    /* ignore */
  }
}

export async function idbDeleteMany(store: string, ids: string[]): Promise<void> {
  try {
    const db = await openDb();
    await new Promise<void>((resolve, reject) => {
      const t = db.transaction(store, 'readwrite');
      const s = t.objectStore(store);
      ids.forEach((id) => s.delete(id));
      t.oncomplete = () => resolve();
      t.onerror = () => reject(t.error);
    });
  } catch {
    /* ignore */
  }
}

export type OutboxOp = {
  id?: number;
  table: string;
  op: 'insert' | 'update' | 'delete';
  payload?: Record<string, unknown> | Record<string, unknown>[];
  matchId?: string;
  matchIds?: string[];
  createdAt: string;
};

export async function outboxAdd(op: Omit<OutboxOp, 'id'>): Promise<void> {
  try {
    await tx('outbox', 'readwrite', (s) => s.add(op));
  } catch {
    /* ignore */
  }
}

export async function outboxAll(): Promise<OutboxOp[]> {
  return idbGetAll<OutboxOp>('outbox');
}

export async function outboxRemove(id: number): Promise<void> {
  try {
    await tx('outbox', 'readwrite', (s) => s.delete(id));
  } catch {
    /* ignore */
  }
}

export async function outboxCount(): Promise<number> {
  return (await outboxAll()).length;
}

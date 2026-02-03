const DB_NAME = 'ERP_ABP_DB';
const DB_VERSION = 1;
const STORE_NAME = 'entidades';

function initDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);

        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
            }
        };

        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject('Erro ao abrir IndexedDB');
    });
}

const dbOps = {
    async add(item) {
        const db = await initDB();
        return new Promise((resolve) => {
            const transaction = db.transaction(STORE_NAME, 'readwrite');
            transaction.objectStore(STORE_NAME).add(item);
            transaction.oncomplete = () => resolve(true);
        });
    },
    async getAll() {
        const db = await initDB();
        return new Promise((resolve) => {
            const transaction = db.transaction(STORE_NAME, 'readonly');
            const request = transaction.objectStore(STORE_NAME).getAll();
            request.onsuccess = () => resolve(request.result);
        });
    },
    async update(item) {
        const db = await initDB();
        return new Promise((resolve) => {
            const transaction = db.transaction(STORE_NAME, 'readwrite');
            transaction.objectStore(STORE_NAME).put(item);
            transaction.oncomplete = () => resolve(true);
        });
    },
    async delete(id) {
        const db = await initDB();
        return new Promise((resolve) => {
            const transaction = db.transaction(STORE_NAME, 'readwrite');
            transaction.objectStore(STORE_NAME).delete(Number(id));
            transaction.oncomplete = () => resolve(true);
        });
    },
    async getById(id) {
        const db = await initDB();
        return new Promise((resolve) => {
            const transaction = db.transaction(STORE_NAME, 'readonly');
            const request = transaction.objectStore(STORE_NAME).get(Number(id));
            request.onsuccess = () => resolve(request.result);
        });
    }
};

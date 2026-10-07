export type SampleProjectItem = {
  id: string;
  name: string;
  type: "folder" | "file";
  parentId: string | null;
  mimeType?: string;
  url?: string;
  size?: number;
};

const DATABASE_NAME = "melfie-portfolio";
const DATABASE_VERSION = 1;
const STORE_NAME = "sample-projects";
const PROJECTS_KEY = "items";

function openDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DATABASE_NAME, DATABASE_VERSION);

    request.onupgradeneeded = () => {
      request.result.createObjectStore(STORE_NAME);
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error ?? new Error("Could not open project storage."));
  });
}

export async function loadSampleProjects(): Promise<SampleProjectItem[] | null> {
  const database = await openDatabase();

  return new Promise((resolve, reject) => {
    const transaction = database.transaction(STORE_NAME, "readonly");
    const request = transaction.objectStore(STORE_NAME).get(PROJECTS_KEY);
    let items: SampleProjectItem[] | undefined;

    request.onsuccess = () => {
      items = request.result as SampleProjectItem[] | undefined;
    };
    transaction.oncomplete = () => {
      database.close();
      resolve(items ?? null);
    };
    transaction.onerror = () => {
      database.close();
      reject(transaction.error ?? request.error ?? new Error("Could not read project storage."));
    };
    transaction.onabort = () => {
      database.close();
      reject(transaction.error ?? new Error("Reading project storage was cancelled."));
    };
  });
}

export async function saveSampleProjects(items: SampleProjectItem[]): Promise<void> {
  const database = await openDatabase();

  return new Promise((resolve, reject) => {
    const transaction = database.transaction(STORE_NAME, "readwrite");
    transaction.objectStore(STORE_NAME).put(items, PROJECTS_KEY);

    transaction.oncomplete = () => {
      database.close();
      resolve();
    };
    transaction.onerror = () => {
      database.close();
      reject(transaction.error ?? new Error("Could not save sample projects."));
    };
    transaction.onabort = () => {
      database.close();
      reject(transaction.error ?? new Error("Saving sample projects was cancelled."));
    };
  });
}

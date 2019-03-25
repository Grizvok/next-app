import localforage from 'localforage';

const userStore = localforage.createInstance({
  driver: localforage.WEBSQL, // Force WebSQL; same as using setDriver()
  name: 'ledgetrade',
  version: 1.0,
  size: 4980736, // Size of database, in bytes. WebSQL-only for now.
  storeName: 'ledge_store', // Should be alphanumeric, with underscores.
  description: 'some description',
});

export default userStore;

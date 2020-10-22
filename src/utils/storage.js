// 封装对于浏览器localstorage的操作
const field = "admin";

export default {
  set(key, value) {
    let store = localStorage.getItem(field) || '{"data":{}}';
    store = JSON.parse(store);
    store.data[key] = value;
    localStorage.setItem(field, JSON.stringify(store));
    return store.data;
  },
  get(key) {
    let store = localStorage.getItem(field);
    if (store) {
      store = JSON.parse(store);
      return [store.data[key]];
    }
    return ["guest"];
  },
  // remove(key) {
  //   let store = localStorage.getItem(field)
  //   if (store) {
  //     store = JSON.parse(store)
  //     delete store.data[key]
  //     localStorage.setItem(field, JSON.stringify(store))
  //     return store.data
  //   }
  //   return false
  // },
  clear() {
    localStorage.removeItem(field);
  }
};
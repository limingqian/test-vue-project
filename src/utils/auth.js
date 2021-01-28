import storage from "./storage";

export function getCurrentAuthority() {
  let authArray = storage.get("auth");
  if (authArray.length > 0) {
    return authArray;
  } else {
    return ["guest"];
  }
}

export function check(authority) {
  const current = getCurrentAuthority();
  return current.some(item => authority.includes(item));
}

export function isLogin() {
  // 为了调试
  // return true;
  const current = getCurrentAuthority();
  // 存在且不是游客
  return current && current.indexOf("guest") < 0;
}

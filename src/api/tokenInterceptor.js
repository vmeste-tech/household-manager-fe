// tokenInterceptor.js
export function tokenInterceptor(req) {
  const token = localStorage.getItem("access_token");
  if (token) {
    req.set("Authorization", `Bearer ${token}`);
  }
  return req;
}

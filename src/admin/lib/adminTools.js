// src > admin > lib > adminTools.js - Quick tools for admin

export const isLoggedIn = (request) => {
  const cookieString = request.headers.get('Cookie');
  return cookieString && cookieString.includes('admin-authenticated=true');
}
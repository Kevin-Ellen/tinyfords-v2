// src > admin > lib > adminTools.js - Quick tools for admin

import formAdminLogin from "../fragments/formAdminLogin";

export const isLoggedIn = (request) => {
  const cookieString = request.headers.get('Cookie');
  return cookieString && cookieString.includes('admin-authenticated=true');
}

export const quickLogin = (request) => {
  if(isLoggedIn(request)){ return; }

  return [
    '<main>',
      formAdminLogin(),
    '</main>',
  ].join('');
}
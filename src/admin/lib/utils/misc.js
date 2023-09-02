// src > admin > lib > utils < misc.js - Quick tools for admin

import fragmentFormAdminLogin from "../fragments/formAdminLogin";

export const isLoggedIn = (request) => {
  const cookieString = request.headers.get('Cookie');

  console.log(`Cookie string: ${cookieString}`);

  return cookieString && cookieString.includes('admin-authenticated=true');
}

export const quickLogin = (request) => {
  if(isLoggedIn(request)){ return false; }

  return [
    '<main>',
      fragmentFormAdminLogin(),
    '</main>',
  ].join('');
}
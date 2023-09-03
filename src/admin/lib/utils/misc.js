// src > admin > lib > utils < misc.js - Quick tools for admin

import fragmentFormAdminLogin from "../fragments/formAdminLogin";

export const isLoggedIn = (request) => {
  const cookieString = request.headers.get('Cookie');
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

export const getLastCarId = (data) => {
  return Math.max(...data.map(car => car.id))+1;
}

export const doeValueExist = (dataArray, key, value) => {
  return dataArray.some(item => item[key] === value);
}
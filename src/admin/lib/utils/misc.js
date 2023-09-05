// src > admin > lib > utils > misc.js - Quick tools for admin

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

export const duplicateChecker = (dataArray, keys, values) => {
  for (let key of keys) {
    if (key === 'code' && values[key] === null) {
      continue;
    }
    if (dataArray.some(item => item[key] === values[key] && item.id !== values.id)) {
      return {
        success: false,
        message: `Duplicate found for <em>${key}</em> with value <em>${values[key]}</em>.`
      };
    }
  }
  return {
    success: true,
    message: 'No duplicates found.'
  };
}

export const generateOptions = (items, selectedValue, valueProp = 'id', nameProp = 'name') => {
  return items.map(item => `
    <option value="${item[valueProp]}" ${item[valueProp] === selectedValue ? 'selected' : ''}>
      ${item[nameProp]}
    </option>
  `).join('');
}
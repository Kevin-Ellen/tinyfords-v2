/**
 * misc.js
 * 
 * This module contains utility functions for the admin section.
 * These are quick tools and helper methods that serve various purposes like 
 * checking login status, ensuring unique entries, or generating dropdown options.
 */

// External Dependencies
import fragmentFormAdminLogin from "../fragments/formAdminLogin";

/**
 * Checks if the user is logged in by examining the Cookie header.
 *
 * @param {Request} request - The incoming request object.
 * @return {boolean} True if the user is logged in, otherwise false.
 */
export const isLoggedIn = (request) => {
  const cookieString = request.headers.get('Cookie');
  return cookieString && cookieString.includes('admin-authenticated=true');
}

/**
 * Provides a quick login form if the user isn't authenticated.
 * If the user is logged in, it returns false.
 *
 * @param {Request} request - The incoming request object.
 * @return {string|boolean} HTML string of the login form or false if already logged in.
 */
export const quickLogin = (request) => {
  if(isLoggedIn(request)){ return false; }

  return [
    '<main>',
      fragmentFormAdminLogin(),
    '</main>',
  ].join('');
}

/**
 * Fetches the ID of the last car in the data and increments it by one.
 *
 * @param {Array} data - The array containing car data.
 * @return {number} ID for the next car to be added.
 */
export const getLastCarId = (data) => {
  return Math.max(...data.map(car => car.id))+1;
}

/**
 * Checks for duplicates in the provided data array based on the keys and values specified.
 *
 * @param {Array} dataArray - The array containing data.
 * @param {Array} keys - The keys to check for duplicates.
 * @param {Object} values - The values to compare against.
 * @return {Object} An object indicating success or failure and an associated message.
 */
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

/**
 * Generates options for a dropdown/select based on provided items.
 *
 * @param {Array} items - The array containing data for dropdown options.
 * @param {string|number} selectedValue - The value that should be marked as selected.
 * @param {string} [valueProp='id'] - The property name to use for option values.
 * @param {string} [nameProp='name'] - The property name to use for option names.
 * @return {string} HTML string of options for a dropdown.
 */
export const generateOptions = (items, selectedValue, valueProp = 'id', nameProp = 'name') => {
  return items.map(item => `
    <option value="${item[valueProp]}" ${item[valueProp] === selectedValue ? 'selected' : ''}>
      ${item[nameProp]}
    </option>
  `).join('');
}
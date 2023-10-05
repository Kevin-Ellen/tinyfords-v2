/**
 * misc.js
 * 
 * This module provides utility functions for miscellaneous tasks 
 * that may not fit into other, more specific utility modules.
 */

/**
 * Decodes a base64 encoded string, taking into account special characters.
 *
 * @param {string} str - The base64 encoded string to decode.
 * @returns {string} - The decoded string.
 */
export const base64Decode = (str) => {
  return decodeURIComponent(
    atob(str)
      .split('')
      .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
      .join('')
  );
}
/**
 * Retrieves the nested value from an object based on a string path.
 * 
 * @param {Object} obj - The object to retrieve the value from.
 * @param {string} path - The string path, e.g., 'addedDetails.date'.
 * @returns {*} - The value at the specified path.
 */
const getValueByPath = (obj, path) => {
  return path.split('.').reduce((acc, part) => acc && acc[part], obj);
}

/**
 * Sort an array of objects by multiple fields.
 * 
 * @param {Array} data - The array of objects to be sorted.
 * @param {Array} fields - An array of fields to sort by in priority order.
 * @param {Object} directions - An object specifying the direction for each field ('asc' or 'desc').
 * @returns {Array} - The sorted array.
 */
export const multiSort = (data, fields, directions) => {
  return data.sort((a, b) => {
    for (const field of fields) {
      const valueA = getValueByPath(a, field);
      const valueB = getValueByPath(b, field);

      let comparison;
      // Check if we're dealing with dates
      if (valueA && valueB && Date.parse(valueA) && Date.parse(valueB)) {
        comparison = new Date(valueB) - new Date(valueA);
      } else {
        comparison = valueA < valueB ? -1 : valueA > valueB ? 1 : 0;
      }
      if (directions[field] === 'asc') {
        comparison *= -1;
      }
      if (comparison !== 0) return comparison;
    }
    return 0;
  });
};

export const deepMerge = (obj1, obj2) => {
  let merged = Array.isArray(obj1) ? [] : {};
  for (let key in obj1) {
    if (obj1.hasOwnProperty(key)) {
      if (obj2.hasOwnProperty(key)) {
        if (typeof obj1[key] === 'object' && obj1[key] !== null && typeof obj2[key] === 'object' && obj2[key] !== null) {
          merged[key] = deepMerge(obj1[key], obj2[key]);
        } else {
          merged[key] = obj2[key];
        }
      } else {
        merged[key] = obj1[key];
      }
    }
  }
  // If it's an array, fill in the rest of the items from obj2
  if (Array.isArray(obj1) && Array.isArray(obj2)) {
    for (let i = obj1.length; i < obj2.length; i++) {
      merged[i] = obj2[i];
    }
  }
  return merged;
}
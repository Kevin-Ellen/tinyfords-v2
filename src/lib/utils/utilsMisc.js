// src > lib > utils > miscTools.js - small tools

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
 * Sort an array of objects by multiple fields.
 * 
 * @param {Array} data - The array of objects to be sorted.
 * @param {Array} fields - An array of fields to sort by in priority order.
 * @param {Object} directions - An object specifying the direction for each field ('asc' or 'desc').
 * @returns {Array} - The sorted array.
 * 
 * Example: const sortedData = multiSort(data, ['dateAdded', 'id'], { dateAdded: 'desc', id: 'desc' });
 */
export const multiSort = (data, fields, directions) => {
  return data.sort((a, b) => {
    for (const field of fields) {
      let comparison;
      // Check if we're dealing with dates
      if (a[field] && b[field] && Date.parse(a[field]) && Date.parse(b[field])) {
        comparison = new Date(b[field]) - new Date(a[field]);
      } else {
        comparison = a[field] < b[field] ? -1 : a[field] > b[field] ? 1 : 0;
      }
      if (directions[field] === 'asc') {
        comparison *= -1;
      }
      if (comparison !== 0) return comparison;
    }
    return 0;
  });
};
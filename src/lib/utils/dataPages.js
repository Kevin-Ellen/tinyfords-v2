/**
 * Find the page data for the current page based on its slug.
 * 
 * @param {string} slug - The slug of the current page.
 * @param {Array} dataPageAll - The list of all page data objects.
 * @returns {Object|null} - The data for the current page, or null if not found.
 */
export const findDataPageCurrent = (slug, data) => {
  return data.find(page => page.slug === slug) || false;
}
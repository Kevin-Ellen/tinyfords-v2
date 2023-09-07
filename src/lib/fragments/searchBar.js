/**
 * searchBar.js
 * 
 * This module provides the searchBar that is used in pageHead and on collection pages.
 * The URL provided should be the collection page slug.
 */

/**
 * Generates the HTML for the head section based on the given data.
 * 
 * @param {String} url - The URL that should be aligned with the active collection
 * @return {string} - The HTML markup for the search bar section.
 */
const fragmentSearchBar = (url, options = {}) => {
  let value = null;
  if (options.feedback && options.feedback.success && options.feedback.action === 'search') {
    value = options.data.searchValue;
  }
  const html = `<div class="siteSearch">
    <form class="searchBar" action="${url.pathname}" method="post">
      <input type="search" required placeholder="Search query" autocomplete="off" name="q" ${value ? `value="${value}"` : ''}>
        <button type="submit">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352c79.5 0 144-64.5 144-144s-64.5-144-144-144S64 128.5 64 208s64.5 144 144 144z"></path></svg>
          <span class="a11y">Search</span>
        </button>
    </form>
  </div>`;
  return html;
}
export default fragmentSearchBar;
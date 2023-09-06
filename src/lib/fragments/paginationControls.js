/**
 * paginationControls.js
 * 
 * This module provides a function to create the pagination controls.
 */

/**
 * Wrapper for the pagination controls, showing links to all pages.
 * 
 * @param {object} data - pagination data object
 * @returns {string} - The pagination controls in HTML as string
 */
const fragmentPaginationControls = (data) => {
  
  const html = `
  <nav aria-label="Pagination" class="fragmentPaginationControls">
    <ul>
      ${constructPrevButton(data)}
      ${constructPaginationLinks(data)}
      ${constructNextButton(data)}
    </ul>
  </nav>`;

  return html;
}
export default fragmentPaginationControls;

/**
 * Returns the URL for the given page number.
 * 
 * @param {number} pageNumber - The target page number.
 * @param {string} slug - The base slug.
 * @returns {string} - The URL for the given page number.
 */
const getPageUrl = (pageNumber, slug) => {
  return pageNumber === 1 ? slug : `${slug}?page=${pageNumber}`;
};

const constructPrevButton = (data) => {
  return data.hasPreviousPage ? 
  `<li><a href="${getPageUrl(data.currentPage - 1, data.slug)}" aria-label="Previous page">&laquo; Prev</a></li>` : ``;
}

const constructNextButton = (data) => {
  return data.hasNextPage ? 
  `<li><a href="${getPageUrl(data.currentPage + 1, data.slug)}" aria-label="Next page">Next &raquo;</a></li>` : ``;
}

const constructPaginationLinks = (data) => {
  let pagesHtml = '';
  for(let i = 1; i <= data.totalPages; i++) {
    if(i === data.currentPage) {
      pagesHtml += `<li class="active" aria-current="page">${i}</li>`;
    } else {
      pagesHtml += `<li><a href="${getPageUrl(i, data.slug)}">${i}</a></li>`;
    }
  }
  return pagesHtml;
}
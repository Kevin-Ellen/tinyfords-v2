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
const getPageUrl = (page, slug) => {
  return page === 1 ? slug : `${slug}?page=${page}`;
};

const constructPrevButton = (data) => {
  const label = '&laquo; Previous page';
  if (data.page === 1) {
    return `<li class="disabled" aria-disabled="true"><a href="${getPageUrl(data.page, data.slug)}" aria-label="${label}">${label}</a></li>`;
  }
  return `<li><a href="${getPageUrl(data.page - 1, data.slug)}" aria-label="${label}">${label}</a></li>`;
}

const constructNextButton = (data) => {
  const label = 'Next page &raquo;';
  if (data.page === data.total) {
    return `<li class="disabled" aria-disabled="true"><a href="${getPageUrl(data.page, data.slug)}" aria-label="${label}">${label}</a></li>`;
  }
  return `<li><a href="${getPageUrl(data.page + 1, data.slug)}" aria-label="${label}">${label}</a></li>`;
}

const constructPaginationLinks = (data) => {

  const entries = [];
  for(let i =1; i<=data.total; i++){
    if(i===data.page){
      entries.push(
        `<li class="active" aria-disabled="true"><a aria-current="page" href="${getPageUrl(data.page, data.slug)}">${i}</a></li>`
      );
    }else{
      entries.push(
        `<li><a href="${getPageUrl(i, data.slug)}">${i}</a></li>`
      );
    }
  }
  return entries.join('');
}
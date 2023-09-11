/**
 * pageBreadcrumbs.js
 * 
 * This module provides functions to generate breadcrumb navigation for web pages.
 * Breadcrumbs are hierarchical links that allow users to navigate back to previous pages or sections.
 */

/**
 * Generates the HTML for the breadcrumb navigation based on the given data.
 * 
 * @param {Object} dataPageCurrent - Data specific to the current page.
 * @param {Object} dataPageAll - Data that is common to all pages.
 * @return {string} The HTML markup for the breadcrumb navigation.
 */
const pageBreadcrumbs = (data) => {
  // If there's no breadcrumb data for the current page, return an empty breadcrumb container.
  if (!data.pages.current.breadcrumbList) {
    return `<nav class="breadcrumbsContainer" aria-label="breadcrumb"></nav>`;
  }

  // Generate the breadcrumb entries
  const breadcrumbs = createBreadcrumbs(data.pages.current.breadcrumbList);

  // Construct the full HTML for the breadcrumb navigation
  const html = `
      <nav class="breadcrumbsContainer" aria-label="breadcrumb">
        <ul class="breadcrumbs">
          ${breadcrumbs}
        </ul>
      </nav>
  `;

  return html;
}
export default pageBreadcrumbs;

/**
 * Generates the breadcrumb entries based on the given data.
 * 
 * @param {Array} data - An array of breadcrumb objects.
 * @return {string} The HTML markup for the breadcrumb entries.
 */
const createBreadcrumbs = (data) => {
  return data.map((obj, index, arr) => {
    const isLastItem = index === arr.length - 1;
    return `
      <li ${isLastItem ? 'aria-current="page"' : ''}>
        <a href="${obj.slug}">${obj.name}</a>
      </li>
      ${isLastItem ? '' : `<li aria-hidden="true">/</li>`}
    `;
  }).join('');
}
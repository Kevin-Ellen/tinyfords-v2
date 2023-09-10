
/**
 * spa.js
 * 
 * This module is responsible for constructing web page fragment used in the SPA
 * It determines the correct template to use based on the requested URL and then assembles the page 
 * by stitching together the appropriate components. This module ensures that each page has a consistent 
 * structure while displaying different content based on the URL.
 */

// Import necessary modules and templates
import { servicesGithubDataPageAll } from '../services/github';
import templateHome from '../templates/home';
import templateCollection from '../templates/collection';
import templateContent from '../templates/content';
import pageBreadcrumbs from '../construction/pageBreadcrumbs';

/**
 * Generate the HTML content for the SPA page.
 * 
 * @param {Object} dataPageCurrent - The current page's data.
 * @returns {string} - The constructed SPA content as an HTML string.
 */
const handlerTemplateSPA = async (url, options = {}) => {

  const dataPageAll = await servicesGithubDataPageAll();

  const dataPageCurrent = determinePageBasedOnURL(url.pathname, dataPageAll);
  dataPageCurrent.url = url;
  dataPageCurrent.breadcrumbList = generateBreadcrumbs(dataPageCurrent, dataPageAll);
  
  const templates = {
    home: templateHome,
    collection: templateCollection,
    content: templateContent,
  }

  // Construct the main content of the collection
  const resolvedSections = await Promise.all(
    [
      pageBreadcrumbs,
      templates[dataPageCurrent.template], 
    ].map(section => section(dataPageCurrent, dataPageAll, options))
  );


  // For SPA, we return only the main content.
  return new Response(resolvedSections.join(''), {status: 200, headers:{'x-robots-tag':'noindex', 'x-tf-spa':true}});
}
export default handlerTemplateSPA;

const determinePageBasedOnURL = (slug, dataPageAll) => {

  // Find and return the page data that matches the current pathname
  return dataPageAll.find(page => page.slug === slug) || null;
}

// curl -H "x-tf-spa: true" http://127.0.0.1:8787//content-only/hot-wheels

/**
 * Generate the breadcrumb trail for the current page.
 * 
 * @param {Object} dataPageCurrent - The data for the current page.
 * @param {Array} dataPageAll - The list of all page data objects.
 * @returns {Array} - The breadcrumb trail for the current page.
 */
const generateBreadcrumbs = (dataPageCurrent, dataPageAll) => {
  return dataPageCurrent.breadcrumbList.map((breadcrumbName, index) => {
    const breadcrumbPage = dataPageAll.find(page => page.name === breadcrumbName);
    if (breadcrumbPage) {
      return {
        name: breadcrumbName,
        slug: breadcrumbPage.slug,
        position: index + 1
      };
    } else {
      return null;
    }
  }).filter(item => item);
};
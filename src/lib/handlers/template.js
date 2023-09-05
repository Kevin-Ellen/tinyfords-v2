/**
 * template.js
 * 
 * This module is responsible for constructing a complete web page using various templates and components.
 * It determines the correct template to use based on the requested URL and then assembles the page 
 * by stitching together the appropriate components. This module ensures that each page has a consistent 
 * structure while displaying different content based on the URL.
 */

// Import necessary modules and templates
import { servicesGithubDataPageAll } from '../services/github';
import documentHead from '../construction/documentHead';
import documentEnd from '../construction/documentEnd';
import pageHead from '../construction/pageHead';
import pageBreadcrumbs from '../construction/pageBreadcrumbs';
import pageFooter from '../construction/pageFooter';
import templateHome from '../templates/home';

/**
 * Main handler for templates. Determines which template to use based on the URL.
 * 
 * @param {URL} url - The URL of the request.
 * @returns {Response} - The constructed page as a response.
 */
const handlerTemplate = async (url) => {
  const dataPageAll = await servicesGithubDataPageAll();

  switch (url.pathname) {
    case '/':
      const dataPageCurrent = findDataPageCurrent(url.pathname, dataPageAll);
      dataPageCurrent.url = url;
      
      if (!dataPageCurrent) {
        return new Response('Not Found', { status: 404 });
      }

      dataPageCurrent.breadcrumbList = generateBreadcrumbs(dataPageCurrent, dataPageAll);

      return new Response(
        await createPage(dataPageCurrent, dataPageAll),
        {
          status: 200,
          headers: {
            'Content-Type': 'text/html'
          }
        }
      );
  }
}
export default handlerTemplate;

/**
 * Find the page data for the current page based on its slug.
 * 
 * @param {string} slug - The slug of the current page.
 * @param {Array} dataPageAll - The list of all page data objects.
 * @returns {Object|null} - The data for the current page, or null if not found.
 */
const findDataPageCurrent = (slug, dataPageAll) => {
  return dataPageAll.find(page => page.slug === slug) || false;
}

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

/**
 * Construct the full page using various templates and components.
 * 
 * @param {Object} dataPageCurrent - The data for the current page.
 * @param {Array} dataPageAll - The list of all page data objects.
 * @returns {string} - The constructed page as an HTML string.
 */
const createPage = async (dataPageCurrent, dataPageAll) => {
  const templates = {
    home: templateHome,
  }

  const resolvedSections = await Promise.all(
    [documentHead, pageHead, pageBreadcrumbs, templates[dataPageCurrent.template], pageFooter, documentEnd].map(section => section(dataPageCurrent, dataPageAll))
  )

  return resolvedSections.join('');
}
/**
 * template.js
 * 
 * This module is responsible for constructing a complete web page using various templates and components.
 * It determines the correct template to use based on the requested URL and then assembles the page 
 * by stitching together the appropriate components. This module ensures that each page has a consistent 
 * structure while displaying different content based on the URL.
 */

// Import necessary modules and templates
import { servicesGithubDataCarsAll, servicesGithubDataPageAll } from '../services/github';
import { findDataPageCurrent } from '../utils/dataPages';
import documentHead from '../construction/documentHead';
import documentEnd from '../construction/documentEnd';
import pageHead from '../construction/pageHead';
import pageBreadcrumbs from '../construction/pageBreadcrumbs';
import pageFooter from '../construction/pageFooter';
import templateHome from '../templates/home';
import templateCollection from '../templates/collection';
import templateContent from '../templates/content';
import handlerError from './error';

/**
 * Main handler for templates. Determines which template to use based on the URL.
 * 
 * @param {URL} url - The URL of the request.
 * @returns {Response} - The constructed page as a response.
 */
const handlerTemplate = async (url, options = {}) => {
  try{
    const dataAll = {
      pages: {
        all: await servicesGithubDataPageAll(),
        current: null,
      },
      cars: await servicesGithubDataCarsAll(),
    }

    // Check if the URL should not be indexed.
    const noIndex = shouldNoIndex(url.params);

    switch (url.pathname) {
      case '/':
      case '/hotwheels':
      case '/matchbox':
      case '/other':
      case '/all':
      case '/about':
      case '/about/how-to-find-toy-number':
      case '/about/klas-car-keepers':
        dataAll.pages.current = findDataPageCurrent(url.pathname, dataAll.pages.all);
        dataAll.pages.current.url = url;
        
        if (!dataAll.pages.current) {
          return new Response('Current page not found', { status: 404 });
        }

        dataAll.pages.current.breadcrumbList = generateBreadcrumbs(dataAll);

        // Set the headers, including x-robots-tag if needed.
        const headers = {
          'Content-Type': 'text/html'
        };
        if (noIndex) {
          headers['x-robots-tag'] = 'noindex';
        }

        return new Response(
          await createPage(dataAll, options),
          {
            status: 200,
            headers: headers
          }
        );
    }
  }catch(error){
    return handlerError(404, `Handler template catch - Not found: ${error.message}`);
  }
}
export default handlerTemplate;

/**
 * Generate the breadcrumb trail for the current page.
 * 
 * @param {Object} data - The data containing current page and all pages.
 * @returns {Array} - The breadcrumb trail for the current page.
 */
const generateBreadcrumbs = (data) => {
  return data.pages.current.breadcrumbList.map((breadcrumbName, index) => {
    const breadcrumbPage = data.pages.all.find(page => page.name === breadcrumbName);
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
const createPage = async (data, options = {}) => {
  const templates = {
    home: templateHome,
    collection: templateCollection,
    content: templateContent,
  }

  const resolvedSections = await Promise.all(
    [
      documentHead, 
      pageHead, 
      pageBreadcrumbs, 
      templates[data.pages.current.template], 
      pageFooter, 
      documentEnd
    ].map(section => section(data, options))
  )

  return resolvedSections.join('');
}

/**
 * Determines whether a URL should be indexed based on its parameters.
 *
 * @param {URLSearchParams} params - The query parameters of the URL.
 * @returns {boolean} - True if the page should not be indexed, false otherwise.
 */
const shouldNoIndex = (params) => {
  for (const [key, value] of params.entries()) {
    if (key !== 'page' || isNaN(value) || parseInt(value, 10) != value) {
      return true;
    }
  }
  return false;
}
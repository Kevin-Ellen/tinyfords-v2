/**
 * template.js
 * 
 * This module is responsible for constructing a complete web page using various templates and components.
 * It determines the correct template to use based on the requested URL and then assembles the page 
 * by stitching together the appropriate components. This module ensures that each page has a consistent 
 * structure while displaying different content based on the URL.
 */

// Import necessary modules and templates
import { appData } from '../services/appData';


import documentHead from '../construction/documentHead';
import documentEnd from '../construction/documentEnd';
import pageHead from '../construction/pageHead';
import pageBreadcrumbs from '../construction/pageBreadcrumbs';
import pageFooter from '../construction/pageFooter';

import templateHome from '../templates/home';
import templateCollection from '../templates/collection';
import templateContent from '../templates/content';
// import handlerError from './error';

/**
 * Main handler for templates. Determines which template to use based on the URL.
 * 
 * @param {URL} url - The URL of the request.
 * @returns {Response} - The constructed page as a response.
 */
const handleTemplate = async () => {
  try{

    const content = createPage();

    headers = {
      'Content-Type': 'text/html'
    }
    if (appData.options.noindex) {
      headers['x-robots-tag'] = 'noindex';
    }

    return new Response(
      content,
      {
        status:200,
        headers: headers,
      }
    );


  }catch(error){
    console.log('[Error]Handle template : ',error);
  }
}
export default handleTemplate;


/**
 * Construct the full page using various templates and components.
 * 
 * @param {Object} dataPageCurrent - The data for the current page.
 * @param {Array} dataPageAll - The list of all page data objects.
 * @returns {string} - The constructed page as an HTML string.
 */
const createPage = () => {
  // return 'hello world from createPage';

  const templates = {
    home: templateHome,
    collection: templateCollection,
    content: templateContent,
  }

  const sections = [
    documentHead(),

    pageHead(),

    pageBreadcrumbs(),

    templates[appData.pages.current.template](),

    pageFooter(),

    documentEnd(),
  ].join('');

  return sections;

}
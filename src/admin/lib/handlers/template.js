/**
 * template.js
 * 
 * This module handles the templates for the admin section.
 */

// Import the various sections used in the construction of the admin page.
import documentHead from '../construction/documentHead';
import documentEnd from '../construction/documentEnd';
import pageHead from '../construction/pageHead';
import pageBreadcrumbs from '../construction/pageBreadcrumbs';
import pageAFooter from '../construction/pageFooter';

// Import the specific templates for different admin actions.
import templateHome from '../templates/home';
import templateAdminCarAdd from '../templates/carAdd';
import templateAdminCarSearch from '../templates/carSearch';
import templateAdminCarEdit from '../templates/carEdit';

/**
 * Main handler function for displaying the appropriate admin template based on the request URL.
 * 
 * @param {Request} request - The incoming request object.
 * @param {Object} options - Configuration and context data for rendering the template.
 * @return {Response} - A rendered admin page or a default message.
 */
const handlerTemplate = async (request, options = {}) => {
  const url = new URL(request.url);

  // Mapping of URLs to their respective template functions.
  const templateMappings = {
    '/admin': templateHome,
    '/admin/add-car': templateAdminCarAdd,
    '/admin/search-car': templateAdminCarSearch,
    '/admin/edit-car': templateAdminCarEdit,
  };

  // Determine which template function to use based on the URL's pathname.
  const templateFunction = templateMappings[url.pathname];
  
  // If a template function is found for the given URL, render and return the page.
  if (templateFunction) {
    return new Response(
      await createPage(templateFunction, request, options),
      {
        status: 200,
        headers: {
          'Content-Type': 'text/html',
          'x-robots-tag': 'noindex'
        }
      }
    );
  }

  // Default response if no template function matches the URL's pathname.
  return new Response('template Handler');
}
export default handlerTemplate;

/**
 * Assembles the admin page by piecing together various sections and the specific template.
 * 
 * @param {Function} templateFunction - The specific template function to render the main content.
 * @param {Request} request - The incoming request object.
 * @param {Object} options - Configuration and context data for rendering the template.
 * @return {string} - A fully assembled HTML page as a string.
 */
const createPage = async (templateFunction, request, options = {}) => {
  // Default values for the options if not provided.
  const {
    isAuthenticated = false,
    feedback = {
      success: null,
      message: null,
    },
    data = null
  } = options;

  // List of sections that make up the structure of the admin page.
  const sections = [
    documentHead,
    pageHead,
    pageBreadcrumbs,
    templateFunction,
    pageAFooter,
    documentEnd,
  ];

  // Resolve each section, which might be asynchronous, and concatenate them together.
  const resolvedSections = await Promise.all(
    sections.map(async section => {
      const result = await section(request, options);
      return Array.isArray(result) ? result.join('') : result;
    })
  );

  return resolvedSections.join('');
}

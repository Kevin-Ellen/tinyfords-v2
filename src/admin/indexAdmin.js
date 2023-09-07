/**
 * indexAdmin.js
 * 
 * This module serves as the main entry point for handling admin-related requests.
 * Based on the request method (GET, POST) and the URL path, it delegates the request
 * to the appropriate handler. If the request doesn't match any defined route, 
 * appropriate error messages are returned.
 */

// Importing handlers
import handlerTemplate from './lib/handlers/template';
import handlerAdminLogin from './lib/handlers/adminLogin';
import handlerAdminLogout from './lib/handlers/adminLogout';
import handlerAdminCarAdd from './lib/handlers/carAdd';
import handlerAdminCarSearch from './lib/handlers/carSearch';
import handlerAdminCarEdit from './lib/handlers/carEdit';
import handlerError from '../lib/handlers/error';

/**
 * Main function to handle incoming admin requests.
 * 
 * @param {Request} request - The incoming request object.
 * @return {Response} The response object generated by the appropriate handler.
 */
const indexAdmin = async (request) => {
  const url = new URL(request.url);
  
  // Handling GET requests
  if (request.method === 'GET') {
    switch (url.pathname) {
      case '/admin': 
      case '/admin/add-car':
      case '/admin/search-car':
        return await handlerTemplate(request);
      case '/admin/logout':
        return handlerAdminLogout(request);
      
      default: return handlerError(404, 'GET: Not Found');
    }
  }

  // Handling POST requests
  if (request.method === 'POST') {
    switch (url.pathname) {
      case '/admin': 
        return handlerAdminLogin(request);
      case '/admin/add-car': 
        return handlerAdminCarAdd(request);
      case '/admin/search-car': 
        return handlerAdminCarSearch(request);
      case '/admin/edit-car': 
        return handlerAdminCarEdit(request);
      
      default: return handlerError(404, 'POST: Not Found');
    }
  }

  // If none of the above methods match, return method not allowed
  return handlerError(405,'Method not allowed');
}
export default indexAdmin;
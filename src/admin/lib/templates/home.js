/**
 * home.js
 * 
 * This module provides the template for the admin home page.
 * It displays a list of admin functions such as "Add car" and "Edit car".
 * If the user is authenticated, it shows the admin functions; otherwise, 
 * it prompts the user to log in.
 */

// External Dependencies
import fragmentContent from '../../../lib/fragments/content';
import { quickLogin } from '../utils/misc';

/**
 * Constructs the HTML template for the admin home page.
 *
 * @param {Request} request - The incoming request object.
 * @param {Object} options - Contains information about whether the user is authenticated.
 * @return {string} The HTML template of the admin home page.
 */
const templateAdminHome = (request, options) => {
  
  // The main content of the admin home page
  const content = [
    `<h1>Admin panel</h1>`,
    `<p>Admin functions to add and edit cars.</p>`,
    `<ul>`,
      `<li><a href="/admin/add-car">Add car</a></li>`,
      `<li><a href="/admin/edit-car">Edit car</a></li>`,
    `</ul>`,
  ].join('');

  // Wrap the main content in the standard content fragment
  const sections = [
    fragmentContent(content)
  ].join('');

  // If the user is authenticated, return the sections. Otherwise, return the login prompt.
  return options.isAuthenticated ? sections : quickLogin(request) || sections;
}
export default templateAdminHome;
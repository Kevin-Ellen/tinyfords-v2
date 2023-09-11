/**
 * carEdit.js
 * 
 * This module provides the template for the "Edit Car" page of the admin interface.
 * It contains the logic for rendering the car editing form and displaying feedback 
 * after a car search or edit action. Authentication checks are also performed 
 * to determine what content to display.
 */

// External Dependencies
import fragmentContent from '../fragments/content';
import fragmentFormCarSearch from '../fragments/formCarSearch';
import fragmentFormCarEdit from '../fragments/formCarEdit';
import { quickLogin } from '../utils/misc';

/**
 * Generates the HTML template for the "Edit Car" admin page.
 *
 * @param {Request} request - The incoming request object.
 * @param {Object} options - Additional optional parameters, including feedback and car details.
 * @return {string} The HTML template of the "Edit Car" page.
 */
const templateAdminCarEdit = async (request, options = {}) => {

  // Check if the feedback indicates a search result
  if(!options.feedback.search){
    return await response(options);
  }

  const sections = [
    await fragmentFormCarEdit(options.data),
  ].join('');

  // If the user is authenticated, return the sections. Otherwise, return the login prompt.
  return options.isAuthenticated ?  sections :  quickLogin(request) || sections;
}
export default templateAdminCarEdit;

/**
 * Constructs the HTML segment for displaying the feedback and search form.
 *
 * @param {Object} options - Contains feedback and car details.
 * @return {Array} An array containing the HTML segments for feedback and the search form.
 */
const response = async (options) => {
  const sections = [
    fragmentContent(addedDetail(options)),
    await fragmentFormCarSearch(),
  ];
  return sections;
}

/**
 * Constructs the HTML segment for displaying the feedback after a car search.
 *
 * @param {Object} options - Contains feedback and car details.
 * @return {string} The HTML segment for the feedback.
 */
const addedDetail = (options) => {

  const sections = [
    `<div class="adminCenter">`,
      `<h2>${options.feedback.message}</h2>`,
      `<p>Car ID searched for was: ${options.data.id}</p>`,
    `</div>`,
  ].join('');

  return sections;
}
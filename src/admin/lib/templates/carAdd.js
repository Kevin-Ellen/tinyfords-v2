/**
 * carAdd.js
 *
 * This module provides the template for the "Add Car" page of the admin interface.
 * It contains the logic for rendering the car addition form and displaying the details
 * of a car that's just been added. The module also checks for a quick login status
 * to determine what content to display.
 */

// External Dependencies
import fragmentContent from '../fragments/content';
import fragmentFormCarAdd from '../fragments/formCarAdd';
import { quickLogin } from '../utils/misc';

/**
 * Generates the HTML template for the "Add Car" admin page.
 *
 * @param {Request} request - The incoming request object.
 * @param {Object} options - Additional optional parameters, including feedback and car details.
 * @return {string} The HTML template of the "Add Car" page.
 */
const templateAdminCarAdd = async (request, options = {}) => {
  const contentTop = [
    `<h1>Add car</h1>`
  ];

  const contentFeedback = [
    options.feedback ? fragmentContent(addedDetail(options)) : null,
  ].join('');

  const sections = [
    fragmentContent(contentTop),
    contentFeedback || null,
    await fragmentFormCarAdd(options),
  ].join('');

  return quickLogin(request) || sections;
}
export default templateAdminCarAdd;

/**
 * Constructs the HTML segment for displaying the details of the added car.
 *
 * @param {Object} options - Contains feedback and car details.
 * @return {string} The HTML segment for the added car details.
 */
const addedDetail = (options) => {
  const sections = [
    `<h2>${options.feedback.message}</h2>`,
    createCarDetails(options.data),
  ].join('');

  return sections;
}

/**
 * Constructs the HTML card for the details of a specific car.
 *
 * @param {Object} data - Contains the car details.
 * @return {string} The HTML card displaying the car's details.
 */
const createCarDetails = (data) => {
  const html = `<h3>Car details</h3>
  <div class="carCard">
    <ul class="carDetails">
      <li><strong>ID:</strong> ${data.id}</li>
      <li><strong>Code:</strong> ${data.code}</li>
      <li><strong>Base:</strong> ${data.base}</li>
      <li><strong>Name:</strong> ${data.name}</li>
      <li><strong>Make:</strong> ${data.make}</li>
      <li><strong>Brand:</strong> ${data.brand}</li>
      <li><strong>Category:</strong> ${data.categoryDetails.name}</li>
      <li><strong>Case type:</strong> ${data.caseDetails.name}</li>
      <li><strong>In case:</strong> ${data.caseDetails.status===null ? 'n/a' : data.caseDetails.status ? 'Yes' : 'No'}</li>
      <li><strong>Has photo:</strong> ${data.hasPhoto ? 'Yes' : 'No'}</li>
      <li><strong>Quantity:</strong> ${data.quantity}</li>
    </ul>
  </div>`;
  return html;
}
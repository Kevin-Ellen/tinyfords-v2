/**
 * carSearch.js
 *
 * This module provides the template for the "Search Car" page of the admin interface.
 * It contains the logic for rendering the search form, displaying the search results
 * in a table format, and providing an edit option for the listed cars.
 * The module also checks for an authentication status to determine what content to display.
 */

// External Dependencies
import fragmentContent from '../../../lib/fragments/content';
import fragmentFormCarSearch from '../fragments/formCarSearch';
import { quickLogin } from '../utils/misc';

/**
 * Generates the HTML template for the "Search Car" admin page.
 *
 * @param {Request} request - The incoming request object.
 * @param {Object} options - Additional optional parameters, including feedback and car search results.
 * @return {string} The HTML template of the "Search Car" page.
 */
const templateAdminCarSearch = async (request, options = {}) => {
  
  const contentTop = [
    `<h1>Search car</h1>`
  ];

  const contentFeedback = [
    options.feedback ? fragmentContent(addedDetail(options)) : null,
  ].join('');

  const sections = [
    fragmentContent(contentTop),
    contentFeedback || null,
    await fragmentFormCarSearch(options),
  ].join('');

  return options.isAuthenticated ?  sections :  quickLogin(request) || sections;
}
export default templateAdminCarSearch;

/**
 * Constructs the HTML segment for displaying the feedback and search results table.
 *
 * @param {Object} options - Contains feedback and car search results.
 * @return {string} The HTML segment for the feedback and search results.
 */
const addedDetail = (options) => {

  const sections = [
    `<h2>${options.feedback.message}</h2>`,
    createTable(options.data),
  ].join('');

  return sections;
}

/**
 * Constructs the HTML table for displaying the car search results.
 *
 * @param {Array} data - Contains the car search results.
 * @return {string} The HTML table displaying the car search results.
 */
const createTable = (data) => {

  const svg = {
    true: generateSVG('true'),
    false: generateSVG('false'),
    null: generateSVG('null'),
  }

  const rows = data.map(car => `
  <tr>
    <td><input type="radio" name="carId" id="car${car.id}" value="${car.id}"></td>
    <td><label for="car${car.id}">${car.id}</label></td>
    <td><label for="car${car.id}">${car.name}</label></td>
    <td><label for="car${car.id}">${car.make}</label></td>
    <td><label for="car${car.id}">${car.code}</label></td>
    <td><label for="car${car.id}">${car.base}</label></td>
    <td><label for="car${car.id}">${car.categoryDetails.name}</label></td>
    <td><label for="car${car.id}">${car.brand}</label></td>
    <td><label for="car${car.id}">${car.caseDetails.name}</label></td>
    <td>
      <label for="car${car.id}">
        ${car.caseDetails.status === true ? 
          svg.true : 
          car.caseDetails.status === false ? 
          svg.false : 
          svg.null}
        </label>
    </td>
    <td>
      <label for="car${car.id}">
        ${car.hasPhoto ? 
          svg.true : 
          svg.false}
      </label>
    </td>
    <td><label for="car${car.id}">${car.addedDetails.date}</label></td>
    <td><label for="car${car.id}">${car.quantity}</label></td>
  </tr>
`).join('');

  const html = `<section>
    <h2>Cars found</h2>
    <div class="tableAdmin">
      <form action="/admin/edit-car" method="post">
        <div class="tableWrapper">
          <table>
            <thead>
              <tr>
                <th>Edit</th>
                <th>ID</th>
                <th>Name</th>
                <th>Make</th>
                <th>Code</th>
                <th>Base</th>
                <th>Category</th>
                <th>Brand</th>
                <th>Case type</th>
                <th>Has case</th>
                <th>Has photo</th>
                <th>Added date</th>
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody>
              ${rows}
            </tbody>
          </table>
        </div>
        <button type="submit">Edit Selected Car</button>
      </form>
    </div>
  </section>`;
  return html;
}

/**
 * Constructs the SVG icons for displaying certain car attributes.
 *
 * @param {string} value - The attribute value (true, false, or null).
 * @return {string} The SVG icon corresponding to the attribute value.
 */
const generateSVG = (value) => {
  const svgData = {
    true:{
      label: 'True',
      viewbox: '0 0 448 512',
      path: '<path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/>',
    },
    false:{
      label: 'False',
      viewbox: '0 0 384 512',
      path: '<path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/>',
    },
    null:{
      label: 'Null',
      viewbox: '0 0 512 512',
      path: '<path d="M304 48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zm0 416a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM48 304a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm464-48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM142.9 437A48 48 0 1 0 75 369.1 48 48 0 1 0 142.9 437zm0-294.2A48 48 0 1 0 75 75a48 48 0 1 0 67.9 67.9zM369.1 437A48 48 0 1 0 437 369.1 48 48 0 1 0 369.1 437z"/>',
    }
  }
  const data = svgData[value];
  return `<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="${data.viewbox}" role="img" aria-label="${data.label}">
    ${data.path}
  </svg>`;
}
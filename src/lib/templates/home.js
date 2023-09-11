/**
 * home.js
 * 
 * This module provides the template for the homepage of the `tinyfords-v2` application.
 * The homepage showcases a welcome message, a total count of Ford die-cast cars, 
 * and a grid of the latest additions to the collection.
 */

// Importing required modules and utilities.
import fragmentGridCars from '../fragments/gridCars';
import { utilDataCarsLatest } from '../utils/dataCars';

/**
 * Generate the HTML content for the homepage.
 * 
 * @param {Object} data - All the pages and cars data
 * @returns {string} - The constructed homepage as an HTML string.
 */
const templateHome = async (data) => {

  // Get the content for the homepage and adjust the counter
  const content = data.pages.current.content.intro
    .replace('<strong id="countCollection"></strong>', `<strong id="countCollection">${data.cars.length}</strong>`)
    .replace(`<h1></h1>`,`<h1>${data.pages.current.h1}</h1>`);

  // Fetch the latest cars to display in a grid.
  const dataCarsLatest =  utilDataCarsLatest(data.cars, 14);
  
  // Combine the main content and grid of latest cars to form the complete homepage.
  const sections = [
    `<main>`,
      content,
      fragmentGridCars('Latest additions', 2, dataCarsLatest),
    `</main>`,
  ].join('');

  return sections;
}
export default templateHome;
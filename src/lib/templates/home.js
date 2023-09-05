/**
 * home.js
 * 
 * This module provides the template for the homepage of the `tinyfords-v2` application.
 * The homepage showcases a welcome message, a total count of Ford die-cast cars, 
 * and a grid of the latest additions to the collection.
 */

// Importing required modules and utilities.
import fragmentContent from '../fragments/content';
import fragmentGridCars from '../fragments/gridCars';
import { servicesGithubDataCarsAll } from '../services/github';
import { utilDataCarsLatest } from '../utils/dataCars';

/**
 * Generate the HTML content for the homepage.
 * 
 * @param {Object} dataPageCurrent - The current page's data.
 * @param {Array} dataPageAll - The data for all pages.
 * @returns {string} - The constructed homepage as an HTML string.
 */
const templateHome = async (dataPageCurrent, dataPageAll) => {

  // Fetch all car data from the GitHub repository.
  const dataCarsAll = await servicesGithubDataCarsAll();

  // Construct the main content for the homepage, including the welcome message and count of cars.
  const content = [
    `<h1>${dataPageCurrent.h1}</h1>`,
    `<p>Welcome to Tiny Fords, the website of a Ford die-cast car enthusiast. Here, you'll find my collection of Hot Wheels, Matchbox, and other small scale models of your many Ford cars. Our easy-to-use website makes it simple to navigate and find the cars, this is mainly so we can avoid buying duplicates and keep our collection up-to-date. Let's dive in and explore the collection together!</p>`,
    `<p>Currently there are <strong>${dataCarsAll.length}</strong> items within the various collections!</p>`
  ].join('');

  // Fetch the latest cars to display in a grid.
  const dataCarsLatest = await utilDataCarsLatest(dataCarsAll, 14);
  
  // Combine the main content and grid of latest cars to form the complete homepage.
  const sections = [
    `<main>`,
      fragmentContent(content),
      fragmentGridCars('Latest additions', 2, dataCarsLatest),
    `</main>`,
  ].join('');

  return sections;
}
export default templateHome;
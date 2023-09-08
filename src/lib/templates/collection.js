/**
 * collection.js
 * 
 * This module provides the template for the collection pages.
 * The collection will depend on the slug and it will display the 
 * cars in the carsgrid.
 */

// Importing required modules and utilities.
import fragmentContent from '../fragments/content';
import fragmentGridCars from '../fragments/gridCars';
import fragmentPaginationControls from '../fragments/paginationControls';
import fragmentSearchBar from '../fragments/searchBar';
import { servicesGithubDataCarsAll } from '../services/github';
import { getCarsByCategoryId } from '../utils/dataCars';
import { multiSort } from '../utils/misc';
import utilPaginationData from '../utils/pagination';
import handlerError from '../handlers/error';

import { getCaseById } from '../utils/dataCars';

// Define the constant for the number of items per grid
const ITEMS_PER_GRID = 21;

 /**
 * Generate the HTML content for the collection page.
 * 
 * @param {Object} dataPageCurrent - The current page's data.
 * @returns {string} - The constructed collection as an HTML string.
 */
const templateCollection = async (dataPageCurrent, dataPageAll = {}, options = {}) => {
  
  // Fetch data for all cars
  const data = {
    all: await servicesGithubDataCarsAll(),
  }

  // Check if the current page ID is 'all' to decide which cars to display
  data.filtered = dataPageCurrent.id === 'all' ? data.all : getCarsByCategoryId(data.all, dataPageCurrent.id);

  // Sort the cars based on the added date and ID
  data.sorted = multiSort(data.filtered, ['addedDetails.date', 'id'], { 'addedDetails.date': 'desc', 'id': 'desc' });

  // Filter the sorted cars based on the search term if provided
  if (options.feedback && options.feedback.success && options.feedback.action === 'search') {
    data.sorted = searchCars(data.sorted, options.data.searchValue);
  }


  // Get the paginated details based on the number of items and the current page
  const paginationDetails = getPaginationDetails(data.sorted, dataPageCurrent.url);
  paginationDetails.slug = dataPageCurrent.slug;


  if(dataPageCurrent.url.params.get('page')){
    dataPageCurrent.h1 = `${dataPageCurrent.h1} - Page: ${dataPageCurrent.url.params.get('page')}`;

    if(parseInt(dataPageCurrent.url.params.get('page'),10) > paginationDetails.totalPages){
      throw new Error('Pagination exceeded number of pages');
    }
  }

  // Construct the main content of the collection
  const content = [
    `<h1>${dataPageCurrent.h1}</h1>`,
    createCollectionContent(data.sorted, options),
    fragmentSearchBar(dataPageCurrent.url, options),
  ].join('');

  // Construct the sections including the main content, grid of cars, and pagination controls
  const sections = [
    `<main>`,
    fragmentContent(content),
    fragmentGridCars('Results', 2, paginationDetails.data),
    paginationDetails.totalPages > 1 ? fragmentPaginationControls(paginationDetails) : null,
    `</main>`,
  ].join('');

  return sections;
}
export default templateCollection;

/**
 * Generate the content and counter for the number of items in collection
 * 
 * @param {Array} data - The cars for the collection.
 * @param {Object} options - The additional options for feedback.
 * @returns {string} - The constructed content for the collection.
 */
const createCollectionContent = (data, options = {}) => {
  // Construct a message based on the number of items in the collection
  const content = [
    data.length === 1 ? `<p>There is <strong>${data.length}</strong> item within this collection.</p>` : `<p>There are <strong>${data.length}</strong> items within this collection.</p>`
  ];

  // Add feedback about the search term if available
  if (options.feedback && options.feedback.success && options.feedback.action === 'search') {
    content.push(`<p>Search term used: <strong>${options.data.searchValue}</strong>.</p>`);
  }

  return content.join('');
}

/**
 * Fetches paginated data based on the URL's page parameter.
 * 
 * @param {Array} data - The dataset to paginate.
 * @param {URL} url - The URL object that contains the page parameter.
 * @returns {Object} - The paginated data and related details.
 */
const getPaginationDetails = (data, url) => {
  // Extract the page number from the URL parameter, defaulting to 1
  const pageNumber = url.params.get('page');
  
  // Convert the page number to a zero-based index
  const pageIndex = pageNumber ? parseInt(pageNumber, 10) - 1 : 0;

  // Calculate the starting index for pagination
  const startIndex = pageIndex * ITEMS_PER_GRID;

  // Fetch the paginated data subset
  return utilPaginationData(data, ITEMS_PER_GRID, startIndex);
}

/**
 * Filters the dataset of cars based on a search term.
 * 
 * @param {Array} data - The dataset of cars.
 * @param {string} term - The search term.
 * @returns {Array} - The filtered list of cars.
 */
const searchCars = (data, term) => {
  // Convert the search term to lowercase for case-insensitive search
  term = term.toLowerCase();

  // Return only those cars that have the search term in their name, brand, or code
  return data.filter(car => {
    return (
      car.name && car.name.toLowerCase().includes(term) ||           // Check if name exists and includes the term
      car.brand && car.brand.toLowerCase().includes(term) ||         // Check if brand exists and includes the term
      car.code && car.code.toLowerCase().includes(term)              // Check if code exists and includes the term
    );
  });
};
/**
 * collection.js
 * 
 * This module provides the template for the collection pages.
 * The collection will depend on the slug and it will display the 
 * cars in the carsgrid.
 */

// Importing required modules and utilities.
import fragmentGridCars from '../fragments/gridCars';
import fragmentPaginationControls from '../fragments/paginationControls';
import fragmentSearchBar from '../fragments/searchBar';
import { getCarsByCategoryId } from '../utils/dataCars';
import { multiSort } from '../utils/misc';
import utilPaginationData from '../utils/pagination';

// Define the constant for the number of items per grid
const ITEMS_PER_GRID = 21;

 /**
 * Generate the HTML content for the collection page.
 * 
 * @param {Object} - all the cars and page data
 * @returns {string} - The constructed collection as an HTML string.
 */
const templateCollection = async (data, options = {}) => {

  const tempCars = {
    filtered: null,
    sorted: null,
  };

  // Check if the current page ID is 'all' to decide which cars to display
  tempCars.filtered = data.pages.current.id === 'all' ? data.cars : getCarsByCategoryId(data.cars, data.pages.current.id);

  // Sort the cars based on the added date and ID
  tempCars.sorted = multiSort(tempCars.filtered, ['addedDetails.date', 'id'], { 'addedDetails.date': 'desc', 'id': 'desc' });

  // Filter the sorted cars based on the search term if provided
  if (options.feedback && options.feedback.success && options.feedback.action === 'search') {
    tempCars.sorted = searchCars(tempCars.sorted, options.data.searchValue);
  }

  // Get the paginated details based on the number of items and the current page
  const paginationDetails = getPaginationDetails(tempCars.sorted, data.pages.current.url);
  paginationDetails.slug = data.pages.current.slug;


  if(data.pages.current.url.params.get('page')){
    data.pages.current.h1 = `${data.pages.current.h1} - Page: ${data.pages.current.url.params.get('page')}`;

    if(parseInt(data.pages.current.url.params.get('page'),10) > paginationDetails.totalPages){
      throw new Error('Pagination exceeded number of pages');
    }
  }

  // Construct the main content of the collection
  const content = data.pages.current.content.intro
    .replace('<strong id="countCollection"></strong>', `<strong id="countCollection">${tempCars.filtered.length}</strong>`)
    .replace(`<h1></h1>`,`<h1>${data.pages.current.h1}</h1>`)
    .replace(`<search></search>`,fragmentSearchBar(data.pages.current.url, tempCars.sorted));

  // Construct the sections including the main content, grid of cars, and pagination controls
  const sections = [
    `<main>`,
      content,
      fragmentGridCars('Results', 2, paginationDetails.data),
      paginationDetails.totalPages > 1 ? fragmentPaginationControls(paginationDetails) : null,
    `</main>`,
  ].join('');

  return sections;
}
export default templateCollection;

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
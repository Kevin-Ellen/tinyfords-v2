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
import { servicesGithubDataCarsAll } from '../services/github';
import { getCarsByCategoryId } from '../utils/dataCars';
import { multiSort } from '../utils/misc';
import utilPaginationData from '../utils/pagination';

// Number of items per grid, used in pagination
ITEMS_PER_GRID = 21;

 /**
 * Generate the HTML content for the collection page.
 * 
 * @param {Object} dataPageCurrent - The current page's data.
 * @returns {string} - The constructed collection as an HTML string.
 */
const templateCollection = async (dataPageCurrent) => {

  const dataCarsAll = await servicesGithubDataCarsAll();

  // If the page ID is 'all', use the data for all cars
  const dataCarsFiltered = dataPageCurrent.id === 'all' ? dataCarsAll : getCarsByCategoryId(dataCarsAll, dataPageCurrent.id) 

  // Sort the cars, newest (dateAdded) 
  const dataCarsSorted =   multiSort(dataCarsFiltered, ['addedDetails.date', 'id'], { 'addedDetails.date': 'desc', 'id': 'desc' });

  const paginationDetails = getPaginationDetails(dataCarsSorted, dataPageCurrent.url);
  paginationDetails.slug = dataPageCurrent.slug;

  // const paginationDetails = utilPaginateData(data, ITEMS_PER_GRID, 0);

  const content = [
    `<h1>${dataPageCurrent.h1}</h1>`,
    createCollectionContent(dataCarsSorted),
  ].join('');

  const sections = [
    `<main>`,
      fragmentContent(content),
      fragmentSearchCard(),
      fragmentGridCars('Results',2,paginationDetails.data),
      paginationDetails.totalPages > 1 ? fragmentPaginationControls(paginationDetails) : null,
    `</main>`,
  ].join('');

  return sections;
}
export default templateCollection;

 /**
 * Generate the content and counter for the number of items in collection
 * 
 * @param {Object} data - The cars for the collection
 * @returns {string} - The constructed content for the collection
 */
const createCollectionContent = (data) => {
  const html = data.length === 1 ? `<p>There is <strong>${data.length}</strong> item within this collection.</p>` : `<p>There are <strong>${data.length}</strong> items within this collection.</p>`;
  return html;
}

 /**
 * Generate the search card to be displayed on the page
 * 
 * @returns {string} - The constructed content for the collection
 */
const fragmentSearchCard = () => {
  const html = `<section>
  </section>`;

  return html;
}

/**
 * Fetches paginated data based on the URL's page parameter.
 * 
 * @param {Array} data - The dataset to paginate.
 * @param {URL} url - The URL object that contains the page parameter.
 * @returns {Array} - The paginated data subset.
 */
const getPaginationDetails = (data, url) => {
  // Get the page number from the URL parameter. Default to 1 if not present.
  const pageNumber = url.params.get('page');
  
  // Convert the page number to a zero-based index.
  const pageIndex = pageNumber ? parseInt(pageNumber, 10) - 1 : 0;

  // Calculate the starting index for pagination based on the page index.
  const startIndex = pageIndex * ITEMS_PER_GRID;

  // Fetch the paginated data subset using the utilPaginationData function.
  const paginatedData = utilPaginationData(data, ITEMS_PER_GRID, startIndex);

  return paginatedData;
}
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
import { servicesGithubDataCarsAll } from '../services/github';
import { getCarsByCategoryId } from '../utils/dataCars';
import { multiSort } from '../utils/misc';

 /**
 * Generate the HTML content for the collection page.
 * 
 * @param {Object} dataPageCurrent - The current page's data.
 * @returns {string} - The constructed collection as an HTML string.
 */
const templateCollection = async (dataPageCurrent) => {
  console.log(dataPageCurrent);

  const dataCarsAll = await servicesGithubDataCarsAll();

  // If the page ID is 'all', use the data for all cars
  const dataCarsFiltered = dataPageCurrent.id === 'all' ? dataCarsAll : getCarsByCategoryId(dataCarsAll, dataPageCurrent.id) 

  // Sort the cars, newest (dateAdded) 
  const dataCarsSorted =   multiSort(dataCarsFiltered, ['addedDetails.date', 'id'], { 'addedDetails.date': 'desc', 'id': 'desc' });


  const content = [
    `<h1>${dataPageCurrent.h1}</h1>`,
    createCollectionContent(dataCarsSorted),
  ].join('');

  const sections = [
    `<main>`,
      fragmentContent(content),
      fragmentSearchCard(),
      fragmentGridCars('Results',2,dataCarsSorted),
    `</main>`,
  ].join('');

  return sections;
}
export default templateCollection;

 /**
 * Generate the content and counter for the number of items in collection
 * 
 * @param {Object} dataCarsFiltered - The cars for the collection
 * @returns {string} - The constructed content for the collection
 */
const createCollectionContent = (dataCarsFiltered) => {
  const html = dataCarsFiltered.length === 1 ? `<p>There is <strong>${dataCarsFiltered.length}</strong> item within this collection.</p>` : `<p>There are <strong>${dataCarsFiltered.length}</strong> items within this collection.</p>`;
  return html;
}

 /**
 * Generate the search card to be displayed on the page
 * 
 * @param {Object} dataCarsFiltered - The cars for the collection
 * @returns {string} - The constructed content for the collection
 */
const fragmentSearchCard = () => {
  const html = `<section>
  </section>`;

  return html;
}

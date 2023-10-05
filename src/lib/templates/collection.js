/**
 * collection.js
 * 
 * This module provides the template for the collection pages.
 * The collection will depend on the slug and it will display the 
 * cars in the carsgrid.
 */

// Importing required modules and utilities.

import { appData } from '../services/appData';

/**
 * home.js
 * 
 * This module provides the template for the homepage of the `tinyfords-v2` application.
 * The homepage showcases a welcome message, a total count of Ford die-cast cars, 
 * and a grid of the latest additions to the collection.
 */

// Importing required modules and utilities.
import { assembleHTML, assignClassName } from '../utils/helpersRenders';
import { createIntroTemplate } from '../fragments/fragmentCreators';
import fragmentSearchBar from '../fragments/searchBar';
import fragmentGridCars from '../fragments/gridCars';
import fragmentPaginationControls from '../fragments/paginationControls';

/**
 * Generate the HTML content for the homepage.
 * 
 * @param {Object} data - All the pages and cars data
 * @returns {string} - The constructed homepage as an HTML string.
 */
const templateCollection = ({ pagination, cars, pages: { current } } = appData) => {

  const paginatedCars = [... cars.current.slice(pagination.start, pagination.end)];

  const html = ['<main>'];

  const container = {
    element: current.content.container?.element || 'section',
    className: assignClassName(current.content.container?.className), 
  }

  html.push(`<${container.element} ${container.className}>`);
  if(pagination.page>1){
    html.push(`<h1>${current.h1} <span>- Page: ${pagination.page}</span></h1>`);
  }else{
    html.push(`<h1>${current.h1}</h1>`);
  }

  if(current.content.intro){
    html.push(createIntroTemplate(current.content.intro));
  }

  html.push(fragmentSearchBar(current.url.pathname));

  const heading = {
    element: 'h2',
    content: appData.search.searchTerm ? 'Search results' : 'Results'
  }

  html.push(`</${container.element}>`);

  html.push(fragmentGridCars({heading: heading, data: paginatedCars}));

  

  if(pagination.total > 1){
    html.push(fragmentPaginationControls(pagination));
  }

  html.push('</main>');
  return assembleHTML(html);
}
export default templateCollection;
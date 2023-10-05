/**
 * home.js
 * 
 * This module provides the template for the homepage of the `tinyfords-v2` application.
 * The homepage showcases a welcome message, a total count of Ford die-cast cars, 
 * and a grid of the latest additions to the collection.
 */

// Importing required modules and utilities.
import { appData } from '../services/appData';
import { assembleHTML, assignClassName } from '../utils/helpersRenders';
import { createIntroTemplate } from '../fragments/fragmentCreators';
import fragmentSearchBar from '../fragments/searchBar';
import fragmentGridCars from '../fragments/gridCars';

/**
 * Generate the HTML content for the homepage.
 * 
 * @param {Object} data - All the pages and cars data
 * @returns {string} - The constructed homepage as an HTML string.
 */
const templateHome = (data = appData.pages.current) => {
  const html = ['<main>'];

  const container = {
    element: data.content.container?.element || 'section',
    className: assignClassName(data.content.container?.className), 
  }

  html.push(`<${container.element} ${container.className}>`);
  html.push(`<h1>${data.h1}</h1>`);

  if(data.content.intro){
    html.push(createIntroTemplate(data.content.intro));
  }

  html.push(fragmentSearchBar('/all'));

  html.push(`</${container.element}>`);
  html.push(fragmentGridCars({heading:{element: 'h2', content: 'Results'}, data: appData.cars.current}));

  html.push('</main>');
  return assembleHTML(html);
}
export default templateHome;
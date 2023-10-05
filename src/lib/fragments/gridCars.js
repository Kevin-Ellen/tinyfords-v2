/**
 * gridCars.js
 * 
 * This module provides functions to create a grid layout for cars. 
 * The grid displays information about each car in a card format.
 */

import { assignClassName, assembleHTML } from '../utils/helpersRenders';

/**
 * Create an HTML grid of cars with a heading.
 * 
 * @param {string} heading - The main heading for the grid.
 * @param {number|string} headingLevel - The heading level (e.g., 1 for h1, 2 for h2). Defaults to h2 if invalid.
 * @param {Array} dataCars - The list of car data objects to display in the grid.
 * @returns {string} - The constructed grid as an HTML string.
 */
const fragmentGridCars = (data) => {
  const html = ['<section>'];
  if(data.heading){
    const heading = {
      element: data.heading.element || 'h2',
      content: data.heading.content || 'Results',
      className: assignClassName(data.heading.attributes?.className),
    }
    html.push(`<${heading.element} ${heading.className}>${heading.content}</${heading.element}>`);

    html.push(createGrid(data.data));
  }
  html.push('</section>');
  return assembleHTML(html);


}
export default fragmentGridCars;

/**
 * Generate the HTML for the grid of cars.
 * 
 * @param {Array} dataCars - The list of car data objects to display in the grid.
 * @returns {string} - The HTML for the grid.
 */
const createGrid = (content) => {

  const cards = content.map(createCard).join('');

  const html = `<div class="fragmentCarsGrid">
    ${cards}
  </div>`;

  return html;
}

/**
 * Generate the HTML for a single car card in the grid.
 * 
 * @param {Object} car - The car data object.
 * @returns {string} - The HTML for the car card.
 */
const createCard = (car) => {

  const imageUrl = createImgPath(car);

  return `
    <div class="fragmentGridCard">
      <img src="${imageUrl}" height="150" width="150" alt="${car.brand} ${car.name} ${car.code ? `- ${car.code}` : ''}" loading="lazy">
      <ul class="fragmentGridCardContent">
        <li><h3>${car.name}</h3></li>
        <li><strong>Make:</strong> ${car.make}</li>
        ${car.code ? `<li><strong>Code:</strong> ${car.code.toUpperCase()}</li>` : ''}
        <li><strong>Added:</strong> ${car.addedDetails.date}</li>
      </ul>
    </div>`;
}

/**
 * Check if the car has a photo
 * If not, use a placeholder
 * If yes, display photo
 * 
 * @param {Object} car - The car data object.
 * @returns {string} - image path
 */
export const createImgPath = (car) => {
  const baseFolder = `/images/${car.categoryDetails.folder}/front-250/`;
  const postfix = `-front-250.jpg`;

  let imagePath;

  if (car.hasPhoto) {
    if (car.categoryDetails.id === 'ot') {
      imagePath = `${car.categoryDetails.id}-${car.id}`;
    } else {
      imagePath = `${car.categoryDetails.id}-${car.code}`;
    }
  } else {
    imagePath = 'coming-soon';
  }

  return `${baseFolder}${imagePath}${postfix}`;
}
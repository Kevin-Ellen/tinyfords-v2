/**
 * content.js
 * 
 * This module provides the template for content pages.
 * Each content page may have different structure and information,
 * which are stored within /data/contentPages.js.
 */

// Importing necessary modules
import { dataContentAbout, dataContentHowToFindToyNumber, dataContentKlasCarKeepers } from '../../data/content';
import fragmentContentLongForm from '../fragments/contentLongForm';

 /**
 * Generate the HTML content for the collection page.
 * 
 * @param {Object} dataPageCurrent - The current page's data.
 * @returns {string} - The constructed template as an HTML string.
 */
const templateContent = (dataPageCurrent) => {
  // Define the pages and their associated content data
  const pages = {
    'about': dataContentAbout,
    'toynumber': dataContentHowToFindToyNumber,
    'klasCarKeepers': dataContentKlasCarKeepers,
  }

  // Get the specific content for the current page
  const content = pages[dataPageCurrent.id];

  // Generate the main template, combining the intro and other content sections
  return `<main>
    <section class="fragmentContentLongForm">
      <div class="contentLongFormContainer">
        <h1>${dataPageCurrent.h1}</h1>
        ${content.intro}
        ${createAsideImage(content.body.asideImage, content.image)}
        ${createBelowImage(content.body.belowImage)}
      </div>
    </section>
  </main>`;
}
export default templateContent;

/**
 * Create the section of content that appears alongside an image.
 * 
 * @param {Array} data - Array of content sections.
 * @param {string} image - Image URL.
 * @returns {string} - The constructed HTML for the content alongside the image.
 */
const createAsideImage = (data, image) => {
  // Return early if no data is provided
  if(!data){ return ''; }

  // Compile the content sections into a single string
  const content = data.map(section => section.content).join('');

  // Construct the HTML for the image and its accompanying content
  const html = `<div class="contentLongForm">
     <picture class="contentLongFormSideImage" >
      <source media="(min-width: 500px)" srcset="${image.desktop}">
      <source media="(min-width: 0px)" srcset="${image.mobile}">
      <img src="${image.mobile}" alt="About Top" width="16" height="9">
    </picture>

    <div class="contentText">
      ${content}
    </div>
  </div>`;

  return html;
}

/**
 * Create the section of content that appears below the main image.
 * 
 * @param {Array} data - Array of content sections.
 * @returns {string} - The constructed HTML for the content below the image.
 */
const createBelowImage = (data) => {
  // Return early if no data is provided
  if(!data){ return ''; }

  // Compile the content sections into a single string
  const content = data.map(section => section.content).join('');

  // Construct the HTML for the content below the image
  const html = `<div>
    ${content}
  </div>`;

  return html;
}

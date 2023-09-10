/**
 * documentEnd.js
 * 
 * This module exports a function that generates the closing part of an HTML document.
 * It closes the body and html tags that were opened in the beginning of the document.
 */

import spaGlobals from '../js/spaGlobals-raw-js.js';
import spaNav from '../js/spaNavigation-raw-js.js';
import spaSearch from '../js/spaSearch-raw-js.js';
import spaEventListeners from '../js/spaEventListeners-raw-js.js';
import spaPagination from '../js/spaPagination-raw-js.js';

/**
 * Generates the closing HTML markup for the page.
 * 
 * @param {Object} dataPageCurrent - Data specific to the current page (not used in the current implementation).
 * @param {Object} dataPageAll - Data that is common to all pages (not used in the current implementation).
 * @return {string} The closing HTML markup.
 */
const documentEnd = (dataPageCurrent, dataPageAll) => {
  // The closing tags for body and html
  const html = `
        <script>
          ${spaGlobals}
          ${spaNav}
          ${spaSearch}
          ${spaEventListeners}
          ${spaPagination}
        </script>
        ${templateGrid(dataPageCurrent)}
      </body>
    </html>
  `;

  return html;
}
export default documentEnd;

const templateGrid = () => {
  return `<template id="gridItem">
    <div class="fragmentGridCard">
      <img height="150" width="150" loading="lazy" id="templateGridImage">
      <ul class="fragmentGridCardContent">
        <li><h3></h3></li>
        <li id="templateGridCode"><strong>Make:</strong> <span></span></li>
        <li id="templateGridMake"><strong>Code:</strong> <span></span></li>
        <li id="templateGridAdded"><strong>Added:</strong> <span></span></li>
      </ul>
    </div>
  </template>`;
}
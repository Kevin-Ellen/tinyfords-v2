/**
 * documentEnd.js
 * 
 * This module exports a function that generates the closing part of an HTML document.
 * It closes the body and html tags that were opened in the beginning of the document.
 */

import spaInit from '../csr-js/spa/init/init-spa.js';

import spaNavigateHandler from '../csr-js/spa/handlers/navigation-spa.js';
import spaAppState from '../csr-js/spa/handlers/appstate-spa.js';
import spaTemplateHandler from '../csr-js/spa/handlers/template-spa.js';
import spaSearchHandler from '../csr-js/spa/handlers/search-spa.js';

import spaCreatePagination from '../csr-js/spa/ui/createPagination-spa.js';
import spaUpdateHeadings from '../csr-js/spa/ui/updateHeadings-spa.js';
import spaCreateGrid from '../csr-js/spa/ui/createGrid-spa.js';
import spaCreateBreadcrumbs from '../csr-js/spa/ui/createBreadcrumbs-spa.js';

import spaHomeRender from '../csr-js/spa/ui/renderHome-spa.js';
import spaCollectionRender from '../csr-js/spa/ui/renderCollection-spa.js';
import spaContentRender from '../csr-js/spa/ui/renderContent-spa.js';
import spaCommonItemsRender from '../csr-js/spa/ui/renderCommentItems-spa.js';

import spaTools from '../csr-js/spa/tools/tools-spa.js';

import pwaInit from '../csr-js/pwa/init-pwa.js';

import { appData } from '../services/appData.js';



/**
 * Generates the closing HTML markup for the page.
 * 
 * @param {Object} data - All the cars and pages data
 * @return {string} The closing HTML markup.
 */




const documentEnd = (data = appData) => {
  // The closing tags for body and html
  const html = `
        ${templateGrid()}
        <script>
          window.__APP_STATE__ = ${JSON.stringify(appData)};
        </script>
        <script>
          
          ${spaTools}
          ${spaAppState}

          ${spaCreatePagination}
          ${spaUpdateHeadings}
          ${spaCreateGrid}
          ${spaCreateBreadcrumbs}
          
          ${spaHomeRender}
          ${spaCollectionRender}
          ${spaContentRender}
          ${spaCommonItemsRender}
          
          ${spaTemplateHandler}
          ${spaSearchHandler}
          ${spaNavigateHandler}
          ${spaInit}
        
        </script>
        <script>
          ${pwaInit}
        </script>
      </body>
    </html>
  `;

  return html;
}
export default documentEnd;


const templateGrid = () => {
  return `<template id="gridItem">
    <div class="fragmentGridCard">
      <img height="150" width="150" loading="lazy" class="templateGridImage">
      <ul class="fragmentGridCardContent">
        <li><h3></h3></li>
        <li class="templateGridMake"><strong>Make:</strong> <span></span></li>
        <li class="templateGridCode"><strong>Code:</strong> <span></span></li>
        <li class="templateGridAdded"><strong>Added:</strong> <span></span></li>
      </ul>
    </div>
  </template>`;
}
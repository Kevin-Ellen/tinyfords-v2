/**
 * documentEnd.js
 * 
 * This module exports a function that generates the closing part of an HTML document.
 * It closes the body and html tags that were opened in the beginning of the document.
 */

import rawJS from '../js/spa-engine-raw-js.js';

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
          ${rawJS}
        </script>
      </body>
    </html>
  `;

  return html;
}
export default documentEnd;
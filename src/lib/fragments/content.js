/**
 * content.js
 * 
 * This module provides a function to wrap content inside a specific HTML structure.
 * The content is placed within a <section> element with the class "fragmentContent".
 */

/**
 * Wrap provided content within a <section> element.
 * 
 * @param {string} content - The content to be wrapped.
 * @returns {string} - The wrapped content as an HTML string.
 */
const fragmentContent = (content) => {
  const html = `<section class="fragmentContent">
    ${content}
  </section>`;
  return html;
}
export default fragmentContent;

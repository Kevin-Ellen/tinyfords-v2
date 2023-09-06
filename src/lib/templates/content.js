/**
 * content.js
 * 
 * This module provides the template for content pages.
 * The content is different per site and infromation is
 * stored within /data/contentPages.js
 */

// Importing necessary modules
import { dataContentAbout } from '../../data/content';
import fragmentContent from '../fragments/content';

 /**
 * Generate the HTML content for the collection page.
 * 
 * @param {Object} dataPageCurrent - The current page's data.
 * @returns {string} - The constructed template as an HTML string.
 */
const templateContent = (dataPageCurrent) => {
  const sections = [
    `<main>`,
    `<h1>About Tiny Fords</h1>`,
    arrayToSections(dataContentAbout),
    `</main>`,
  ].join('');

  return sections;
}
export default templateContent;

/**
 * Turn an array into a string of content
 * 
 * @param {array} arr - The array that needs to be split in content fragments
 * @returns {string} - The constructed content as an HTML string.
 */
const arrayToSections = (arr) => {
  // Use the map function to apply the fragmentContent function to each entry in the array
  const sections = arr.map(entry => fragmentContent(entry));

  // Use the join method to join the array of sections into a single string
  return sections.join('');
}
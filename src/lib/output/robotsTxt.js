/**
 * robotsTxt.js
 * 
 * This module generates a robots.txt file for the application.
 * The robots.txt file is used to instruct web crawling robots about which pages to crawl or not to crawl.
 * Currently, this module allows all user-agents to access all parts of the site and points them 
 * to the location of the sitemap for more detailed crawl instructions.
 */

/**
 * Generate and return a Response object containing the content of robots.txt.
 * 
 * @param {URL} url - The URL object representing the current request.
 * @returns {Response} - A Response object with the content of robots.txt.
 */
const outputRobotsTxt = (url) => {
  return new Response(robotstxtcontent(url), {status: 200});
}
export default outputRobotsTxt;

/**
 * Generate the content for the robots.txt file.
 * 
 * @param {URL} url - The URL object representing the current request.
 * @returns {string} - The content of the robots.txt file.
 */
const robotstxtcontent = (url) => `
# Hello!
user-agent: *
allow: /

sitemap: ${url.protocol}//${url.host}/sitemap.xml
`;

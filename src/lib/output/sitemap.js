/**
 * xmlSitemap.js
 * 
 * This module generates a manifest.json file for the application.
 * The manifest.json file is used for the PWA
 */

// Import dependencies
import { servicesGithubDataPageAll } from '../services/github';

/**
 * Generate and return a Response object containing the content of the XML sitemap.
 * 
 * @returns {Response} - A Response object with the content of sitemap.xml.
 */
const outputXmlSitemap = async (url) => {
  const dataPagesAll = await servicesGithubDataPageAll();
  return new Response(content(dataPagesAll, url), {status: 200, headers:{'content-type':'application/xml'}});
}
export default outputXmlSitemap;

/**
 * Generate the content for the sitemap.xml file.
 * 
 * @param {Array} data - The list of all pages.
 * @returns {string} - The content of the sitemap.xml file.
 */
const content = (data, url) => {
  const entries = data
    .filter(entry => entry.xmlSitemap)
    .map(entry => `<url><loc>${url.origin}${entry.slug}</loc></url>`)
    .join('');


  const sections = [
    `<?xml version="1.0" encoding="utf-8"?>`,
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
    entries,
    `</urlset>`
  ].join('');
  return sections;

};

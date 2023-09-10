/**
 * manifest.js
 * 
 * This module generates various JSON outputs for the application based on the request URL.
 * One example is the manifest.json file used for PWAs. Additionally, this can output car data in JSON format.
 */

// Import necessary services
import { servicesGithubDataCarsAll } from '../services/github';

/**
 * Generate and return a Response object containing JSON content based on the URL.
 * 
 * @param {URL} url - The request URL to determine the type of JSON content required.
 * @returns {Response} - A Response object with the required JSON content.
 */
const outputJson = (url) => {
  // Extract the type of JSON content needed from the URL
  const type = url.pathname.replace('/json/', '');

  // Depending on the type, fetch the necessary data and return
  switch (type){
    case 'cars': 
      return getData(servicesGithubDataCarsAll);
    default:
      return new Response('Not Found', {status: 404, headers: {'content-type':'text/plain'}});
  }
}
export default outputJson;

/**
 * Fetch and return the desired data in a Response object.
 * 
 * @param {Function} func - The service function to call and fetch data.
 * @returns {Response} - A Response object with the fetched data in JSON format.
 */
const getData = async (func) => {
  const data = await func();
  return new Response(JSON.stringify(data), {status: 200, headers: {'content-type':'application/json', 'x-robots-tag':'noindex'}});
}

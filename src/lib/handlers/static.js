/**
 * static.js
 * 
 * This module provides functions to handle requests for static assets such as images and fonts. 
 * It routes the requests based on their pathnames.
 */

// Import necessary modules and utilities.
import outputRobotsTxt from '../output/robotsTxt';
import { servicesGithubImageGetter } from '../services/github';

/**
 * Handle requests for static assets.
 * 
 * @param {URL} url - The request URL object.
 * @returns {Response} - The response object.
 */
const handlerStatic = (url) => {

  // Handle image requests.
  if (url.pathname.startsWith('/images/')) {
    return imageRouter(url);
  }

  // Handle font requests.
  if (url.pathname.startsWith('/fonts/')) {
    return routerFonts(url);
  }

  // Handle specific paths.
  switch (url.pathname) {
    case '/robots.txt':
      return outputRobotsTxt(url);

    default:
      return new Response('Not Found', { status: 404 });
  }
}
export default handlerStatic;

/**
 * Route requests for fonts to their appropriate location.
 * 
 * @param {URL} url - The request URL object.
 * @returns {Promise<Response>} - The response object.
 */
const routerFonts = async (url) => {
  const newUrl = new URL(url);
  newUrl.host = 'fonts.gstatic.com';
  newUrl.port = '';
  newUrl.pathname = `/s/${newUrl.pathname.replace('/fonts/', '')}`;

  const cacheTime = 604800;

  let response = await fetch(newUrl.toString(), {
    cf: {
      cacheTtl: cacheTime,
      cacheEverything: true,
      cacheKey: newUrl.toString()
    }
  });

  response = new Response(response.body, response);

  response.headers.set('Cache-Control', `max-age=${cacheTime}`);

  return response;
}

/**
 * Route requests for images and retrieve them from GitHub.
 * 
 * @param {URL} url - The request URL object.
 * @returns {Promise<Response>} - The response object with the image.
 */
const imageRouter = async (url) => {
  const imageBlob = await servicesGithubImageGetter(url.pathname);
  const response = new Response(imageBlob);

  const fileExtension = url.pathname.split('.').pop().toLowerCase();
  const mimeTypes = {
    'jpg': 'image/jpeg',
    'jpeg': 'image/jpeg',
    'png': 'image/png',
    'gif': 'image/gif',
    'webp': 'image/webp'
    // ... add other extensions and MIME types as needed
  };
  response.headers.set('Content-Type', mimeTypes[fileExtension] || 'application/octet-stream');

  return response;
}
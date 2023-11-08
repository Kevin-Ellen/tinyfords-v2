/**
 * static.js
 * 
 * This module provides functions to handle requests for static assets such as images and fonts. 
 * It routes the requests based on their pathnames.
 */

// Import necessary modules and utilities.
import apiRobotsTxt from '../api/robotsTxt';
import apiManifest from '../api/manifest';
import apiSw from '../api/sw';
import apiXmlSitemap from '../api/sitemap';
import apiJson from '../api/outputJson';
import apiCreator from '../api/api';
import { servicesGithubImageGetter } from '../services/github';
import handlerError from './error';

const STATIC_CACHE_TIME = 30 * 24 * 60 * 60 * 1000;

/**
 * Handle requests for static assets.
 * 
 * @param {URL} url - The request URL object.
 * @returns {Response} - The response object.
 */
const handleStatic = (url, request = {}) => {

  // Handle image requests.
  if (url.pathname.startsWith('/images/')) {
    return imageRouter(url);
  }

  // Handle font requests.
  if (url.pathname.startsWith('/fonts/')) {
    return routerFonts(url);
  }

  // Handle JSON
  if (url.pathname.startsWith('/json/')) {
    return apiJson(url);
  }

    // Handle API
    if (url.pathname.startsWith('/api/')) {
      return apiCreator(url);
    }

  // Handle specific paths.
  switch (url.pathname) {
    case '/favicon.ico':
      url.pathname = `/images/icons${url.pathname}`;
      return imageRouter(url);

    case '/robots.txt':
      return apiRobotsTxt(url);

    case '/manifest.json':
      return apiManifest();

    case '/sitemap.xml':
      return apiXmlSitemap(url);

    case '/service-worker.js':
      return apiSw(url);

    default:
      return new Response('Not Found - static', { status: 404 });
  }
}
export default handleStatic;

/**
 * Route requests for fonts to their appropriate location.
 * 
 * @param {URL} url - The request URL object.
 * @returns {Promise<Response>} - The response object.
 */
const routerFonts = async (url) => {
  try{
    const newUrl = new URL(url);
    newUrl.protocol = 'https:';
    newUrl.host = 'fonts.gstatic.com';
    newUrl.port = '';
    newUrl.pathname = `${newUrl.pathname.replace('/fonts/', '')}`;

    let response = await fetch(newUrl.toString(), {
      cf: {
        cacheTtl: STATIC_CACHE_TIME,
        cacheEverything: true,
        cacheKey: newUrl.toString()
      }
    });

    response = new Response(response.body, response);

    if (!response.ok) {
      throw new Error(`Error fetching font: ${response.statusText}`);
    }

    response.headers.set('Cache-Control', `public, max-age=${STATIC_CACHE_TIME}`);

    return response;

  }catch (error){
    return handlerError(404, `Font not found: ${error}`)
  }
}

/**
 * Route requests for images and retrieve them from GitHub.
 * 
 * @param {URL} url - The request URL object.
 * @returns {Promise<Response>} - The response object with the image.
 */
const imageRouter = async (url) => {
  try {
    const { headers, data } = await servicesGithubImageGetter(url.pathname);
    const response = new Response(data, {
      headers: {
        'Content-Type': determineContentType(url),
        'Cache-Control': `public, max-age=${STATIC_CACHE_TIME}`,
        'Etag': headers.etag
      },
      cf: {
        cacheTtl: STATIC_CACHE_TIME,
        cacheEverything: true,
        cacheKey: url.toString()
      }
    });

    if (!response.ok) {
      throw new Error(`Error fetching image: ${response.statusText}`);
    }

    return response;
  } catch (error) {
      return handlerError(404, `Image not found: ${error}`)
  }
}

const determineContentType = (url) => {
  const fileExtension = url.pathname.split('.').pop().toLowerCase();
  const mimeTypes = {
    'jpg': 'image/jpeg',
    'jpeg': 'image/jpeg',
    'png': 'image/png',
    'gif': 'image/gif',
    'webp': 'image/webp'
    // ... add other extensions and MIME types as needed
  };

  return mimeTypes[fileExtension] || 'application/octet-stream';
}

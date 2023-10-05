/**
 * index.js
 * 
 * This module serves as the main entry point for handling all incoming requests.
 * It routes requests based on their URL path, delegating to specific handlers for processing.
 * The module can handle both static assets like images and fonts, as well as dynamic routes 
 * for rendering templates. If a request doesn't match any predefined route, an error response is returned.
 */

// Importing necessary modules
import indexAdmin from './admin/indexAdmin';
import handleRequest from './lib/handlers/request';

// Adding an event listener to listen for 'fetch' events. This event is triggered for every HTTP request coming to the service.
addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  
  // Checking if the request URL starts with '/admin' and routing it to the admin handler.
  if (url.pathname.startsWith('/admin')) {
    event.respondWith(indexAdmin(event.request));
  } else {
    // For other paths, it uses the handleRequest function.
    event.respondWith(handleRequest(event.request));
  }
});
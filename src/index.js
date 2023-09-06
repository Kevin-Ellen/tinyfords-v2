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
import handlerStatic from './lib/handlers/static';
import handlerTemplate from './lib/handlers/template';

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

// The main function for routing requests based on their path and method.
const handleRequest = async (request) => {
  const url = new URL(request.url);
  url.params = new URLSearchParams(url.search); // Extracting query parameters

  // Check if the path starts with '/images/' or '/fonts/' to handle static assets.
  if((url.pathname.startsWith('/images/')) || (url.pathname.startsWith('/fonts/'))){
    return handlerStatic(url) || handlerError();
  }

  // Handling dynamic routes using template handler. You can add more paths as your application grows.
  switch (url.pathname){
    case '/robots.txt': 
      return handlerStatic(url) || handlerError();

    case '/':
    case '/hotwheels':
    case '/matchbox':
    case '/other':
    case '/all':
      return handlerTemplate(url) || handlerError();
  }

  // If none of the above paths match, return an error response.
  return new Response('not done yet', {status: 404});
}

// A generic error handler for unmatched routes or other errors.
const handlerError = () => {
  return new Response('error', {status:404});
}
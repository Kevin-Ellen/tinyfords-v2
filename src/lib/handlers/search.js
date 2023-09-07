/**
 * handlerSearch.js
 * 
 * This module provides the functionality to handle search requests.
 * Based on the request's path, it determines the type of search, extracts the search query,
 * and creates a response accordingly. It uses the template handler to render the search results.
 */

// Import necessary modules and functions
import { servicesGithubDataPageAll } from '../services/github';
import { findDataPageCurrent } from '../utils/dataPages';
import handlerTemplate from '../handlers/template';

// This function handles search requests
const handlerSearch = async (request) => {
  // Fetch all page data from GitHub
  const dataPageAll = await servicesGithubDataPageAll();

  // Convert the request's form data into a JavaScript object
  const formData = await request.formData();
  const formDataObject = Object.fromEntries(formData.entries());

  // Extract the URL and any associated query parameters from the request
  const url = new URL(request.url);
  url.params = new URLSearchParams(url.search);

  // Check the request's path to determine the type of search and handle it accordingly
  switch (url.pathname) {
    case '/hotwheels':
    case '/matchbox':
    case '/other':
    case '/all':
      // Find the current page's data based on the request's path
      const dataPageCurrent = findDataPageCurrent(url.pathname, dataPageAll);
      dataPageCurrent.url = url;

      // If the current page's data is not found, return a 404 response
      if (!dataPageCurrent) {
        return new Response('Not Found', { status: 404 });
      }

      // Create and return the search response
      return createResponse(request, dataPageCurrent, formDataObject);
  }

  // Default response for unmatched search paths
  return new Response('Search Handler');
}
export default handlerSearch;

// This function creates a search response based on the current page's data and form data
const createResponse = (request, dataPageCurrent, formDataObject) => {
  // Construct the options for the response
  const options = {
    feedback: {
      success: true,           // Indicate the search was successful
      message: 'hello world',  // Placeholder message (this should be updated based on actual search results)
      action: 'search',        // Indicate that this feedback is related to a search action
    },
    data: {
      searchValue: formDataObject.q, // Extract the search value from the form data
      page: dataPageCurrent,         // Pass the current page's data
    }
  }

  // Use the template handler to create the final response based on the options
  return handlerTemplate(dataPageCurrent.url, options);
}

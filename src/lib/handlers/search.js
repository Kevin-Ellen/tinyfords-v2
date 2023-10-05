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
  const dataPageAll = await servicesGithubDataPageAll();
  const url = new URL(request.url);
  url.params = new URLSearchParams(url.search);

  let params;
  if (request.method === 'POST') {
    const formData = await request.formData();
    params = Object.fromEntries(formData.entries());
  } else if (request.method === 'GET') {
    params = Object.fromEntries(url.params.entries());
  }

  switch (url.pathname) {
    // your existing cases here...
    case '/hotwheels':
    case '/matchbox':
    case '/other':
    case '/all':
      const dataPageCurrent = findDataPageCurrent(url.pathname, dataPageAll);
      dataPageCurrent.url = url;
      if (!dataPageCurrent) {
        return new Response('Not Found', { status: 404 });
      }
      return createResponse(request, dataPageCurrent, params);
  }

  return new Response('Search Handler');
};

const createResponse = (request, dataPageCurrent, params) => {
  const search = {
    feedback: {
      success: true,
      message: '',
      action: 'search',
    },
    data: {
      searchValue: params.q,
      page: dataPageCurrent,
    }
  };

  return handlerTemplate(dataPageCurrent.url, search);
};

export default handlerSearch;

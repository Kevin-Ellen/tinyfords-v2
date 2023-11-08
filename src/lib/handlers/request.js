/**
 * request.js
 *
 */

import handleError from './error';
import handleStatic from './static';
import handleTemplate from './template';

import {initAppData, appData} from '../services/appData';

const handleRequest = async (request) => {
  const url = new URL(request.url);
  url.searchParams = new URLSearchParams(url.search);

    // Check if the path starts with '/images/' or '/fonts/' to handle static assets.
    if((url.pathname.startsWith('/images/')) || (url.pathname.startsWith('/fonts/')) || (url.pathname.startsWith('/api/'))){
      return handleStatic(url);
    }

    switch (url.pathname) {
      case '/robots.txt':
      case '/manifest.json':
      case '/sitemap.xml':
      case '/favicon.ico':
      case '/service-worker.js':
        return handleStatic(url);
    }

  switch(request.method){
    
    case 'GET': return handleRequestHelperGet(request, url);
    case 'POST': return handleRequestHelperPost(request, url);
  }

  return new Response('hi');
};
export default handleRequest;

const handleRequestHelperGet = async (request, url) => {
  switch(url.pathname){
    case '/hotwheels':
    case '/matchbox':
    case '/other':
    case '/all':
    case '/duplicates':
      if(url.searchParams.get('page')==='1'){
        url.searchParams.delete('page');
        return new Response(null, {status: 308, headers: { Location: url}});
      }

      if(!url.searchParams.get('page')){
        url.searchParams.set('page', 1);
      }

      if(appData.search){
        appData.search.searchTerm = null;
      }

      await initAppData(url);
      handleSearchTerm(url);

      return handleTemplate();
  }
  await initAppData(url);
  return handleTemplate();
}


const handleRequestHelperPost = async (request, url) => {
  switch(url.pathname){
    case '/hotwheels':
    case '/matchbox':
    case '/other':
    case '/all':
    case '/duplicates':
      url.searchParams.set('page', 1);

      url.searchParams.set('q', await extractQuery(request));

      await initAppData(url);

      handleSearchTerm(url);
      return handleTemplate();
  }
  return new Response('[Error] 404 - request.js');
}

const extractQuery = async (request) => {
  const formObject = await request.formData();
  return formObject.get('q');
}

const handleSearchTerm = async (url) => {
  const searchTerm = url.searchParams.get('q');
  if (searchTerm) {
    appData.search.searchTerm = searchTerm;
    const additionalContent = {
      type: 'text',
      element: 'p',
      attributes:{
        className: 'searchText',
      },
      content: `You have searched for <em>'${searchTerm}'</em>. There ${appData.cars.current.length===1 ? `is` : `are`} <strong>${appData.cars.current.length}</strong> result${appData.cars.current.length===1 ? `` : `s`}.`
    };
    appData.pages.current.content.intro.entries.push(additionalContent);
  }
}
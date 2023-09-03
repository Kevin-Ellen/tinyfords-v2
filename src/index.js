// src > index.js - entry point

import indexAdmin from './admin/indexAdmin';

import handlerStatic from './lib/handlers/static';
import handlerTemplate from './lib/handlers/template';

addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  
  if (url.pathname.startsWith('/admin')) {
    event.respondWith(indexAdmin(event.request));
  }else{
    event.respondWith(handleRequest(event.request));
  }
})


const handleRequest = async (request) => {

  const url = new URL(request.url);
  url.params = new URLSearchParams(url.search);

  if((url.pathname.startsWith('/images/')) || (url.pathname.startsWith('/fonts/'))){
    return handlerStatic(url) || handlerError();
  }

  switch (url.pathname){
    case '/robots.txt': 
      return handlerStatic(url) || handlerError();

    case '/':
      return handlerTemplate(url) || handlerError();

  }
  return handlerError();
}

const handlerError = () => {
  return new Response('not done yet', {status:404});
}
// src > index.js - entry point

import adminIndex from './admin/adminIndex';

import handlerStatic from './lib/handlers/handlerStatic';
import handlerTemplate from './lib/handlers/handlerTemplate';

addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  
  if (url.pathname.startsWith('/admin')) {
    event.respondWith(adminIndex(event.request));
  }else{
    event.respondWith(handleRequest(event.request));
  }
})


const handleRequest = async (request) => {

  const url = new URL(request.url);
  url.params = new URLSearchParams(url.search);

  const arr = [
    '/hotwheels/images',
    '/matchbox/images',
    '/other/images',
    '/icons',
    '/favicon.ico',
    '/social-media/images',
    '/fonts/',
  ];

  if (arr.some(item => url.pathname.startsWith(item))) {
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
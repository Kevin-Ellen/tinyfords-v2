// src > index.js - entry point

import adminIndex from './admin/adminIndex';

addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  
  if (url.pathname.startsWith('/admin')) {
    event.respondWith(adminIndex(event.request));
  }else{
    event.respondWith(handleRequest(event.request));
  }
})


const handleRequest = async (request) => {
  return new Response('hello Ford');
}
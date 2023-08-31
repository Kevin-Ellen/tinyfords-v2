// src > index.js - entry point

import adminIndex from './admin/adminIndex';


import outputRobotsTxt from './lib/output/outputRobotsTxt';

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
  
  switch (url.pathname){
    case '/robots.txt': return outputRobotsTxt(url);
  }
  
  
  return new Response('hello Ford');
}
// src > lib > utils > handlerStatic.js

import outputRobotsTxt from '../output/outputRobotsTxt';

import { utilGitHubGetImage } from '../utils/utilsGitHub';

const handlerStatic = (url) => {

  // const arr = [
  //   '/hotwheels/images',
  //   '/matchbox/images',
  //   '/other/images',
  //   '/icons',
  //   '/favicon.ico',
  //   '/social-media/images',
  // ];

  if(url.pathname.startsWith('/images/')){
    return imageRouter(url);
  }

  if(url.pathname.startsWith('/fonts/')){
    return routerFonts(url);
  }

  switch(url.pathname){
    case '/robots.txt':
      return outputRobotsTxt(url);

    default: return new Response('Not Found',{status:404});
  }
}
export default handlerStatic;

const routerFonts = async (url) => {
  const newUrl = new URL(url);
  newUrl.host = 'fonts.gstatic.com';
  newUrl.port = '';
  newUrl.pathname = `/s/${newUrl.pathname.replace('/fonts/', '')}`;

  const cacheTime = 604800;

  let response = await fetch(newUrl.toString(), {
    cf:{
      cacheTtl: cacheTime,
      cacheEverything: true,
      cacheKey: newUrl.toString()
    }
  });


  response = new Response(response.body, response);

  response.headers.set('Cache-Control', `max-age=${cacheTime}`);

  return response;
}

const imageRouter = async (url) => {
  const imageBlob = await utilGitHubGetImage(url.pathname);
  const response = new Response(imageBlob);

  const fileExtension = url.pathname.split('.').pop().toLowerCase();
    const mimeTypes = {
      'jpg': 'image/jpeg',
      'jpeg': 'image/jpeg',
      'png': 'image/png',
      'gif': 'image/gif',
      'webp': 'image/webp'
      // ... add other extensions and MIME types as needed
    };
    response.headers.set('Content-Type', mimeTypes[fileExtension] || 'application/octet-stream');

    return response;


}

// /images/other/front-250/ot-4-front-250.jpg
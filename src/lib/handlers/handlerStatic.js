// src > lib > utils > handlerStatic.js

import outputRobotsTxt from '../output/outputRobotsTxt';

const handlerStatic = (url) => {

  const arr = [
    '/hotwheels/images',
    '/matchbox/images',
    '/other/images',
    '/icons',
    '/favicon.ico',
    '/social-media/images',
  ];

  if (arr.some(item => url.pathname.startsWith(item))) {
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
  return new Response('image');
}
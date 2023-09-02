// src > admin > indexAdmin.js - To handle the inbound admin requests

import handlerAdminTemplate from './lib/handlers/handlerAdminTemplate';

import handleAdminLogin from './lib/handlers/handleAdminLogin';
import handleAdminLogout from './lib/handlers/handleAdminLogout';

const indexAdmin = (request) => {
  const url = new URL(request.url);

  switch (url.pathname){
    case '/admin': 
      return handlerAdminTemplate(request);
    
    case '/admin/logout':
      return handleAdminLogout(request);

    case '/admin/login':
      if(request.method === 'POST'){
        return handleAdminLogin(request);
      }
      return new Response('Method not allowed', { status: 405 });
  }

  return new Response('not done yet');

}

export default indexAdmin;
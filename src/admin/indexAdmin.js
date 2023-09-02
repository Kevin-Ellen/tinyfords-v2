// src > admin > indexAdmin.js - To handle the inbound admin requests

import handlerTemplate from './lib/handlers/template';

import handlerAdminLogin from './lib/handlers/adminLogin';
import handlerAdminLogout from './lib/handlers/adminLogout';

const indexAdmin = (request) => {
  const url = new URL(request.url);

  switch (request.method){
    case 'GET':
      switch (url.pathname){
        case '/admin': 
        case '/admin/add-car':
          return handlerTemplate(request);

        case '/admin/logout':
          return handlerAdminLogout(request);

        default: return new Response('not done yet');
      }

    case 'POST':
      switch (url.pathname){
        case '/admin': return handlerAdminLogin(request);
        // case '/admin/add-car': return handleCarAdd(request);

        default: return new Response('not done yet');
      }
    
    default:
      return new Response('Method not allowed', { status: 405 });
  }
}

export default indexAdmin;
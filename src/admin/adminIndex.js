// src > admin > adminIndex.js - To handle the inbound admin requests

import {isLoggedIn} from './lib/adminTools';


import adminLoginForm from './lib/templates/adminLoginForm';
import adminHandleLogin from './lib/adminHandleLogin';

import adminLandingPage from './lib/templates/adminLandingPage';

import adminAddCarForm from './lib/templates/adminAddCarForm';
import adminHandleAddCar from './lib/adminHandleAddCar';

import adminEditSearchCar from './lib/templates/adminEditSearchCar';
import adminHandleEditCar from './lib/adminHandleEditCar';
import adminHandleSubmitEdit from './lib/adminHandleSubmitEdit';


const adminIndex = (request) => {
  const url = new URL(request.url);
  const loggedIn = isLoggedIn(request);
  
  switch (url.pathname){
    case '/admin': return loggedIn ? adminLandingPage() : adminLoginForm();
    case '/admin/login': return (request.method === 'POST') ? adminHandleLogin(request) : adminLoginForm();

    case '/admin/add': return loggedIn ? adminAddCarForm() : adminLoginForm();
    case '/admin/add/car': return (request.method === 'POST') 
      ? adminHandleAddCar(request) 
      : new Response(null, { status: 307, headers: { 'Location': '/admin/add' } });

    case '/admin/edit': return loggedIn ? adminEditSearchCar() : adminLoginForm();
    case '/admin/edit/search': return (request.method === 'POST') 
      ? adminHandleEditCar(request) 
      : new Response(null, { status: 307, headers: { 'Location': '/admin/edit' } });
    case '/admin/edit/submit': return (request.method === 'POST') 
      ? adminHandleSubmitEdit(request)
      : new Response(null, { status: 307, headers: { 'Location': '/admin/edit' } });
  }

}

export default adminIndex;
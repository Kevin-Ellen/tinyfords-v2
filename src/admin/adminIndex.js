// src > admin > adminIndex.js - To handle the inbound admin requests

import {isLoggedIn} from './lib/adminTools';
import adminHandleLogin from './lib/adminHandleLogin';

import adminLoginForm from './lib/templates/adminLoginForm';
import adminLandingPage from './lib/templates/adminLandingPage';


const adminIndex = (request) => {
  const url = new URL(request.url);
  const loggedIn = isLoggedIn(request);
  
  switch (url.pathname){
    case '/admin': return loggedIn ? adminLandingPage() : adminLoginForm();
    case '/admin/add': return loggedIn ? pageAdminAdd() : adminLoginForm();
    case '/admin/login': return (request.method === 'POST') ? adminHandleLogin(request) : adminLoginForm();
  }

}

export default adminIndex;


const pageAdminAdd = () => {
  return new Response('add page');
}
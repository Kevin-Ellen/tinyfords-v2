// src > admin > lib > adminLogin.js - Logic to login

import handlerAdminTemplate from './template';

import { isLoggedIn } from '../utils/misc';

const validName = ADMIN_NAME;
const validPassword = ADMIN_PASSWORD;


const handlerAdminLogin = async (request) => {
  const formData = await request.formData();
  const submittedName = formData.get('username');
  const submittedPassword = formData.get('password');

  if (submittedName === validName && submittedPassword === validPassword) {

    console.log('SUCCESS!');

    const redirectTo = new URL(request.headers.get('Referer') || '/admin');

    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 1);

    const cookie = `admin-authenticated=true; Expires=${expiryDate.toUTCString()}; HttpOnly; SameSite=Strict; Path=/admin;`;

    console.log(`RedirectTo: ${redirectTo}`);
    console.log(`isLoggedIn(): ${isLoggedIn(request)}`);

    if(redirectTo.pathname === '/admin' || isLoggedIn(request)){
      console.log('show admin called');
      return showAdmin(cookie, request);
    }

    return new Response(null, {
      status: 307,
      headers: {
        'Location': redirectTo,
        'Set-Cookie': cookie,
      }
    });
  }
  return new Response('Invalid credentials. Please try again.', {
    status: 401,
    headers: {
        'Content-Type': 'text/plain',
        'X-Robots-Tag': 'noindex'
    }
  });
}
export default handlerAdminLogin;

const showAdmin = (cookie, request) => {
  console.log('Called inside "showADmin()"');
  let content = handlerAdminTemplate(request,true);

  // Ensure content is wrapped in a Response object if not already
  if (!(content instanceof Response)) {
    content = new Response(content,{
      status:200,
      headers:{
        'x-robots-x': 'noindex',
        'Content-Type': 'text/html',
      }
    });
  }

  content.headers.set('Set-Cookie', cookie);

  return content;
}
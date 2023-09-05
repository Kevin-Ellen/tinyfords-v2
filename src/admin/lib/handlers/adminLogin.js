/**
 * adminLogin.js
 * 
 * This module provides the logic for the admin login functionality.
 * It validates the credentials provided by the user and sets an authentication cookie if successful.
 * Otherwise, it returns a 401 Unauthorized response.
 */

// External Dependencies
import handlerAdminTemplate from './template';
import { isLoggedIn } from '../utils/misc';

// Admin credentials (should ideally be stored securely, e.g., in environment variables)
const validName = ADMIN_NAME;
const validPassword = ADMIN_PASSWORD;

/**
 * Handles the admin login request. If the submitted credentials are valid, an authentication cookie is set.
 * Otherwise, a 401 Unauthorized response is returned.
 *
 * @param {Request} request - The incoming request object with form data containing login credentials.
 * @param {Object} options - Additional optional parameters.
 * @return {Response} - The response to the login attempt, which may be an authenticated page or an error message.
 */
const handlerAdminLogin = async (request, options = {}) => {
  
  const formData = await request.formData();
  const submittedName = formData.get('username');
  const submittedPassword = formData.get('password');

  if (submittedName === validName && submittedPassword === validPassword) {

    const redirectTo = new URL(request.headers.get('Referer') || '/admin');

    const cookie = createCookie();

    if(redirectTo.pathname === '/admin' || isLoggedIn(request)){
      return showAdmin(cookie, request);
    }

    return new Response(null, {
      status: 302,
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

/**
 * Renders the admin page and sets the authentication cookie.
 *
 * If the user successfully logs in, this function is invoked to show the admin page and set the
 * authentication cookie in the response headers.
 *
 * @param {string} cookie - The authentication cookie to be set.
 * @param {Request} request - The incoming request object.
 * @return {Response} - The rendered admin page with the authentication cookie set.
 */
const showAdmin = async (cookie, request) => {
  let content = await handlerAdminTemplate(request,{
    isAuthenticated: true
  });

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

/**
 * Creates an authentication cookie with a validity of 1 day.
 *
 * This function constructs a cookie string with appropriate settings to ensure
 * the user remains authenticated for a day after successful login.
 *
 * @return {string} - The constructed authentication cookie string.
 */
const createCookie = () => {
  const expiryDate = new Date();
  expiryDate.setDate(expiryDate.getDate() + 1);

  const cookie = `admin-authenticated=true; Expires=${expiryDate.toUTCString()}; HttpOnly; SameSite=Strict; Path=/admin;`;
  return cookie;
}
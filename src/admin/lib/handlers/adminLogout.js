/**
 * adminLogout.js
 * 
 * This module provides the logic for the admin logout functionality.
 * It deletes the authentication cookie to effectively log the admin out.
 */

/**
 * Handles the admin logout request by deleting the authentication cookie.
 *
 * This function constructs a response that deletes the authentication cookie by setting 
 * its expiry to a past date, effectively logging the admin out.
 *
 * @param {Request} request - The incoming request object.
 * @return {Response} - The response to the logout request, which directs the user back 
 *                      to the page they were on, or to the admin home page if no referrer is available.
 */
const handlerAdminLogout = async (request) => {
  const redirectTo = request.headers.get('Referer') || '/admin';
  return new Response(null, {
      status: 302, // Using 302 for temporary redirect
      headers: {
          'Location': redirectTo,
          'Set-Cookie': 'admin-authenticated=; HttpOnly; SameSite=Strict; Path=/admin; Expires=Thu, 01 Jan 1970 00:00:00 GMT;' // This will effectively delete the cookie
      }
  });
}
export default handlerAdminLogout;
// src > admin > lib > handleAdminLogout.js - Logic to logout

const handleAdminLogout = async (request) => {
  const redirectTo = request.headers.get('Referer') || '/admin';
  return new Response(null, {
      status: 302, // Using 302 for temporary redirect
      headers: {
          'Location': redirectTo,
          'Set-Cookie': 'admin-authenticated=; HttpOnly; SameSite=Strict; Path=/admin; Expires=Thu, 01 Jan 1970 00:00:00 GMT;' // This will effectively delete the cookie
      }
  });
}
export default handleAdminLogout;
// src > admin > lib > adminLoginLogic.js - Logic to login

const validName = ADMIN_NAME;
const validPassword = ADMIN_PASSWORD;


const adminHandleLogin = async (request) => {
  const formData = await request.formData();
  const submittedName = formData.get('username');
  const submittedPassword = formData.get('password');

  if (submittedName === validName && submittedPassword === validPassword) {
    const redirectTo = request.headers.get('Referer') || '/admin';
    return new Response(null, {
      status: 307,
      headers: {
        'Location': redirectTo,
        'Set-Cookie': 'admin-authenticated=true; HttpOnly; SameSite=Strict; Path=/admin;'
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
export default adminHandleLogin;
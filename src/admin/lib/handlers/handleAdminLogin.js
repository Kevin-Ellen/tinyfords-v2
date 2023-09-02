// src > admin > lib > handleAdminLogin.js - Logic to login

const validName = ADMIN_NAME;
const validPassword = ADMIN_PASSWORD;


const handleAdminLogin = async (request) => {
  const formData = await request.formData();
  const submittedName = formData.get('username');
  const submittedPassword = formData.get('password');

  if (submittedName === validName && submittedPassword === validPassword) {

    const redirectTo = request.headers.get('Referer') || '/admin';

    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 1);

    return new Response(null, {
      status: 307,
      headers: {
        'Location': redirectTo,
        'Set-Cookie': `admin-authenticated=true; Expires=${expiryDate.toUTCString()}; HttpOnly; SameSite=Strict; Path=/admin;`
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
export default handleAdminLogin;
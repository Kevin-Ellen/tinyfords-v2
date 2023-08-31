// src > admin > lib > templates > adminLoginForm.js - Login form etc

const adminLoginForm = () => {
  const html = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Admin Login</title>
          <!-- You can include any styles or scripts here if needed -->
      </head>
      <body>
          <form action="/admin/login" method="post">
            <div>
              <label for="username">Username:</label>
              <input type="text" id="username" name="username" required>
            </div>
            
            <div>
              <label for="password">Password:</label>
              <input type="password" id="password" name="password" required>
            </div>
            
            <div>
              <button type="submit">Login</button>
            </div>
          </form>
      </body>
    </html>
  `;

  return new Response(html, {
    headers: {
      'Content-Type': 'text/html',
      'X-Robots-Tag': 'noindex'
    }
  });
}

export default adminLoginForm;
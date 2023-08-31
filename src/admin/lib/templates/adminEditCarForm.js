// src > admin > lib > templates > adminEditCarForm.js - Edit a car

const adminEditCarForm = () => {
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
          <form action="#" method="post">
            <div>
              <label for="name">Name: Name</label>
              <input type="text" id="name" name="name">
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

export default adminEditCarForm;
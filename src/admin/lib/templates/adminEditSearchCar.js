// src > admin > lib > templates > adminEditSearchCar.js - Search a car to edit

const adminEditSearchCar = () => {
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
        <form action="/admin/edit/search" method="post">
          <label for="code">Code:</label>
          <input type="text" id="code" name="code">
          <input type="submit" value="Search">
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

export default adminEditSearchCar;
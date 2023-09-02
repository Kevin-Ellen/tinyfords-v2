// src > admin > lib > templates > adminAddCarForm.js - Form to add vehicles to the JSON

const adminAddCarForm = () => {
  const html = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Admin Login</title>
      </head>
      <body>
        <form action="/admin/add/car" method="post">
          <div>
            <label for="name">Name:</label>
            <input type="text" id="name" name="name">
          </div>
          
          <div>
            <label for="make">Make:</label>
            <input type="text" id="make" name="make">
          </div>
          
          <div>
            <label for="brand">Brand:</label>
            <input type="text" id="brand" name="brand">
          </div>
          
          <div>
            <label for="code">Code:</label>
            <input type="text" id="code" name="code">
          </div>
          
          <div>
            <label for="base">Base:</label>
            <input type="text" id="base" name="base">
          </div>
          
          <div>
            <label for="type">Type:</label>
            <input type="text" id="type" name="type">
          </div>
          
          <div>
            <label>Has Case:</label>
            <input type="radio" id="hasCaseYes" name="hasCase" value="true">
            <label for="hasCaseYes">Yes</label>

            <input type="radio" id="hasCaseNo" name="hasCase" value="false" checked>
            <label for="hasCaseNo">No</label>

            <input type="radio" id="hasCaseNA" name="hasCase" value="null">
            <label for="hasCaseNA">N/A</label>
          </div>

          <div>
            <label for="hasPhoto">Has Photo:</label>
            <input type="checkbox" id="hasPhoto" name="hasPhoto" value="true">
          </div>

          <div>
            <label for="quantity">Quantity:</label>
            <input type="number" id="quantity" name="quantity" value="1" min="1">
          </div>

          <div>
            <input type="submit" value="Add Car">
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

export default adminAddCarForm;
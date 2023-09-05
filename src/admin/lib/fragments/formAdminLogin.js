/**
 * formAdminLogin.js
 * 
 * This module provides a fragment that constructs the HTML for the admin login form.
 * It's a simple, yet essential, part of the authentication process for the admin panel.
 * Users are expected to input their username and password to gain access to the admin functionalities.
 */

/**
 * Constructs and returns the HTML for the admin login form.
 * 
 * The form consists of two primary input fields: username and password. Both fields are mandatory.
 * The form is wrapped within a section with the class `fragmentContent` and `adminCenter` 
 * for styling and layout purposes.
 *
 * @return {string} - The constructed HTML string representing the admin login form.
 */
const fragmentFormAdminLogin = () => {
  const html = `
    <section class="fragmentContent adminCenter">
      <h1>Login</h1>
      <div class="formContainer">
        <form action="/admin" method="post" class="adminForm">
          <div class="inputGroup">
            <label for="username">Username:</label>
            <input type="text" id="username" name="username" required>
          </div>

          <div class="inputGroup">
            <label for="password">Password:</label>
            <input type="password" id="password" name="password" required>
          </div>

          <button type="submit">Login</button>
        </form>
      </div>
    </section>
  `;

  return html;
}
export default fragmentFormAdminLogin;
// src > admin > lib > fragments > formAdminLogin.js - Admin login form

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
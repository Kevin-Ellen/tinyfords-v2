// src > admin > lib > templates > formAdminLogin.js - Login form etc

const formAdminLogin = () => {
  const html = `
    <section class="fragmentContent adminLogin">
      <h1>Login</h1>
      <div class="loginContainer">
        <form action="/admin/login" method="post" class="loginForm">
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

export default formAdminLogin;
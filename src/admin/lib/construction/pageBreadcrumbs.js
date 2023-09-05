/**
 * pageBreadcrumbs.js
 * This module constructs a simple breadcrumb for the admin pages.
 */

/**
 * Constructs and returns the breadcrumb navigation for the admin pages.
 * @return {string} The breadcrumb navigation HTML string.
 */
const pageBreadcrumbs = () => {
  const html = `
  <nav class="breadcrumbsContainer" aria-label="breadcrumb">
    <ul class="breadcrumbs">
      <li><a href="/">Public home</a></li>
      <li aria-hidden="true">/</li>
      <li><a href="/admin">Admin home</a></li>
    </ul>
  </nav>`;

  return html;
}
export default pageBreadcrumbs;
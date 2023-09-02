// src > admin > lib > construction > pageBreadcrumbs.js - bredacrumbs

const pageBreadcrumbs = () => {

    html = `<nav class="breadcrumbsContainer" aria-label="breadcrumb">
      <ul class="breadcrumbs">
        <li><a href="/">Public home</a></li>
        <li aria-hidden="true">/</li>
        <li><a href="/admin">Admin home</a></li>
      </ul>
    </nav>`;

  return html;
}
export default pageBreadcrumbs;
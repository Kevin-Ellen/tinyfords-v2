// src > admin > lib > construction > pageAdminBreadcrumbs.js - bredacrumbs

const pageAdminBreadcrumbs = () => {

    html = `<nav class="breadcrumbsContainer" aria-label="breadcrumb">
      <ul class="breadcrumbs">
        <li><a href="/">Public home</a></li>
        <li aria-hidden="true">/</li>
        <li><a href="/admin">Admin home</a></li>
      </ul>
    </nav>`;

  return html;
}
export default pageAdminBreadcrumbs;
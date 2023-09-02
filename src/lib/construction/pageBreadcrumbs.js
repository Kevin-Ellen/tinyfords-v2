// src > lib > construction > pageBreadcrumbs.js - bredacrumbs

const pageBreadcrumbs = (dataPageCurrent, dataPageAll) => {
  if(!dataPageCurrent.breadcrumbList){ return `<nav class="breadcrumbsContainer" aria-label="breadcrumb"></nav>`;}

  const breadcrumbs = dataPageCurrent.breadcrumbList.map((obj, index, arr) => {
    const isLastItem = index === arr.length - 1;
    return `
        <li ${isLastItem ? 'aria-current="page"' : ''}>
          <a href="${obj.slug}">${obj.name}</a>
        </li>
        ${isLastItem ? '' : `<li aria-hidden="true">/</li>`}
    `;
    }).join('');

    html = `<nav class="breadcrumbsContainer" aria-label="breadcrumb">
      <ul class="breadcrumbs">
        ${breadcrumbs}
      </ul>
    </nav>`;

  return html;
}
export default pageBreadcrumbs;
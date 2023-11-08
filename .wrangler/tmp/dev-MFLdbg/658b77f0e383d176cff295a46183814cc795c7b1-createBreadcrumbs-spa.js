const createBreadcrumbs = (breadcrumbs = appData.breadcrumbs) => {
  const container = document.querySelector('.breadcrumbs');
  const fragment = document.createDocumentFragment();

   // Clear previous breadcrumbs and append new ones
   while (container.firstChild) {
    container.removeChild(container.firstChild);
  }

  breadcrumbs.forEach((breadcrumb, index) => {
    fragment.appendChild(createCrumb(breadcrumb, index, breadcrumbs.length));
    if (index < breadcrumbs.length - 1) {
      fragment.appendChild(createSeperator());
    }
  });
  fragment.lastElementChild.setAttribute('aria-current', 'page');
  container.appendChild(fragment);
}

const createCrumb = (breadcrumb, index, length) => {
  const elem = document.createElement('li');
  if (index === length - 1) {
    elem.textContent = breadcrumb.name;
  } else {
    const link = document.createElement('a');
    elem.appendChild(link);
    link.href = breadcrumb.slug;
    link.innerHTML = breadcrumb.name;
  }
  return elem;
}

const createSeperator = () => {
  const elem = document.createElement('li');
  elem.setAttribute('aria-hidden', true);
  elem.textContent = '/';
  return elem;
}
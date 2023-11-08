const renderCollection = ({ pagination, cars, pages: { current } } = appData) => {
  const container = document.querySelector('main');
  
  // Clear previous content in the <main>
  while (container.firstChild) {
      container.removeChild(container.firstChild);
  }

  const section = document.createElement(current.content.container?.element || 'section');
  section.className = assignClassName(current.content.container?.className);

  const h1 = document.createElement('h1');
  h1.textContent = current.h1;

  if (pagination.page > 1) {
      const span = document.createElement('span');
      span.textContent = `- Page: ${pagination.page}`;
      h1.appendChild(span);
  }
  section.appendChild(h1);

  if (current.content.intro) {
      section.appendChild(createIntroTemplate(current.content.intro));
  }

  section.appendChild(searchBar(current.url.pathname));

  container.appendChild(section);
  createOrGetGridContainer();
  createGridItems(appData.cars.current.slice(appData.pagination.start, appData.pagination.end));

  if (pagination.total > 1) {
      createPaginationControls();
  }

  // return container;
}

// Other helper functions such as createIntroTemplate, searchBar, fragmentGridCars, and fragmentPaginationControls will also need to be adapted to return DOM elements instead of string HTML.

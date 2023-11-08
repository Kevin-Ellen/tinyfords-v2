const renderHome = (data = appData.pages.current) => {
  const mainElement = document.querySelector('main');

  while (mainElement.firstChild) {
    mainElement.removeChild(mainElement.firstChild);
  }

  const container = createContainer(data.content.container);
  const heading = document.createElement('h1');
  heading.textContent = data.h1;
  container.appendChild(heading);

  if (data.content.intro) {
    container.appendChild(createIntroTemplate(data.content.intro));
  }
  container.appendChild(searchBar('/all'));
  mainElement.appendChild(container);

  createOrGetGridContainer();
  createGridItems(appData.cars.all.slice(0, ITEMS_PER_PAGE.homepage));
}
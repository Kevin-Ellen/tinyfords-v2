const createOrGetGridContainer = () => {
  let container = document.querySelector('.fragmentCarsGrid');

  // If the grid container does not exist, create it
  if (!container) {
      const section = document.createElement('section');
      const h2 = document.createElement('h2');
      if(appData.search.success && appData.search.searchTerm){
        history.textContent = 'Search Results';
      }else{
        h2.textContent = 'Results';
      }

      container = document.createElement('div');
      container.className = 'fragmentCarsGrid';

      section.appendChild(h2);
      section.appendChild(container);
      document.querySelector('main').appendChild(section); // Assuming you want to append it to <main>
  }

  return container;
}

const createGridItems = (cars = appData.cars.current.slice(0, ITEMS_PER_PAGE.collection)) => {
  const gridContainer = createOrGetGridContainer();
  const fragment = document.createDocumentFragment();

  // Clear the grid container
  if(gridContainer){
    while (gridContainer.firstChild) {
      gridContainer.removeChild(gridContainer.firstChild);
    }
  }

  cars.forEach(car => {
    fragment.appendChild(createCard(car));
  });

  gridContainer.appendChild(fragment);
}

const createCard = (car) => {
  const template = document.getElementById('gridItem');
  const clone = document.importNode(template.content, true);

  // Using the createImgPath function to determine the image path
  clone.querySelector('.templateGridImage').src = createImgPath(car);
  
  clone.querySelector('h3').textContent = car.name;
  clone.querySelector('.templateGridMake span').textContent = car.make;

  if (car.code) {
    clone.querySelector('.templateGridCode span').textContent = car.code;
  }

  clone.querySelector('.templateGridAdded span').textContent = car.addedDetails.date;

  return clone;
}

const createImgPath = (car) => {
  const baseFolder = `/images/${car.categoryDetails.folder}/front-250/`;
  const postfix = `-front-250.jpg`;

  if (!car.hasPhoto) {
    return `${baseFolder}coming-soon${postfix}`;
  }

  const idPrefix = car.categoryDetails.id === 'ot' ? car.id : car.code;
  return `${baseFolder}${car.categoryDetails.id}-${idPrefix}${postfix}`;
}

// src > lib > fragments > gridCars.js

import utilCarConstruct from '../utils/carConstruct';

const fragmentGridCars = (heading,headingLevel,dataCars) => {

  const levelNumber = Number(headingLevel);
  headingLevel = !isNaN(levelNumber) ? Math.min(6, Math.max(2, Math.round(levelNumber))) : 2;

  const html = `<section>
    <h${headingLevel}>${heading}</h${headingLevel}>
    ${createGrid(dataCars)}
  </section>`;
  return html;
}

export default fragmentGridCars;

const createGrid = (dataCars) => {

  const cards = dataCars.map(createCard).join('');


  const html = `<div class="fragmentCarsGrid">
    ${cards}
  </div>`;

  return html;
}

const createCard = (car) => {

  const imageUrl = `/images/${car.categoryDetails.folder}/front-250/${car.categoryDetails.id}-${car.code || car.id}-front-250.jpg`;

  return `
    <div class="fragmentGridCard">
      <img src="${imageUrl}" height="150" width="150" alt="${car.brand} ${car.name} - ${car.code}" loading="lazy">
      <ul class="fragmentGridCardContent">
        <li><h3>${car.name}</h3></li>
        <li><strong>Make:</strong> ${car.make}</li>
        ${car.code ? `<li><strong>Code:</strong> ${car.code}</li>` : ''}
        ${car.base ? `<li><strong>Base:</strong> ${car.base}</li>` : ''}
        <li><strong>Added:</strong> ${car.addedDetails.date}</li>
      </ul>
    </div>`;
}
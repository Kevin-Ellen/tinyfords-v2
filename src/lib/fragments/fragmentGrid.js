// src > lib > fragments > fragmentGrid.js

const fragmentGrid = (heading,headingLevel,data) => {

  const levelNumber = Number(headingLevel);
  headingLevel = !isNaN(levelNumber) ? Math.min(6, Math.max(2, Math.round(levelNumber))) : 2;

  console.log(data);

  const html = `<section>
    <h${headingLevel}>${heading}</h${headingLevel}>
    ${createGrid(data)}
  </section>`;
  return html;
}

export default fragmentGrid;

const createGrid = (data) => {

  const cards = data.map(createCard).join('');

  const html = `<div class="fragmentGrid">
    ${cards}
  </div>`;

  return html;
}

const createCard = (car) => {
  const imageUrl = `/images/${car.category.folderName}/front-250/${car.category.shortName}-${car.code || car.id}-front-250.jpg`;

  return `
    <div class="fragmentGridCard">
      <img src="${imageUrl}" height="150" width="150" alt="${car.brand} ${car.name} - ${car.code}" loading="lazy">
      <ul class="fragmentGridCardContent">
        <li><h3>${car.brand} ${car.name}</h3></li>
        <li><strong>Make:</strong> ${car.make}</li>
        ${car.code ? `<li><strong>Code:</strong> ${car.code}</li>` : ''}
        ${car.base ? `<li><strong>Base:</strong> ${car.base}</li>` : ''}
        <li><strong>Added:</strong> ${car.addedDate}</li>
      </ul>
    </div>`;
}
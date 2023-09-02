// src > admin > lib > carEdit.js - find and deal with the car

import {adminGitHubGetCarData} from './adminGitHub';

const adminHandleEditCar = async (request) => {
  const formData = await request.formData();
  const code = formData.get('code');

  const fullCarResponse = await adminGitHubGetCarData();
  const matchingCar = fullCarResponse.data.find(car => car.code === code);


  return (matchingCar) ? carFound(matchingCar) : carNotFound(code);
}

export default adminHandleEditCar;

const carFound = (data) => {
  return new Response(carEditForm(data), {
    headers: { 'Content-Type': 'text/html' }
  });
}

const carNotFound = (code) => {
  return new Response(`The following code had no results: ${code}.`);
}

const carEditForm = (data) => {
  return `<form action="/admin/edit/submit" method="post">
    <div>
      <p>ID: ${data.id}</p>
      <input type="hidden" id="id" name="id" value="${data.id}">
    </div>
    <div>
      <label for="name">Name:</label>
      <input type="text" id="name" name="name" value="${data.name}">
    </div>

    <div>
      <label for="make">Make:</label>
      <input type="text" id="make" name="make" value="${data.make}">
    </div>

    <div>
      <label for="brand">Brand:</label>
      <input type="text" id="brand" name="brand" value="${data.brand}">
    </div>

    <div>
      <label for="code">Code:</label>
      <input type="text" id="code" name="code" value="${data.code}">
    </div>

    <div>
      <label for="base">Base:</label>
      <input type="text" id="base" name="base" value="${data.base}">
    </div>

    <div>
      <label for="type">Type:</label>
      <input type="text" id="type" name="type" value="${data.type}">
    </div>

    <div>
      <label>Has Case:</label>
      <input type="radio" id="hasCaseYes" name="hasCase" value="true" ${(data.hasCase===true) ? 'checked' : ''}>
      <label for="hasCaseYes">Yes</label>

      <input type="radio" id="hasCaseNo" name="hasCase" value="false" ${(data.hasCase===false) ? 'checked' : ''}>
      <label for="hasCaseNo">No</label>

      <input type="radio" id="hasCaseNA" name="hasCase" value="null" ${(data.hasCase===null) ? 'checked' : ''}>
      <label for="hasCaseNA">N/A</label>
    </div>

    <div>
      <label for="hasPhoto">Has Photo:</label>
      <input type="checkbox" id="hasPhoto" name="hasPhoto" value="true" ${data.hasPhoto ? 'checked' : ''}>
    </div>

    <div>
      <label for="quantity">Quantity:</label>
      <input type="number" id="quantity" name="quantity" value="${data.quantity}" min="1">
    </div>

    <div>
      <input type="submit" value="Update Car">
    </div>
  </form>`;
}
// src > admin > lib > adminHandleAddCar.js - Adding a car :)

import {adminGitHubGetCarData, adminGitHubSubmitCarData} from './adminGitHub';

const adminHandleAddCar = async (request) => {
  const formData = await request.formData();

  const fullCarResponse = await adminGitHubGetCarData();
  const currentCars = fullCarResponse.data;

  const newId = Math.max(...currentCars.map(car => car.id))+1;
  const currentDate = new Date();
  const timestamp = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')}`;


  const newCar = {
    id: newId,
    name: formData.get('name'),
    make: formData.get('make'),
    brand: formData.get('brand'),
    code: formData.get('code'),
    base: formData.get('base'),
    type: formData.get('type'),
    hasCase: formData.get('hasCase') === 'true',
    hasPhoto: formData.has('hasPhoto'),
    added: timestamp,
    addedBy: ADMIN_NAME,
    quantity: parseInt(formData.get('quantity')),
  }

  currentCars.push(newCar);

  const updateResponse = await adminGitHubSubmitCarData(currentCars, fullCarResponse.sha);

  if (updateResponse.success) {
      return new Response(updateResponse.message, { status: 200 });
  } else {
      return new Response(`Error: ${updateResponse.message}`, { status: 400 });
  }




}
export default adminHandleAddCar;

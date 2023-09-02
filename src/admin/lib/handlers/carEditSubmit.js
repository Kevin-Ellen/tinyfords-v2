//src > admin > lib > carEditSubmit.js

import {adminGitHubGetCarData, adminGitHubSubmitCarData} from './adminGitHub';

const adminHandleSubmitEdit = async (request) => {
  const formData = await request.formData();

  const fullCarResponse = await adminGitHubGetCarData();
  const currentCars = fullCarResponse.data;

  const carId = parseInt(formData.get('id'));

  const matchingCar = currentCars.find(car => car.id === carId);

  if(matchingCar){
    matchingCar.name = formData.get('name'),
    matchingCar.make = formData.get('make'),
    matchingCar.brand = formData.get('brand'),
    matchingCar.code = formData.get('code'),
    matchingCar.base = formData.get('base'),
    matchingCar.type = formData.get('type'),
    matchingCar.hasCase = formData.get('hasCase') === 'true',
    matchingCar.hasPhoto = formData.has('hasPhoto'),
    matchingCar.quantity = parseInt(formData.get('quantity'))

    const updateResponse = await adminGitHubSubmitCarData(currentCars, fullCarResponse.sha);

    if(updateResponse.success){
      return new Response(updateResponse.message, { status: 200 });
    } else {
        return new Response(`Error: ${updateResponse.message}`, { status: 400 });
    }
  }else{
    return new Response('Car not found');
  }

}
export default adminHandleSubmitEdit;

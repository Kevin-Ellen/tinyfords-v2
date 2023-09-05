// src > admin > lib > handlers > carEdit.js - Find and deal with the car

import { getCarById } from '../../../lib/utils/dataCars';
import { adminGitHubGetCarsData, adminGitHubSubmitCarsData } from '../services/github';

import { duplicateChecker } from '../utils/misc';

import utilCarConstruct from '../../../lib/utils/carConstruct';


import handlerTemplate from './template';


const handlerAdminCarEdit = async (request, options) => {

  const dataCarsAll = await adminGitHubGetCarsData();

  const formData = await request.formData();
  const formDataObject = Object.fromEntries(formData.entries());


  if(formDataObject.action=='editSubmit'){
    const updatedCar = utilCarConstruct(dataCarsAll.data,formDataObject);

    const dupeCheck = duplicateChecker(dataCarsAll.data, ['code'], updatedCar);

    if (!dupeCheck.success){
      return carResponse(request, updatedCar, `Fail: ${dupeCheck.message}`, false);
    }

    const changes = changeCheck(getCarById(dataCarsAll.data, updatedCar.id), updatedCar);

    if(!changes){
      return carResponse(request, updatedCar, 'Fail: No changes been found', false);
    }

    const response = await submitData(dataCarsAll, updatedCar);

    if(!response.success){
      return carResponse(request, updatedCar, `Fail: ${response.message}`, false);
    }

    return carResponse(request, updatedCar, 'Car changed successfully!', true);

  }

  const car = getCarById(dataCarsAll.data, formDataObject.carId);

  if(!car){
    return carResponse(request, {id:formDataObject.carId}, 'No car found', false);
  }

  return carResponse(request, car, 'Car found', true, true);

}

export default handlerAdminCarEdit;

const carResponse = (request, data, message, success, search = null) => {
  return handlerTemplate(request, {
    feedback: {
      success: success,
      message: message,
      search: search,
    },
    data:data
  });
}

const changeCheck = (oldCar, newCar) => {
  for (let key in oldCar) {
    if (key === 'addedDetails') continue;  // Skip addedDetails property

    if (oldCar.hasOwnProperty(key) && newCar.hasOwnProperty(key)) {
      if (typeof oldCar[key] === 'object' && oldCar[key] !== null && newCar[key] !== null) {
        // If property is an object, do a deep comparison
        if (changeCheck(oldCar[key], newCar[key])) {  // If there are changes in the nested object
          return true;
        }
      } else if (oldCar[key] !== newCar[key]) {
        return true;  // If there's a change in the current key-value pair
      }
    }
  }
  return false;  // No changes found
}

const findChanges = (oldCar, newCar) => {
  let changes = {};

  for (let key in oldCar) {
    if (key === 'addedDetails') continue;  // Skip addedDetails property
    if (oldCar.hasOwnProperty(key) && newCar.hasOwnProperty(key)) {
      if (typeof oldCar[key] === 'object' && oldCar[key] !== null && newCar[key] !== null) {
        // If property is an object, do a deep comparison
        let innerChanges = findChanges(oldCar[key], newCar[key]);
        if (Object.keys(innerChanges).length) {
          changes[key] = innerChanges;
        }
      } else if (oldCar[key] !== newCar[key]) {
        changes[key] = newCar[key];
      }
    }
  }

  return changes;
}

const submitData = async(dataCarsAll, updatedCar) => {
  // Remove the addedDetails field from updatedCar
  delete updatedCar.addedDetails;

  const updatedDataCarsAll = dataCarsAll.data.map(car => {
    if (car.id === updatedCar.id) {
      return {
        ...car,          // Spread properties of the original car
        ...updatedCar   // Overwrite with properties of updatedCar where they exist
      };
    }
    return car;
  });

  const response = await adminGitHubSubmitCarsData(updatedDataCarsAll, dataCarsAll.sha);

  return response;
}
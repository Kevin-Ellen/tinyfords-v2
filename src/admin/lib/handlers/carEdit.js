/**
 * carEdit.js
 * 
 * This module provides logic for editing car details.
 * It allows for finding a specific car by its ID, updating its details, and checking for changes.
 */

// External Dependencies
import { getCarById } from '../../../lib/utils/dataCars';
import { adminGitHubGetCarsData, adminGitHubSubmitCarsData } from '../services/github';
import { duplicateChecker } from '../utils/misc';
import utilCarConstruct from '../../../lib/utils/carConstruct';
import handlerTemplate from './template';

/**
 * Handles the car editing request by updating the car data based on provided changes.
 *
 * @param {Request} request - The incoming request object with form data containing updated car details.
 * @param {Object} options - Additional optional parameters.
 * @return {Response} - The response to the car edit request, which may contain success or error messages.
 */
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

/**
 * Wraps the car data and feedback message in a templated response.
 *
 * @param {Request} request - The incoming request object.
 * @param {Object} data - The car data.
 * @param {string} message - Feedback message for the action.
 * @param {boolean} success - Indicates if the action was successful.
 * @param {boolean} search - Indicates if this is a search response.
 * @return {Response} - Templated response with car data and feedback.
 */
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

/**
 * Checks for any changes between the old car data and the new data.
 *
 * @param {Object} oldCar - The original car data.
 * @param {Object} newCar - The updated car data.
 * @return {boolean} - Returns true if there are changes, false otherwise.
 */
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

/**
 * Identifies the specific changes between the old car data and the new data.
 *
 * @param {Object} oldCar - The original car data.
 * @param {Object} newCar - The updated car data.
 * @return {Object} - Object detailing the specific changes.
 */
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

/**
 * Submits the updated car data to the data set.
 *
 * @param {Array} dataCarsAll - The original list of cars.
 * @param {Object} updatedCar - The car with updated details.
 * @return {Object} - Response from the submission attempt.
 */
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
/**
 * carAdd.js
 * 
 * This module provides the logic for adding a car to the data set.
 * It first constructs the new car data, checks for duplicates, 
 * and then attempts to push the new car to the data set.
 */

// External Dependencies
import { adminGitHubGetCarsData, adminGitHubSubmitCarsData } from '../services/github';
import { duplicateChecker } from '../utils/misc';
import handlerTemplate from './template';
import utilCarConstruct from '../../../lib/utils/carConstruct';

/**
 * Handles the car addition request by adding the new car data to the data set.
 *
 * This function constructs the new car data, checks for duplicates in the existing data, 
 * and then pushes the new car to the data set if there are no conflicts.
 *
 * @param {Request} request - The incoming request object with form data containing new car details.
 * @return {Response} - The response to the car addition request, which may contain success or error messages.
 */
const handlerAdminCarAdd = async (request) => {
  const formData = await request.formData();
  const formDataObject = Object.fromEntries(formData.entries());

  const dataCarsAll = await adminGitHubGetCarsData();

  const newCar = utilCarConstruct(dataCarsAll.data, formDataObject);

  const dupeCheck = duplicateChecker(dataCarsAll.data, ['id', 'code'], newCar);

  if (!dupeCheck.success){
    return handlerTemplate(request,{
      feedback: {
        success: false,
        message: `Fail: ${dupeCheck.message}`,
      },
      data:newCar
    });
  }

  newCar.addedDetails.by = ADMIN_NAME;
  newCar.addedDetails.date = new Date().toISOString().split('T')[0];

  dataCarsAll.data.push(newCar);


  const response = await adminGitHubSubmitCarsData(dataCarsAll.data, dataCarsAll.sha);

  return handlerTemplate(request,{
    feedback: {
      success: response.success,
      message: response.message
    },
    data:newCar
  });
}
export default handlerAdminCarAdd;
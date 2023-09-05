/**
 * carSearch.js
 * 
 * This module provides logic for the admin car search functionality.
 * It takes the user's search criteria, processes the criteria to be usable for searching,
 * and then searches the car dataset for any matches.
 */

// External Dependencies
import { servicesGithubDataCarsAll } from '../../../lib/services/github';
import { toolShapeSearchFormData, toolCarSearch } from '../../../lib/utils/searchTools';
import handlerTemplate from './template';

/**
 * Handles the car search request by processing the search criteria and filtering the car dataset.
 *
 * @param {Request} request - The incoming request object with form data containing search criteria.
 * @return {Response} - The response to the search request, which may contain a list of matching cars or a feedback message.
 */
const handlerAdminCarSearch = async (request) => {
  const dataCarsAll = await servicesGithubDataCarsAll();

  const formData = await request.formData();
  const formDataObject = Object.fromEntries(formData.entries());
  const shapedData = toolShapeSearchFormData(dataCarsAll, formDataObject);

  const filteredCars = dataCarsAll.filter(car => toolCarSearch(car, shapedData));

  return handlerTemplate(request,{
    feedback: {
      success: true,
      message: getFeedbackMessage(filteredCars.length),
    },
    data:filteredCars
  });
}
export default handlerAdminCarSearch;

/**
 * Generates a feedback message based on the number of cars found.
 *
 * @param {number} count - The number of cars found.
 * @return {string} - Feedback message.
 */
const getFeedbackMessage = (count) => {
  if (count === 0) return 'Found no cars';
  if (count === 1) return 'Found 1 car';
  return `Found ${count} cars`;
}
// src > admin > lib > carSearch.js - Adding a car :)

import { servicesGithubDataCarsAll } from '../../../lib/services/github';
import { toolShapeSearchFormData, toolCarSearch } from '../../../lib/utils/searchTools';

import handlerTemplate from './template';

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

const getFeedbackMessage = (count) => {
  if (count === 0) return 'Found no cars';
  if (count === 1) return 'Found 1 car';
  return `Found ${count} cars`;
}
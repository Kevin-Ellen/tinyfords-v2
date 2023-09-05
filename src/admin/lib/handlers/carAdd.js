// src > admin > lib > carAdd.js - Adding a car :)

import { adminGitHubGetCarsData, adminGitHubSubmitCarsData } from '../services/github';

import { duplicateChecker } from '../utils/misc';

import handlerTemplate from './template';

import utilCarConstruct from '../../../lib/utils/carConstruct';

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


// src > admin > lib > carAdd.js - Adding a car :)

import { adminGitHubGetCarsData, adminGitHubSubmitCarsData } from '../services/github';
import { getUniqueCarCategories, getUniqueCarCaseTypes, doeValueExist } from '../../../lib/utils/dataCars';

import handlerTemplate from './template';

const handlerCarAdd = async (request) => {
  const formData = await request.formData();
  const formDataObject = Object.fromEntries(formData.entries());


  const dataCarsAll = await adminGitHubGetCarsData();

  const newCar = transformEntryToCar(formDataObject, dataCarsAll.data);

  if(doesKeyExist(dataCarsAll, 'id', newCar.id)){
    return handlerTemplate(request,{
      feedback: {
        success: false,
        message: 'Failed - ID already exists',
      },
      data:newCar
    });
  }

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
export default handlerCarAdd;

const transformEntryToCar = (entry, dataCarsAll) => {

  const caseDetail = getUniqueCarCaseTypes(dataCarsAll).find(cases => cases.type === entry.caseType);
  const categoryDetail = getUniqueCarCategories(dataCarsAll).find(cat => cat.short === entry.category);

  if (entry.category === 'ot') {
    entry.brand = entry.brand;
  } else {
    entry.brand = categoryDetail.name;
  }

  const statusMap = {
    'true': true,
    'false': false
  };
  const status = statusMap[entry.hasCase] !== undefined ? statusMap[entry.hasCase] : null;

  const hasPhoto = entry.hasPhoto === 'on';


  return {
    id: parseInt(entry.id, 10),
    name: entry.name,
    make: entry.make,
    brand: entry.brand,
    categoryDetails: {
      name: categoryDetail.name,
      folder: categoryDetail.folder,
      short: categoryDetail.short
    },
    code: entry.code==="null" ? null : entry.code,
    base: entry.base==="null" ? null : entry.base,
    caseDetails: {
      type: caseDetail.type,
      name: caseDetail.name,
      status: status
    },
    quantity: parseInt(entry.quantity, 10),
    addedDetails:{
      date: new Date().toISOString().split('T')[0],
      by: ADMIN_NAME
    },
    hasPhoto: hasPhoto,
  };
};

// const showCarAdd = (request, request) => {
//   let content = handlerAdminTemplate(request,{
//     isAuthenticated: true
//   });

//   // Ensure content is wrapped in a Response object if not already
//   if (!(content instanceof Response)) {
//     content = new Response(content,{
//       status:200,
//       headers:{
//         'x-robots-x': 'noindex',
//         'Content-Type': 'text/html',
//       }
//     });
//   }

//   content.headers.set('Set-Cookie', cookie);

//   return content;
// }
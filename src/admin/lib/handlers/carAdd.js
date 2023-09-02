// src > admin > lib > carAdd.js - Adding a car :)

import { adminGitHubGetCarsData, adminGitHubSubmitCarsData } from "../services/github";

import { getUniqueCarCategories, getUniqueCarCaseTypes } from "../../../lib/utils/dataCars";

const handlerCarAdd = async (request) => {
  const formData = await request.formData();
  const formDataObject = Object.fromEntries(formData.entries());


  const dataCarsAll = await adminGitHubGetCarsData();

  const newCar = transformEntryToCar(formDataObject, dataCarsAll.data);

  console.log(newCar);

  dataCarsAll.data.push(newCar);

  const response = await adminGitHubSubmitCarsData(dataCarsAll.data, dataCarsAll.sha);

  console.log(response);

  if (response.success) {
    return new Response(response.message);
  }else{
    return new Response(response.message);
  }
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
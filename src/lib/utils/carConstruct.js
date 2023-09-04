// src > lib > utils > carConstruct.js - Quick tools for creating a car


import { getCaseById, getCategoryById } from "./dataCars";

const utilCarConstruct = (data = {}, dataCarsAll = []) => {

  const processedData = data ? processFormData(data) : {};

  const newCar = {...templateCar, ...processedData};


  newCar.caseDetails = getCaseById(dataCarsAll, processedData.caseType) || newCar.caseDetails;
  newCar.categoryDetails = getCategoryById(dataCarsAll, processedData.category) || newCar.categoryDetails;

  switch (newCar.categoryDetails.id){
    case 'hw':
    case 'mb':
      newCar.brand = newCar.categoryDetails.name;break;
  }

  newCar.caseDetails.status = newCar.hasCase || newCar.caseDetails.status;

  delete newCar.hasCase;
  delete newCar.caseType;
  delete newCar.hasCase;

  return newCar;
}

export default utilCarConstruct;

const templateCar = {
  id: null,
  name: '',
  make: '',
  brand: '',
  categoryDetails: {
    id: '',
    name: '',
    folder: '',
  },
  code: null,
  base: null,
  caseDetails: {
    id: '',
    name: '',
    status: null,
  },
  quantity: 0,
  addedDetails: {
    date: null,
    by: ''
  },
  hasPhoto: false,
};

const processFormData = (formData) => {
  const processedData = { ...formData }; // Create a shallow copy

  const nullKeys = ['code', 'hasCase', 'base']; // Add any other keys that need to be checked here
  nullKeys.forEach(key => {
    if (processedData[key] === "null") {
      processedData[key] = null;
    }
  });


  processedData.id = parseInt(processedData.id, 10);
  processedData.quantity = parseInt(processedData.quantity, 10);

  processedData.hasPhoto = processHasPhoto(processedData.hasPhoto);
  processedData.hasCase = processHasCase(processedData.hasCase);

  return processedData;
}

const processHasPhoto = (value) => {
  if (value === 'on') return true;        // formData for checked checkbox
  if (value === true) return true;       // previously submitted data
  if (value === false) return false;     // previously submitted data
  return false;                          // default for all other cases
}

const processHasCase = (value) => {
  if(value === 'true') return true;
  if(value === 'false') return true;
  if(value === 'null') return null;
  return value;
}
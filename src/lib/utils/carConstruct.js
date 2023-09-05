// src > lib > utils > carConstruct.js - Quick tools for creating a car


import { getCaseById, getCategoryById } from "./dataCars";

const utilCarConstruct = (dataCarsAll = [], data = {}) => {
  const processedData = processFormData(data);

  const newCar = {
    ...templateCar,
    ...processedData,
    hasPhoto: processBooleanField(processedData.hasPhoto),
    caseDetails: {
      ...templateCar.caseDetails,
      ...getCaseById(dataCarsAll, processedData.caseType),
      status: processBooleanField(processedData.hasCase)
    },
    categoryDetails: getCategoryById(dataCarsAll, processedData.category) || templateCar.categoryDetails
  };

  switch (newCar.categoryDetails.id) {
    case 'hw':
    case 'mb':
      newCar.brand = newCar.categoryDetails.name;
      break;
    default:
      break;
  }

  delete newCar.hasCase;
  delete newCar.caseType;
  delete newCar.category;
  delete newCar.action;

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

  const nullKeys = ['code', 'hasCase', 'base'];
  nullKeys.forEach(key => {
      if (processedData.hasOwnProperty(key) && processedData[key] === "null") {
          processedData[key] = null;
      }
  });

  processedData.id = parseInt(processedData.id, 10);
  processedData.quantity = parseInt(processedData.quantity, 10);

  processedData.hasPhoto = processHasPhoto(processedData.hasPhoto);

  return processedData;
}

const processHasPhoto = (value) => {
  if (value === 'on') return true;        // formData for checked checkbox
  if (value === true) return true;       // previously submitted data
  if (value === false) return false;     // previously submitted data
  return false;                          // default for all other cases
}

const processBooleanField = (value) => {
  if (['on', 'true'].includes(value)) return true;
  if (value === 'false') return false;
  if (value === 'null') return null;
  return value;
}
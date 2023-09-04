// src > lib > utils > carConstruct.js - Quick tools for creating a car

import { getUniqueCarCaseTypes, getUniqueCarCategories } from "./dataCars";
import { getCaseById, getCategoryById } from "./dataCars";

const utilCarConstruct = (data = {}, dataCarsAll = []) => {

  

  const processedData = data ? processFormData(data) : {};

  console.log((processedData);

  const newCar = {...templateCar, ...processedData};

  const caseDetail = getDetail(data, dataCarsAll, getCaseById, 'caseType', 'caseDetails');
  const categoryDetail = getDetail(data, dataCarsAll, getCategoryById, 'category', 'categoryDetails');  

  if (caseDetail) {newCar.caseDetails = caseDetail;}
  if (categoryDetail) {newCar.categoryDetails = categoryDetail;}
  newCar.hasPhoto = processHasPhoto(data.hasPhoto);

  console.log(newCar);
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
  const processedData = formData;
  return processedData;
}

const processHasPhoto = (value) => {
  if (value === 'on') return true;        // formData for checked checkbox
  if (value === true) return true;       // previously submitted data
  if (value === false) return false;     // previously submitted data
  return false;                          // default for all other cases
}

const getDetail = (entry, dataCarsAll, uniqueMethod, entryProperty, existingProperty) => {

  console.log("dataCarsAll:", dataCarsAll);
  
  if (!entry) { return false; }
  
  if (entry[existingProperty]) {
    return entry[existingProperty];
  }

  if (Array.isArray(dataCarsAll) && entry[entryProperty]) {
    return uniqueMethod(dataCarsAll).find(item => item.id === entry[entryProperty]);
  } 

  return undefined; // or whatever default value you want to return when there's no match
}
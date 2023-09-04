// src > lib > utils > carConstruct.js - Quick tools for creating a car


import { getCaseById, getCategoryById } from "./dataCars";

const utilCarConstruct = (data = {}, dataCarsAll = []) => {

  

  const processedData = data ? processFormData(data) : {};

  const newCar = {...templateCar, ...processedData};


  newCar.caseDetails = getCaseById(dataCarsAll, processedData.caseType) || newCar.caseDetails;
  newCar.categoryDetails = getCategoryById(dataCarsAll, processedData.category) || newCar.categoryDetails;

  newCar.hasPhoto = processHasPhoto(data.hasPhoto);

  switch (newCar.categoryDetails.id){
    case 'hw':
    case 'mb':
      newCar.brand = newCar.categoryDetails.name;break;
  }

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
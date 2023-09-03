// src > lib > utils > carConstruct.js - Quick tools for creating a car

import { getUniqueCarCaseTypes, getUniqueCarCategories } from "./dataCars";

const utilCarConstruct = (data = {}, dataCarsAll = []) => {

  const processedData = data ? processFormData(data) : {};

  const newCar = {...templateCar, ...processedData};

  const caseDetail = getDetail(data, dataCarsAll, getUniqueCarCaseTypes, 'caseType', 'caseDetails');
  const categoryDetail = getDetail(data, dataCarsAll, getUniqueCarCategories, 'category', 'categoryDetails');

  console.log(categoryDetail);

  if (caseDetail) {newCar.caseDetails = caseDetail;}
  if (categoryDetail) {newCar.categoryDetails = categoryDetail;}
  newCar.hasPhoto = processHasPhoto(data.hasPhoto);

  // console.log(newCar);
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
  console.log(formData);
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
  console.log('Entry:', entry);
  console.log('Entry Property Value:', entry[entryProperty]);
  console.log('Existing Property Value:', entry[existingProperty]);

  if(!entry){ return false;}
  
  if(entry[existingProperty]){
    return entry[existingProperty];
  }

  if(entry[entryProperty]){
    const detail = uniqueMethod(dataCarsAll).find(item => item.type === entry[entryProperty]);
    console.log('Found detail:', detail);
    return detail;
  }

  return undefined;
}

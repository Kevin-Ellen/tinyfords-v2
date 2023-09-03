// src > lib > utils > carConstruct.js - Quick tools for creating a car

import { getUniqueCarCaseTypes, getUniqueCarCategories } from "./dataCars";

const utilCarConstruct = (data = {}, dataCarsAll = []) => {

  const caseDetail = getDetail(data, dataCarsAll, getUniqueCarCaseTypes, 'caseType', 'caseDetails');
  const categoryDetail = getDetail(data, dataCarsAll, getUniqueCarCategories, 'category', 'categoryDetails');
  
  const newCar = JSON.parse(JSON.stringify(templateCar));

  if (caseDetail) {newCar.caseDetails = caseDetail;}
  if (categoryDetail) {newCar.categoryDetails = categoryDetail;}
  newCar.hasPhoto = processHasPhoto(data.hasPhoto);

  return newCar;
}

export default utilCarConstruct;

const templateCar = {
  id: null,
  name: '',
  make: '',
  brand: '',
  categoryDetails: {
    name: '',
    folder: '',
    short: ''
  },
  code: null,
  base: null,
  caseDetails: {
    type: '',
    name: '',
    status: null
  },
  quantity: 0,
  addedDetails: {
    date: null,
    by: ''
  },
  hasPhoto: false,
};

const processHasPhoto = (value) => {
  if (value === 'on') return true;        // formData for checked checkbox
  if (value === true) return true;       // previously submitted data
  if (value === false) return false;     // previously submitted data
  return false;                          // default for all other cases
}

const getDetail = (entry, dataCarsAll, uniqueMethod, entryProperty, existingProperty) => {
  if(!entry){ return false;}
  
  if(entry[existingProperty]){
    return entry[existingProperty];
  }

  if(entry[entryProperty]){
    return uniqueMethod(dataCarsAll).find(item => item.type === entry[entryProperty]);
  }

  return undefined; // or whatever default value you want to return when there's no match
}


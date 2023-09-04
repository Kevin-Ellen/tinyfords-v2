// src > lib > utils > dataCars.js - small tools

import { multiSort } from './misc';


export const utilDataCarsLatest = async (data,number) => {
  const sortedCars = multiSort(data,['dateAdded', 'id'], { dateAdded: 'desc', id: 'desc' });
  return sortedCars.slice(0,number);
}

export const getUniqueCarCategories = (data) => {
  const uniqueCategoriesMap = data.reduce((acc, car) => {
    const { id, name, folder } = car.categoryDetails;
    
    if (!acc[id]) {
      acc[id] = { id, name, folder };
    }
    
    return acc;
  }, {});

  return Object.values(uniqueCategoriesMap);
}

export const getUniqueCarCaseTypes = (data) => {
  const uniqueCarCaseTypeMap = data.reduce((acc, car) => {
    const { id, name } = car.caseDetails;
    
    if (!acc[id]) {
      acc[id] = { id, name };
    }
    
    return acc;
  }, {});

  return Object.values(uniqueCarCaseTypeMap);
}

export const getCaseById = (dataCarsAll, caseId) => {
  return dataCarsAll.find(item => item.caseDetails.id === caseId);
}

export const getCategoryById = (dataCarsAll, categoryId) => {
  return dataCarsAll.find(item => item.categoryDetails.id === categoryId);
}
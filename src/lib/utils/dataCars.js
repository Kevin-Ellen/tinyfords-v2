// src > lib > utils > dataCars.js - small tools

import { multiSort } from './misc';


export const utilDataCarsLatest = async (data,number) => {
  
  const sortedCars = multiSort(data,['dateAdded', 'id'], { dateAdded: 'desc', id: 'desc' });

  return sortedCars.slice(0,number);
}

export const getUniqueCarCategories = (data) => {
  const uniqueCategoriesMap = data.reduce((acc, car) => {
    const { short, name, folder } = car.categoryDetails;
    
    if (!acc[short]) {
      acc[short] = { short, name, folder };
    }
    
    return acc;
  }, {});

  return Object.values(uniqueCategoriesMap);
}

export const getUniqueCarCaseTypes = (data) => {
  const uniqueCarCaseTypeMap = data.reduce((acc, car) => {
    const { type, name } = car.caseDetails;
    
    if (!acc[type]) {
      acc[type] = { type, name };
    }
    
    return acc;
  }, {});

  return Object.values(uniqueCarCaseTypeMap);
}
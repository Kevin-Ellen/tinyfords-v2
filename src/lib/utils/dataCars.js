// src > lib > utils > dataCars.js - small tools

import { multiSort } from './misc';


export const utilDataCarsLatest = async (data,number) => {
  
  const sortedCars = multiSort(data,['dateAdded', 'id'], { dateAdded: 'desc', id: 'desc' });

  return sortedCars.slice(0,number);
}

export const getUniqueCarCategories = (data) => {
  const uniqueCategoriesMap = data.reduce((acc, car) => {
    const { short, name } = car.categoryDetails;
    
    if (!acc[short]) {
      acc[short] = { short, name };
    }
    
    return acc;
  }, {});

  return Object.values(uniqueCategoriesMap);
}
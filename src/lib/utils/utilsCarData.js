// src > lib > utils > utilsCarData.js - small tools

import { multiSort } from './utilsMisc';


export const utilGetLatestCars = async (data,number) => {
  
  const sortedCars = multiSort(data,['dateAdded', 'id'], { dateAdded: 'desc', id: 'desc' });

  return sortedCars.slice(0,number);
}
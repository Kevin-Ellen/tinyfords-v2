// src > lib > utils > dataCars.js - small tools

import { multiSort } from './utilsMisc';


export const dataCarsLatest = async (data,number) => {
  
  const sortedCars = multiSort(data,['dateAdded', 'id'], { dateAdded: 'desc', id: 'desc' });

  return sortedCars.slice(0,number);
}
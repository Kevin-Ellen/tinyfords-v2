/**
 * dataCars.js
 * 
 * This module offers utility functions to handle operations
 * related to car data like sorting, retrieving unique categories,
 * and fetching specific car details.
 */

// Import necessary utilities
import { multiSort } from './misc';
import { appData } from '../services/appData';

/**
 * Retrieves the latest cars based on the added date and ID.
 * 
 * @param {Array} data - The list of car data objects.
 * @param {number} number - The number of latest cars to retrieve.
 * @returns {Array} - The sorted list of latest cars.
 */
export const utilDataCarsLatest = (data, number) => {
  const sortedCars = multiSort(data, ['date', 'id'], { dateAdded: 'desc', id: 'desc' });
  return sortedCars.slice(0, number);
}

/**
 * Extracts unique car categories from the provided car data.
 * 
 * @param {Array} data - The list of car data objects.
 * @returns {Array} - The list of unique car categories.
 */
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

/**
 * Extracts unique car case types from the provided car data.
 * 
 * @param {Array} data - The list of car data objects.
 * @returns {Array} - The list of unique car case types.
 */
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

/**
 * Retrieves the case details of a car by its case ID.
 * 
 * @param {Array} dataCarsAll - The list of all cars data.
 * @param {string} caseId - The ID of the car case to retrieve.
 * @returns {Object|false} - The car case details or false if not found.
 */
export const getCaseById = (dataCarsAll, caseId) => {
  if(caseId === undefined || caseId === false){return false;}
  
  const foundItem = dataCarsAll.find(item => item.caseDetails.id === caseId);
  return foundItem ? foundItem.caseDetails : false;
}

/**
 * Retrieves the category details of a car by its category ID.
 * 
 * @param {Array} dataCarsAll - The list of all cars data.
 * @param {string} categoryId - The ID of the car category to retrieve.
 * @returns {Object|false} - The car category details or false if not found.
 */
export const getCategoryById = (dataCarsAll, categoryId) => {
  if(categoryId === undefined){return false;}
  return dataCarsAll.find(item => item.categoryDetails.id === categoryId).categoryDetails;
}

/**
 * Fetches a car object from the list by its ID.
 * 
 * @param {Array} cars - The list of all cars data.
 * @param {number|string} id - The ID of the car to retrieve.
 * @returns {Object} - The car object.
 */
export const getCarById = (id, cars = appData.cars.all) => {
  return cars.find(car => car.id === parseInt(id, 10));
}

/**
 * Fetches all car objects from the list by their category ID.
 * 
 * @param {Array} cars - The list of all cars data.
 * @param {number|string} id - The ID of the category.
 * @returns {Array} - The list of cars that belong to the given category.
 */
export const getCarsByCategoryId = (id, cars = appData.cars.all) => {
  return cars.filter(car => car.categoryDetails.id === id);
}

/**
 * Filters the dataset of cars based on a search term.
 * 
 * @param {Array} data - The dataset of cars.
 * @param {string} term - The search term.
 * @returns {Array} - The filtered list of cars.
 */
export const searchCars = (term, data = appData.cars.current) => {
  
  if(!term) return data;
  
  // Convert the search term to lowercase for case-insensitive search
  term = term.toLowerCase();

  

  // Return only those cars that have the search term in their name, brand, or code
  return data.filter(car => {
    return (
      car.name && car.name.toLowerCase().includes(term) ||           // Check if name exists and includes the term
      car.brand && car.brand.toLowerCase().includes(term) ||         // Check if brand exists and includes the term
      car.code && car.code.toLowerCase().includes(term) ||              // Check if code exists and includes the term
      car.make && car.make.toLowerCase().includes(term)              // Check if code exists and includes the term
    );
  });
};
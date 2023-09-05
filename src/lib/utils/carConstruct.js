/**
 * carConstruct.js
 * 
 * This module provides utility functions to construct car objects,
 * process form data, and manage specific car-related tasks.
 */

// Importing required modules and utilities.
import { getCaseById, getCategoryById } from "./dataCars";

/**
 * Construct a car object based on the given data and default templates.
 * 
 * @param {Array} dataCarsAll - The list of all cars data.
 * @param {Object} data - The car data object to be processed.
 * @returns {Object} - The constructed car object.
 */
const utilCarConstruct = (dataCarsAll = [], data = {}) => {
  const processedData = processFormData(data);

  const newCar = {
    ...templateCar,
    ...processedData,
    hasPhoto: processBooleanField(processedData.hasPhoto),
    caseDetails: {
      ...templateCar.caseDetails,
      ...getCaseById(dataCarsAll, processedData.caseType),
      status: processBooleanField(processedData.hasCase)
    },
    categoryDetails: getCategoryById(dataCarsAll, processedData.category) || templateCar.categoryDetails
  };

  switch (newCar.categoryDetails.id) {
    case 'hw':
    case 'mb':
      newCar.brand = newCar.categoryDetails.name;
      break;
    default:
      break;
  }

  delete newCar.hasCase;
  delete newCar.caseType;
  delete newCar.category;
  delete newCar.action;

  return newCar;
}
export default utilCarConstruct;

// Template for default car structure.
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

/**
 * Process form data to match the required format.
 * 
 * @param {Object} formData - The form data to be processed.
 * @returns {Object} - The processed form data.
 */
const processFormData = (formData) => {
  const processedData = { ...formData }; // Create a shallow copy

  const nullKeys = ['code', 'hasCase', 'base'];
  nullKeys.forEach(key => {
      if (processedData.hasOwnProperty(key) && processedData[key] === "null") {
          processedData[key] = null;
      }
  });

  processedData.id = parseInt(processedData.id, 10);
  processedData.quantity = parseInt(processedData.quantity, 10);

  processedData.hasPhoto = processHasPhoto(processedData.hasPhoto);

  return processedData;
}

/**
 * Determine if the car has a photo based on the provided value.
 * 
 * @param {any} value - The value indicating the presence of a photo.
 * @returns {boolean} - True if the car has a photo, false otherwise.
 */
const processHasPhoto = (value) => {
  if (value === 'on') return true;        // formData for checked checkbox
  if (value === true) return true;       // previously submitted data
  if (value === false) return false;     // previously submitted data
  return false;                          // default for all other cases
}

/**
 * Convert the given value to its appropriate boolean representation.
 * 
 * @param {any} value - The value to be processed.
 * @returns {boolean|null} - The processed boolean value or null.
 */
const processBooleanField = (value) => {
  if (['on', 'true'].includes(value)) return true;
  if (value === 'false') return false;
  if (value === 'null') return null;
  return value;
}
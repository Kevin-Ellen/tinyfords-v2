/**
 * searchTools.js
 * 
 * This module contains utility functions to assist with searching and shaping
 * car data for querying. The tools allow for specific filtering of car data
 * based on various criteria, such as photo availability, case details, category,
 * and more.
 */

import { getCaseById, getCategoryById } from "./dataCars";

/**
 * Shapes and prepares the search form data for querying.
 * 
 * @param {Array} dataCarsAll - All car data.
 * @param {Object} data - The search criteria.
 * @returns {Object} - The shaped search criteria.
 */
export const toolShapeSearchFormData = (dataCarsAll, data) => {
  const shapedData = {};

  // Process the hasPhoto property
  if ('hasPhoto' in data) {
    shapedData.hasPhoto = data.hasPhoto === "true";
  }

  // Handle the hasCase property and related case details
  if( 'hasCase' in data ){
    if (data.caseType) {
      const caseDetails = getCaseById(dataCarsAll, data.caseType);
      if (caseDetails) {
        shapedData.caseDetails = caseDetails;
        shapedData.caseDetails.status = shapedData.hasCase;
      }
    } else {
      shapedData.caseDetails = {};
    }
    shapedData.caseDetails.status = data.hasCase === "true" ? true : data.hasCase === "false" ? false : null;

    // Clean up temporary properties
    ['hasCase', 'caseType'].forEach(prop => delete data[prop]);
  }

  // Process the category details
  if (data.category) {
    const categoryDetails = getCategoryById(dataCarsAll, data.category);
    if (categoryDetails) {
      shapedData.categoryDetails = categoryDetails;
    }
    ['category'].forEach(prop => delete data[prop]);
  }

  // Convert id to an integer if present
  if(data.id){
    data.id = parseInt(data.id, 10);
  }

  // Copy other properties without any transformation
  for (const key in data) {
    shapedData[key] = data[key];

    // Remove any properties that are empty or null
    if (shapedData[key] === "" || shapedData[key] === null) {
      delete shapedData[key];
    }
  }

  return shapedData;
}

/**
 * Filters a car based on provided criteria.
 * 
 * @param {Object} car - The car data.
 * @param {Object} criteria - The search criteria.
 * @returns {boolean} - Whether the car matches the criteria or not.
 */
export const toolCarSearch = (car, criteria) => {
  for (const key in criteria) {
    if (typeof criteria[key] === 'object' && criteria[key] !== null) {
      // If the criteria is an object (like caseDetails), we iterate through its sub-properties
      for (const subKey in criteria[key]) {
        if (car[key][subKey] !== criteria[key][subKey]) {
          return false; // If any sub-property doesn't match, the car doesn't meet the criteria
        }
      }
    } else if (car[key] !== criteria[key]) {
      return false; // If any direct property doesn't match, the car doesn't meet the criteria
    }
  }
  return true; // The car meets all provided criteria
}
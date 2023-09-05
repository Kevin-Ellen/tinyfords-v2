// src > lib > utils > searchTools.js - All search tools

import { getCaseById, getCategoryById } from "./dataCars";

export const toolShapeSearchFormData = (dataCarsAll, data) => {
  const shapedData = {};

  // Process hasPhoto
  if ('hasPhoto' in data) {
    shapedData.hasPhoto = data.hasPhoto === "true";
  }

  // Process hasCase and caseDetails
  if( 'hasCase' in data ){

    if (data.caseType) {
      const caseDetails = getCaseById(dataCarsAll, data.caseType);
      if (caseDetails) {
        shapedData.caseDetails = caseDetails;
        shapedData.caseDetails.status = shapedData.hasCase;
      }
    }else{
      shapedData.caseDetails = {};
    }
    shapedData.caseDetails.status = data.hasCase === "true" ? true : data.hasCase === "false" ? false : null;

    ['hasCase', 'caseType'].forEach(prop => delete data[prop]);
  }

  // Process categoryDetails
  if (data.category) {
    const categoryDetails = getCategoryById(dataCarsAll, data.category);
    if (categoryDetails) {
      shapedData.categoryDetails = categoryDetails;
    }
    ['category'].forEach(prop => delete data[prop]);
  }

  // Transfer other properties without change
  for (const key in data) {
    shapedData[key] = data[key];

    // Remove empty or null properties
    if (shapedData[key] === "" || shapedData[key] === null) {
      delete shapedData[key];
    }
  }

  console.log(shapedData);
  return shapedData;
}

export const toolCarSearch = (car, criteria) => {
  for (const key in criteria) {
    if (typeof criteria[key] === 'object' && criteria[key] !== null) {
      // If the criteria is an object (like caseDetails), we check its sub-properties
      for (const subKey in criteria[key]) {
        if (car[key][subKey] !== criteria[key][subKey]) {
          return false; // Sub-property doesn't match
        }
      }
    } else if (car[key] !== criteria[key]) {
      return false; // Direct property doesn't match
    }
  }
  return true; // All criteria matched
}
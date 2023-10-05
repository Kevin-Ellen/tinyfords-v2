/**
 * error.js
 * 
 * This module provides a utility function to handle and respond to errors.
 * It constructs and returns an error response with the provided status code 
 * and message, making it easier to maintain consistent error handling throughout
 * the application.
 */

/**
 * Creates and returns an error response.
 * 
 * @param {number} status - The HTTP status code for the error.
 * @param {string} message - A descriptive error message.
 * @returns {Response} - A constructed error Response object with the provided status and message.
 */
const handleError = (status, message) => {
  return new Response(`Error: ${message}`, {status:status});
}

export default handleError;
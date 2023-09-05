/**
 * utilGitHub.js
 * 
 * Utility functions to interact with the GitHub API.
 * These functions provide the capability to fetch JSON data and images from a GitHub repository.
 */

// Importing utility for decoding base64 strings.
import {base64Decode} from '../utils/misc';

// Constants related to the GitHub repository and API access.
const apiKey = GITHUB_API_KEY;
const REPO_OWNER = 'Kevin-Ellen';
const REPO_NAME = 'tinyfords-v2';
const BASE_URL = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/`;
const FILE_PATH = {
  allPages: 'src/data/pages.json',
  allCars:  'src/data/cars.json',
};

/**
 * Fetch data from a given path in the GitHub repository.
 * 
 * @param {string} path - The path to the file in the GitHub repository.
 * @returns {Object} - Parsed JSON data from the fetched file.
 * @throws Will throw an error if the GitHub API returns a non-okay response.
 */
const fetchFromGitHub = async (path) => {
  const url = BASE_URL + path;
  const response = await fetch(url, {
    headers: {
        'Authorization': `Bearer ${apiKey}`,
        'User-Agent': 'tinyfords-v2-app',
        'Accept': 'application/json'
    }
  });

  if (!response.ok) {
    throw new Error(`GitHub API returned ${response.status}: ${response.statusText}`);
  }

  const data = await response.json();
  const decoded = base64Decode(data.content);
  
  return JSON.parse(decoded);
}

/**
 * Fetch all page data from the GitHub repository.
 * 
 * @returns {Object} - Parsed JSON data of all pages.
 */
export const servicesGithubDataPageAll = async () => {
  return fetchFromGitHub(FILE_PATH.allPages);
}

/**
 * Fetch all car data from the GitHub repository.
 * 
 * @returns {Object} - Parsed JSON data of all cars.
 */
export const servicesGithubDataCarsAll = async () => {
  return fetchFromGitHub(FILE_PATH.allCars);
}

/**
 * Fetch an image from a given path in the GitHub repository.
 * 
 * @param {string} path - The path to the image in the GitHub repository.
 * @returns {Blob} - The fetched image as a blob.
 * @throws Will throw an error if the GitHub API returns a non-okay response.
 */
export const servicesGithubImageGetter = async (path) => {
  const response = await fetch(BASE_URL + path, {
    headers: {
        'Authorization': `Bearer ${apiKey}`,
        'User-Agent': 'tinyfords-v2-app',
        'Accept': 'application/vnd.github.3.raw'
    }
  });

  if (!response.ok) {
    throw new Error(`GitHub API returned ${response.status}: ${response.statusText}`);
  }

  return response.blob();
}
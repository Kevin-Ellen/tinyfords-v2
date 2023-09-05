/**
 * adminGitHub.js
 *
 * This module handles the interactions with GitHub's API for the purposes of:
 * 1. Retrieving car data from a specific repository and file.
 * 2. Submitting updated car data to the same repository and file.
 *
 * It leverages the GitHub API to fetch and update the specified file's content.
 * The key functionalities include decoding the base64 encoded data from GitHub 
 * and submitting new data in a similar format.
 */

// External Dependencies
import { base64Decode } from '../../../lib/utils/misc';

// Constants related to the GitHub repository and file details
const apiKey = GITHUB_API_KEY;
const REPO_OWNER = 'Kevin-Ellen';
const REPO_NAME = 'tinyfords-v2';
const FILE_PATH = 'src/data/cars.json';
const url = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${FILE_PATH}`;

/**
 * Fetches car data from a specific GitHub repository.
 *
 * @return {Object} An object containing the SHA of the file and its decoded content.
 */
export const adminGitHubGetCarsData = async () => {
  const response = await fetch(url, {
    headers: {
        'Authorization': `Bearer ${apiKey}`,
        'User-Agent': 'tinyfords-v2-app',
        'Accept': 'application/vnd.github+json'
    }
  });

  const data = await response.json();
  const decoded = base64Decode(data.content);
  const fileContent = JSON.parse(decodeURIComponent(decoded));

  return {
    sha: data.sha,
    data: fileContent
  };
}

/**
 * Submits updated car data to a specific GitHub repository.
 *
 * @param {Array} data - The updated car data to be submitted.
 * @param {string} sha - The SHA of the current version of the file.
 * @return {Object} An object indicating the success status and a corresponding message.
 */
export const adminGitHubSubmitCarsData = async (data, sha) => {
  const updatedContentBase64 = btoa(JSON.stringify(data));
  
  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'User-Agent': 'tinyfords-v2-app',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      message: 'Added/edited a car through the interface',
      content: updatedContentBase64,
      sha: sha  // SHA of the current version of the file
    })
  });

  const responseData = await response.json();
  if (response.ok) {
    return { success: true, message: 'Car added successfully!' };
  } else {
    return { success: false, message: responseData.message };
  }
}
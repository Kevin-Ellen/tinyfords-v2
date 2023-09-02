// src > lib > utils > utilGitHub.js - GitHub API request tools

import {base64Decode} from './utilsMisc';

const apiKey = GITHUB_API_KEY;
const REPO_OWNER = 'Kevin-Ellen';
const REPO_NAME = 'tinyfords-v2';
const BASE_URL = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/`;
const FILE_PATH = {
  allPages: 'src/data/dataPages.json',
  allCars:  'src/data/dataCars.json',
};

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

export const utilGitHubGetAllPagesData = async () => {
  return fetchFromGitHub(FILE_PATH.allPages);
}

export const utilGitHubGetAllCarsData = async () => {
  return fetchFromGitHub(FILE_PATH.allCars);
}

export const utilGitHubGetImage = async (path) => {
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
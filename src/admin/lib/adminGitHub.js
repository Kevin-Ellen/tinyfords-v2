// src > admin > lib > adminGitHub.js - All GH processes

const apiKey = GITHUB_API_KEY;
const REPO_OWNER = 'Kevin-Ellen';
const REPO_NAME = 'tinyfords-v2';
const FILE_PATH = 'src/data/dataCars.json';

export const adminGitHubCarData = async () => {
  const url = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${FILE_PATH}`;

  const response = await fetch(url, {
    headers: {
        'Authorization': `Bearer ${apiKey}`,
        'User-Agent': 'tinyfords-v2-app',
        'Accept': 'application/vnd.github.raw+json'
    }
  });

  const data = await response.json();
  return data;

}
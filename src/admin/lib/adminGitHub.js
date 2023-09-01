// src > admin > lib > adminGitHub.js - All GH processes

import {base64Decode} from '../../lib/utils/utilsMisc';

const apiKey = GITHUB_API_KEY;
const REPO_OWNER = 'Kevin-Ellen';
const REPO_NAME = 'tinyfords-v2';
const FILE_PATH = 'src/data/dataCars.json';

const url = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${FILE_PATH}`;

export const adminGitHubGetCarData = async () => {
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

export const adminGitHubSubmitCarData = async (data, sha) => {
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
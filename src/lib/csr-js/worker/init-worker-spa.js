const workerData = {
  cars: null,
  pages: null,
  content: null,
}

let baseUrl = '';

self.addEventListener('message', (event) => {
  const { type, data } = event.data;
  switch (type) {
    case 'init':
      workerInitialise(data);
      break;
    default:
      workerResponse(false, type);
      break;
  }
  self.postMessage('hello from Worker');
}, false);

const workerResponse = (success, message, data = null) => {
  self.postMessage({
    success,
    message,
    data,
  });
};

const workerInitialise = (data) => {
  baseUrl = new URL(data.baseUrl);
  fetchAllData().then(() => {
    console.log(workerData);  // Moved inside a then block
  });
};

const fetchAllData = async () => {
  const responseCars = await fetchData('/json/cars');
  const responsePages = await fetchData('/json/pages');

  if (responseCars.success) {
    workerData.cars = responseCars.data;
  } else {
    workerResponse(false, 'Cars not fetched');
  }

  if (responsePages.success) {
    workerData.pages = responsePages.data;
  } else {
    workerResponse(false, 'Pages not fetched');
  }
}

const fetchData = async (path) => {
  const url = baseUrl.origin + path;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch data from '+path+'. Status: '+response.status);
    }
    return {
      success: true,
      data: await response.json()
    };
  } catch (error) {
    workerResponse(false, error.message);
    return {  // Return a structure indicating failure
      success: false,
      message: error.message
    };
  }
};

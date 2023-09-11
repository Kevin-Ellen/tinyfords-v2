

// This function fetches and stores cars data


// This function performs a simple search on the cars data
const performSearch = async (term, collection) => {

  carsData = await fetchCarsData();

  // collection details, slug - collection pairing
  const collections = {
    '/hotwheels': 'hw',
    '/matchbox': 'mb',
    '/other': 'ot',
  }

  // Convert the search term to lowercase for case-insensitive search
  term = term.toLowerCase();

  carsData = collections[collection] ? getCarsByCategoryId(collections[collection]) : carsData;

  // Return only those cars that have the search term in their name, brand, or code
  return carsData.filter(car => {
    return (
      car.name && car.name.toLowerCase().includes(term) ||           // Check if name exists and includes the term
      car.brand && car.brand.toLowerCase().includes(term) ||         // Check if brand exists and includes the term
      car.code && car.code.toLowerCase().includes(term)              // Check if code exists and includes the term
    );
  });
};

const handleSearchSubmit = async (event) => {
  event.preventDefault();

  const urlParams = new URLSearchParams(window.location.search);
  let currentPage = urlParams.get('page') ? parseInt(urlParams.get('page')) : 1;

  const query = event.target.querySelector('input[name="q"]').value;
  const collection = event.target.getAttribute('action');
  const results = await performSearch(query, collection);
  

  carsData = results;


  const totalPages = Math.ceil(carsData.length / ITEMS_PER_PAGE);

  const paginatedResults = getPaginatedResults(carsData, currentPage); // Assume currentPage is defined
  renderResults(paginatedResults);  // Modify renderResults to handle paginated data

  // Render the results in #pageContent or handle it as per your app's design
  if (paginatedResults.length) {
    renderResults(paginatedResults);
  } else {
    document.querySelector('.fragmentCarsGrid').innerHTML = '<p>No results found.</p>';
  }

  // Update search details
  updateSearchDetails(results.length, query);
  addSearchTermToURL(query);

  // Close the search box after performing the search
  const siteSearch = document.querySelector('#siteSearch');
  if (siteSearch) {
    siteSearch.checked = false;
  }
};

// Get Card by category ID
const getCarsByCategoryId = (categoryId) => {
  console.log(`Cat ID: ${categoryId}`);
  return carsData.filter(car => car.categoryDetails.id === categoryId);
}

// This function renders search results
const renderResults = (results) => {

  // 1. Get the container and empty it
  const container = document.querySelector('.fragmentCarsGrid');
  container.innerHTML = '';

  // 2. Get the template
  const template = document.querySelector('#gridItem').content;

  // 3. For each car in the results:
  results.forEach(car => {

    // Clone the template
    const clone = document.importNode(template, true);
    const carImage = createImgPath(car);

    // Update the clone with the car's data
    clone.querySelector('img').src = carImage; // Assuming you have imageURL in your car data
    clone.querySelector('img').setAttribute('alt', `${car.brand} ${car.name} ${car.code ? `- ${car.code}` : ''}`);
    clone.querySelector('h3').innerText = car.name;
    car.code ? clone.querySelector('#templateGridCode span').innerText = car.code : clone.querySelector('#templateGridCode').remove();
    clone.querySelector('#templateGridMake span').innerText = car.make; 
    clone.querySelector('#templateGridAdded span').innerText = car.addedDetails.date;

    // Append the clone to the container
    container.appendChild(clone);
  });
};

// create the imagePath
const createImgPath = (car) => {
  const baseFolder = `/images/${car.categoryDetails.folder}/front-250/`;
  const postfix = `-front-250.jpg`;

  let imagePath;

  if (car.hasPhoto) {
    if (car.categoryDetails.id === 'ot') {
      imagePath = `${car.categoryDetails.id}-${car.id}`;
    } else {
      imagePath = `${car.categoryDetails.id}-${car.code}`;
    }
  } else {
    imagePath = 'coming-soon';
  }

  return `${baseFolder}${imagePath}${postfix}`;
}

const updateSearchDetails = (numResults, searchTerm) => {
  // Get the section containing the search details
  const section = document.querySelector('.fragmentContent');
  
  // Update the number of items found
  const itemCountElem = section.querySelector('p > strong');
  if (itemCountElem) {
    itemCountElem.textContent = numResults;
  }

  // Update or add the search term used
  let searchTermElem = section.querySelector('p:nth-of-type(2) > strong');
  if (searchTermElem) {
    // If the element already exists, update its content
    searchTermElem.textContent = searchTerm;
  } else {
    // If the element doesn't exist, create and append it
    const pElem = document.createElement('p');
    pElem.innerHTML = `Search term used: <strong>${searchTerm}</strong>.`;
    section.appendChild(pElem);
  }

  // Update the value in the search input
  const searchInput = section.querySelector('input[name="q"]');
  if (searchInput) {
    searchInput.value = searchTerm;
  }
};

const multiSort = (data, fields, directions) => {
  return data.sort((a, b) => {
    for (const field of fields) {
      const valueA = getValueByPath(a, field);
      const valueB = getValueByPath(b, field);

      let comparison;
      // Check if we're dealing with dates
      if (valueA && valueB && Date.parse(valueA) && Date.parse(valueB)) {
        comparison = new Date(valueB) - new Date(valueA);
      } else {
        comparison = valueA < valueB ? -1 : valueA > valueB ? 1 : 0;
      }
      if (directions[field] === 'asc') {
        comparison *= -1;
      }
      if (comparison !== 0) return comparison;
    }
    return 0;
  });
};

const getValueByPath = (obj, path) => {
  return path.split('.').reduce((acc, part) => acc && acc[part], obj);
}
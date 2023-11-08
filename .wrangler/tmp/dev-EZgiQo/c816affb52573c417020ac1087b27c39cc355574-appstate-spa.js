const setAppDataPagination = (pageNumber = 1) => {
  const carsCount = appData.cars.current.length; // Or wherever you store the cars in your client-side state
  pageNumber = parseInt(pageNumber) || 1;

  appData.pagination.page = pageNumber;
  appData.pagination.start = (pageNumber - 1) * ITEMS_PER_PAGE.collection;
  appData.pagination.end = appData.pagination.start + ITEMS_PER_PAGE.collection;
  appData.pagination.total = Math.ceil(carsCount / ITEMS_PER_PAGE.collection);
  appData.pagination.slug = appData.pages.current.url.pathname; // Modify as needed to access the current URL from your app state
  appData.pagination.previous.has = pageNumber > 1;
  appData.pagination.previous.page = pageNumber > 1 ? pageNumber - 1 : null;
  appData.pagination.next.has = appData.pagination.end < carsCount;
  appData.pagination.next.page = appData.pagination.end < carsCount ? pageNumber + 1 : null;
}

setAppSearch = (searchTerm = null) => {
  if(!searchTerm){
    appData.search.searchTerm = null;
    appData.search.action = null;
    appData.search.success = false;
  }else{
    appData.search.searchTerm = searchTerm;
    appData.search.action = 'search';
    appData.search.success = true;
  }
}

const setAppCurrent = (url) => {
  appData.pages.current = getPageBySlug(url.pathname);
  appData.pages.current.url = new URL(url);
}

const setAppBreadcrumbs = (data = appData.pages.all) => {
  appData.breadcrumbs = appData.pages.current.breadcrumbList.map((breadcrumbName, index) => {
    const breadcrumbPage = data.find(page => page.name === breadcrumbName);
    if (breadcrumbPage) {
      return {
        name: breadcrumbName,
        slug: breadcrumbPage.slug,
        position: index + 1
      };
    } else {
      return null;
    }
  }).filter(item => item);
}

const setAppSearchCars = (searchTerm = appData.search.searchTerm) => {
  appData.cars.current = searchCars(searchTerm);
}

const setAppCars = (data = appData) => {
  if(appData.pages.current.hasCars){
    appData.cars.current = data.pages.current.id==='all' ? data.cars.all : getCarsByCategoryId(data.pages.current.id);
  }else{
    appData.cars.current = [];
  }
}

const setSearchText = (data = appData.pages.current) => {
  removeSearchTextEntries();
  if (appData.search.searchTerm) {
    const additionalContent = {
      type: 'text',
      element: 'p',
      attributes:{
        className: 'searchText',
      },
      content: `You have searched for <em>'${appData.search.searchTerm}'</em>. There ${appData.cars.current.length===1 ? `is` : `are`} <strong>${appData.cars.current.length}</strong> result${appData.cars.current.length===1 ? `` : `s`}.`
    };
    appData.pages.current.content.intro.entries.push(additionalContent);
  }
}

const removeSearchTextEntries = (entries = appData.pages.current.content.intro.entries) => {
  appData.pages.current.content.intro.entries = entries.filter(entry => {
    return !(entry.attributes && entry.attributes.className === 'searchText');
  });
}

const getPageBySlug = (slug, data = appData.pages.all) => {
  return data.find(page => page.slug === slug) || false;
}

const getCarsByCategoryId = (id, cars = appData.cars.all) => {
  return cars.filter(car => car.categoryDetails.id === id);
}

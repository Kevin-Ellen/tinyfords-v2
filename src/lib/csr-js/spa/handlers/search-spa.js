const handleSearch = (searchTerm = null, url = '/all') => {
  setAppSearch(searchTerm);
  const newUrl = new URL(appData.pages.current.url);
  const urlChanged = newUrl.pathname !== appData.pages.current.url.pathname;
  newUrl.pathname = url;
  newUrl.searchParams.delete('page');

  prepareAppData(newUrl, searchTerm, urlChanged);
  setSearchText();
  
  if (!urlChanged) {
    navigateToNewPage();
  } else {
    applySearchChanges();
  }

  disableAndClose();
  newUrl.searchParams.set('q', appData.search.searchTerm);
  setUrl(newUrl);
};

const prepareAppData = (newUrl, searchTerm, urlChanged) => {
  if (!urlChanged) {
    setAppCurrent(newUrl);
    setAppBreadcrumbs();
  }
  setAppCars();
  setAppSearchCars(searchTerm);
  setAppDataPagination(1);
  setAppBreadcrumbs();
};

const navigateToNewPage = () => {
  renderCollection();
  updateSearchHeading();
};

const applySearchChanges = () => {
  updateSearchTextEntry(appData.pages.current.content.intro.entries[appData.pages.current.content.intro.entries.length - 1]);
  createGridItems();
  createPaginationControls();
  updateSearchHeading();
};

const handlerNavigate = (link) => {
  const newUrl = new URL(link.href);
  const currentUrl = new URL(appData.pages.current.url);

  const newSearchTerm = newUrl.searchParams.get('q');
  const currentSearchTerm = appData.search.searchTerm;
  const samePage = newUrl.pathname === currentUrl.pathname;
  const sameSearch = newSearchTerm === currentSearchTerm;
  if(!newUrl.searchParams.get('page')){
    newUrl.searchParams.set('page',1);
  }
  const samePagination = parseInt(newUrl.searchParams.get('page')) === appData.pagination.page;

  if (samePage) {
    if (sameSearch) {
      if (samePagination) {
        handleNavigateSamePage();
      } else {
        handleNavigatePagination(newUrl);
      }
    } else {
      handleSamePageDifferentSearch(newUrl);
    }
  } else {
    if (newSearchTerm) {
    } else {
      handleNavigateDifferentPageNoSearch(newUrl);
    }
  }
  disableAndClose();
  setUrl(newUrl);
};

const handleSamePageDifferentSearch = (url) => {
  handleNavigateDifferentPageNoSearch(url)
}

const handleNavigateSamePage = () => {
  // setAppSearch(null);
}

const handleNavigatePagination = (url) => {
  setAppDataPagination(url.searchParams.get('page'));
  createPaginationControls();
  disableAndClose();
  updatePaginationHeading(url.searchParams.get('page'));
  createGridItems(appData.cars.current.slice(appData.pagination.start, appData.pagination.end));
  scrollToTop();
}

const handleNavigateDifferentPageNoSearch = (url) => {
  setAppCurrent(url);
  setAppSearch(null);
  removeSearchTextEntries();
  setAppBreadcrumbs();
  if(appData.pages.current.hasCars){
    setAppCars();
  }else{
    appData.cars.current = [];
  }
  setAppDataPagination(1);

  createBreadcrumbs();

  handlerTemplate();
  scrollToTop();
  disableAndClose();
}
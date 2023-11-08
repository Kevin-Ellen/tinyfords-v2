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
        console.log('newUrl page',parseInt(newUrl.searchParams.get('page')));
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
  console.log('handleSamePageDifferentSearch - called');
  handleNavigateDifferentPageNoSearch(url)
}

const handleNavigateSamePage = () => {
  console.log('handleNavigateSamePage - called');
  // setAppSearch(null);
}

const handleNavigatePagination = (url) => {
  console.log('handleNavigatePagination - called');
  setAppDataPagination(url.searchParams.get('page'));
  createPaginationControls();
  disableAndClose();
  updatePaginationHeading(url.searchParams.get('page'));
  createGridItems(appData.cars.current.slice(appData.pagination.start, appData.pagination.end));
  scrollToTop();
}

const handleNavigateDifferentPageNoSearch = (url) => {
  console.log('handleNavigateDifferentPageNoSearch - called');
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
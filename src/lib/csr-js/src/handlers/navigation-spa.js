const handlerNavigate = (link) => {
  const newUrl = new URL(link.href);
  const currentUrl = new URL(appData.pages.current.url);

  const newSearchTerm = newUrl.searchParams.get('q');
  const currentSearchTerm = currentUrl.searchParams.get('q');
  const samePage = newUrl.pathname === currentUrl.pathname;
  const sameSearch = newSearchTerm === currentSearchTerm;
  const samePagination = newUrl.searchParams.get('page') === currentUrl.searchParams.get('page');

  if (samePage) {
    if (sameSearch) {
      if (samePagination) {
        handleNavigateSamePage();
      } else {
        handleNavigatePagination(newUrl);
      }
    } else {
      return;
    }
  } else {
    if (newSearchTerm) {
      return;
    } else {
      handleNavigateDifferentPageNoSearch(newUrl);
    }
  }
  disableAndClose();
};

const handleNavigateSamePage = () => {
  return;
}

const handleNavigatePagination = (url) => {
  // Handle pagination navigation
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
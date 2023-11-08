const ITEMS_PER_PAGE = {
  homepage: 14,
  collection: 21
}
const appData = window.__APP_STATE__;

const appInit = () => {
  appData.pages.current.url = new URL(appData.pages.current.url);
  if(appData.pages.current.template==='collection'){
    createPaginationControls();
  }
  disableAndClose();
}

const disableLinks = () => {
  const links = document.querySelectorAll('a');
  links.forEach((link) => {
    const url = new URL(link.href);
    const windowUrl = new URL(window.location);
    if (url.hostname === windowUrl.hostname) {
      link.removeEventListener('click', handleLinkClick); // remove existing listener if any
      link.addEventListener('click', handleLinkClick);
    }
  });
};

const handleLinkClick = (event) => {
  event.preventDefault();
  handlerNavigate(event.currentTarget);
};

const disableSearch = () => {
  const searchBars = document.querySelectorAll('.searchBar');
  searchBars.forEach(searchBar => {
    searchBar.removeEventListener('submit', handleSearchSubmit); // remove existing listener if any
    searchBar.addEventListener('submit', handleSearchSubmit);
  });
};

const handleSearchSubmit = (event) => {
  event.preventDefault();
  const searchQuery = event.target.querySelector('input[name="q"]').value;
  const formAction = event.target.getAttribute('action');
  handleSearch(searchQuery, formAction);
};

const disableAndClose = () => {
  closeMenus();
  disableSearch();
  disableLinks();
}

appInit();
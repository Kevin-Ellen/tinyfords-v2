
const updatePaginationHeading = (pageNumber = 1) => {
  const heading = document.querySelector('h1');
  if(pageNumber>1){
    heading.innerHTML = `${appData.pages.current.h1} <span>- Page: ${pageNumber}</span>`;
  }else{
    heading.innerHTML = appData.pages.current.h1;
  }
}

const updateSearchHeading = (searchTerm = appData.search.searchTerm) => {
  const heading = document.querySelector('.fragmentCarsGrid').previousElementSibling;
  if (heading && heading.tagName.toLowerCase() === 'h2') {
    if(searchTerm){
      heading.innerHTML = 'Search results';
    }else{
      heading.innerHTML = 'Results';
    }
  }
}
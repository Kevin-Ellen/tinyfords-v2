const createOrGetPaginationContainer = () => {
  let parentElem = document.querySelector('.fragmentPaginationControls');

  if (!parentElem) {
      parentElem = document.createElement('nav');
      parentElem.className = 'fragmentPaginationControls';
      parentElem.setAttribute('aria-label', 'Pagination');
      document.querySelector('main').appendChild(parentElem);
  }

  // Either get the existing <ul> or create a new one
  let ulElem = parentElem.querySelector('ul');
  if (ulElem) {
      // Clear out the <ul> if it exists
      ulElem.innerHTML = '';
  } else {
      ulElem = document.createElement('ul');
      parentElem.appendChild(ulElem);
  }

  return ulElem; // This will now return the <ul> inside 'fragmentPaginationControls' div.
}

const createPaginationControls = () => {
  const { pagination } = appData;
  const paginationControls = createOrGetPaginationContainer();
  const fragment = document.createDocumentFragment();

  clearPaginationControls(paginationControls);

  if(pagination.total>1){

    const previousLink = createPageURL(pagination.previous.page || pagination.page);
    const nextLink = createPageURL(pagination.next.page || pagination.page);

    const previousButton = createPaginationButton('« Previous page', previousLink, false, pagination.page === 1);
    const nextButton = createPaginationButton('Next page »', nextLink, false, pagination.page === pagination.total);

    fragment.appendChild(previousButton);

    for (let i = 1; i <= pagination.total; i++) {
      fragment.appendChild(createPageLink(i, pagination.page));
    }

    fragment.appendChild(nextButton);

    paginationControls.appendChild(fragment);
  }
};


const clearPaginationControls = (paginationControls) => {
  if(paginationControls){
    while (paginationControls.firstChild) {
      paginationControls.removeChild(paginationControls.firstChild);
    }
  }
};

const createPageURL = (page = null) => {
  const link = new URL(appData.pages.current.url);
  if (page === 1 || !page) {
    link.searchParams.delete('page');
  } else {
    link.searchParams.set('page', page);
  }
  return link;
};

const createPaginationButton = (text, link, isActive = false, isDisabled = false) => {
  const li = document.createElement('li');
  const a = document.createElement('a');
  
  a.href = link;
  a.innerHTML = text;
  a.setAttribute('aria-label', text);
  
  if (isActive) {
    li.className = 'active';
    li.setAttribute('aria-disabled', true);
    a.setAttribute('aria-current', 'page');
  } else if (isDisabled) {
    li.setAttribute('aria-disabled', true);
    li.className = 'disabled';
  }
  
  li.appendChild(a);
  return li;
};

const createPageLink = (pageNumber, currentPage) => {
  const li = document.createElement('li');
  const a = document.createElement('a');

  const link = createPageURL(pageNumber);

  if (pageNumber === currentPage) {
    li.setAttribute('aria-disabled', true);
    li.className = 'active';
    a.setAttribute('aria-current', 'page');
  }

  a.href = link.toString();
  a.innerHTML = pageNumber.toString();

  li.appendChild(a);
  return li;
};
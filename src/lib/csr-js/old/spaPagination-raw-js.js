const constructPaginationControls = (currentPage, totalPages, slug) => {
  let html = `<nav aria-label="Pagination" class="fragmentPaginationControls"><ul>`;

  if(currentPage > 1) {
    html += `<li><a href="${getPageUrl(currentPage - 1, slug)}" aria-label="Previous page">&laquo; Prev</a></li>`;
  }
  
  for(let i = 1; i <= totalPages; i++) {
    if(i === currentPage) {
      html += `<li class="active" aria-current="page">${i}</li>`;
    } else {
      html += `<li><a href="${getPageUrl(i, slug)}">${i}</a></li>`;
    }
  }

  if(currentPage < totalPages) {
    html += `<li><a href="${getPageUrl(currentPage + 1, slug)}" aria-label="Next page">Next &raquo;</a></li>`;
  }

  html += `</ul></nav>`;
  return html;
}

const getPageUrl = (pageNumber, slug) => {
  return pageNumber === 1 ? slug : `${slug}?page=${pageNumber}`;
}

const getPaginatedResults = (allResults, currentPage) => {
  const start = (currentPage - 1) * ITEMS_PER_PAGE;
  const end = start + ITEMS_PER_PAGE;
  return allResults.slice(start, end);
}

const updateHeading = (currentPage, totalPages) => {
  const heading = document.querySelector('.fragmentContent h1');
  heading.textContent = `Page ${currentPage} of ${totalPages}`;
}

addSearchTermToURL = (searchTerm) => {
  const currentURL = new URL(window.location.href);
  currentURL.searchParams.set('q', searchTerm);
  history.pushState({ url: currentURL.toString() }, '', currentURL.toString());
};
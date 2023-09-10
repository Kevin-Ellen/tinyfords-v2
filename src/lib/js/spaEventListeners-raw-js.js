// Function to attach link click handlers
const initialiseLinkHandlers = () => {
  // Get all internal links on the page
  const links = document.querySelectorAll('a[href^="/"]');
  links.forEach(link => {
    // Remove any previous event listeners
    link.removeEventListener('click', linkClickHandler);
    // Attach the link click handler
    link.addEventListener('click', linkClickHandler);
  });
};

// Function to attach search submit handlers
const initialiseSearchHandlers = () => {
  // Attach the event listener to all search forms
  document.querySelectorAll('.searchBar').forEach(form => {
    form.removeEventListener('submit', handleSearchSubmit); // Remove any previous event listeners
    form.addEventListener('submit', handleSearchSubmit);
  });
};

const initialiseSPA = () => {
  initialiseLinkHandlers();
  initialiseSearchHandlers();
  console.log('SPA initialised');
};

document.addEventListener('DOMContentLoaded', () => {
  fetchCarsData();
  initialiseSPA();
});

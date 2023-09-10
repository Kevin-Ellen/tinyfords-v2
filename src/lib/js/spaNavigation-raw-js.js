// This function is responsible for fetching the content-only page from the server.
const fetchPage = async (url) => {
  try{
    // Fetch the content-only version of the page with the custom header
    const response = await fetch(`/content-only${url}`, {
      headers: {
        'x-tf-spa': 'true'
      }
    });

    // Check if the response has the expected header
    if (!response.headers.get('x-tf-spa')) {
      throw new Error('Expected header not found!');
    }

    // Check for a successful response
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.text();

    // Replace the content of the <pageContent> id with the fetched data
    document.querySelector('#pageContent').innerHTML = data;
    
    // Scroll to the top of the page
    window.scrollTo(0, 0);

    // Call the functions to re-initialize event listeners.
    initialiseLinkHandlers();  // This is from spaEventListeners
    initialiseSPA();  // Original function to print the console message

  } catch(error){
    console.error('Fetch error: ' + error.message);
  }
}

const linkClickHandler = async (event) => {
  event.preventDefault();
  const href = event.target.getAttribute('href');

  // Push the new URL to the browser history and update the address bar
  history.pushState({ url: href }, '', href);
  await fetchPage(href);

  const siteNavBox = document.querySelector('#siteNavBox');
  if (siteNavBox) {
    siteNavBox.checked = false;
  }
  const siteSearch = document.querySelector('#siteSearch');
  if (siteSearch) {
    siteSearch.checked = false;
  }
}

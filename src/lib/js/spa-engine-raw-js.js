// This function is responsible for fetching the content-only page from the server.
const fetchPage = async (url) => {
  // Fetch the content-only version of the page with the custom header
  return fetch(`/content-only${url}`, {
      headers: {
        'x-tf-spa': 'true'
      }
    })
    .then(response => {
      // Log the headers (for debugging purposes; you can remove this later)
      console.log(Array.from(response.headers.entries()));

      // Check if the response has the expected header
      if (!response.headers.get('x-tf-spa')) {
        throw new Error('Expected header not found!');
      }

      // Check for a successful response
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Return the text content of the response
      return response.text();
    })
    .then(data => {
      // Replace the content of the <main> element with the fetched data
      document.querySelector('#pageContent').innerHTML = data;
      // Scroll to the top of the page
      window.scrollTo(0, 0);
    })
    .catch(error => {
      // Log any errors that occur
      console.error('Fetch error: ' + error.message);
    });
}

// This function initializes the SPA behavior
const initializeSPA = () => {
  // Get all internal links on the page
  const links = document.querySelectorAll('a[href^="/"]');

  // Add click event listeners to each link
  links.forEach(link => {
    link.addEventListener('click', function(event) {
      // Prevent the default link behavior
      event.preventDefault();

      // Extract the href value from the clicked link
      const href = this.getAttribute('href');

      // Fetch the corresponding content-only page and update the <main> content
      fetchPage(href);
    });
  });

  console.log('SPA initialized');
}

// Wait for the DOM to be fully loaded before initializing the SPA behavior
document.addEventListener('DOMContentLoaded', initializeSPA);

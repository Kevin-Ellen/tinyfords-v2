const fetchPage = async (url) => {
  try {
    const response = await fetch(`/content-only${url}`, {
      headers: { 'x-tf-spa': 'true' }
    });
    if (!response.headers.get('x-tf-spa')) {
      throw new Error('Expected header not found!');
    }
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.text();
    return data;
  } catch(error) {
    console.error('Fetch error:', error.message);
  }
};

export default fetchPage;

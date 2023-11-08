

const VERSION = 0.1;

self.addEventListener('install', function(event) {
  console.log('SW version: '+ VERSION);
  event.waitUntil(
    Promise.all(
      endpoints.map(endpoint =>
        fetch(endpoint)
          .then(response => {
            if (!response.ok) {
              throw new Error('Request for ' + endpoint + ' failed with status ' + response.status);
            }
            return response;
          })
          .catch(error => {
            console.error('Fetch error for ' + endpoint + ':', error);
            return Promise.reject(error);
          })
      )
    )
      .then(responses => Promise.all(responses.map(res => res.json())))
      .then(assets => [].concat(...assets))
      .then(urls => {
        console.log('URLs to be cached:');
        return urls.reduce((promise, url) => {
          return promise.then(() => {
            console.log(url);
            return caches.open('cache-v'+VERSION)
              .then(cache => cache.add(url));
          });
        }, Promise.resolve());
      })
      .catch(error => {
        console.error('Cache.addAll error:', error);
      })
  );
});
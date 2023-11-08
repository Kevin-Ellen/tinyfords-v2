

const VERSION = 0.1;

self.addEventListener('install', function(event) {
  console.log('SW version: ' + VERSION);
  event.waitUntil(
    caches.open('cache-v' + VERSION)
      .then(cache => {
        // Cache non-image URLs
        const nonImageUrlsToCache = urlsToCache.filter(url => !url.endsWith('.jpg')); // Add any other extensions as needed
        
        // Cache images
        const imageUrlsToCache = imagesToCache.filter(url => url.endsWith('.jpg')); // Change the extension as needed
        
        return Promise.all([
          // Cache non-image URLs
          Promise.all(
            nonImageUrlsToCache.map(url => {
              return cache.match(url)
                .then(response => {
                  if (!response) {
                    return fetch(url)
                      .then(response => {
                        if (!response.ok) {
                          throw new Error('Request for ' + url + ' failed with status ' + response.status);
                        }
                        return cache.put(url, response); // Cache the non-image
                      })
                      .catch(error => {
                        console.error('Fetch error for ' + url + ':', error);
                        throw error;
                      });
                  }
                  return; // Non-image URL is already in the cache, no need to cache it again
                });
            })
          ),

          // Cache images
          Promise.all(
            imageUrlsToCache.map(url => {
              return cache.match(url)
                .then(response => {
                  if (!response) {
                    return fetch(url)
                      .then(response => {
                        if (!response.ok) {
                          throw new Error('Request for ' + url + ' failed with status ' + response.status);
                        }
                        return cache.put(url, response); // Cache the image
                      })
                      .catch(error => {
                        console.error('Fetch error for ' + url + ':', error);
                        throw error;
                      });
                  }
                  return; // Image URL is already in the cache, no need to cache it again
                });
            })
          ),
        ]);
      })
      .then(() => {
        console.log('All assets have been cached.');
      })
      .catch(error => {
        console.error('Cache.open error:', error);
      })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
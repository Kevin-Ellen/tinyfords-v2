/**
 * manifest.js
 * 
 * This module generates a manifest.json file for the application.
 * The manifest.json file is used for the PWA
 */

/**
 * Generate and return a Response object containing the content of robots.txt.
 * 
 * @returns {Response} - A Response object with the content of manifest.json.
 */
const apiManifest = () => {
  return new Response(content, {status: 200, headers:{'content-type':'application/json'}});
}
export default apiManifest;

/**
 * Generate the content for the manifest.json file.
 * 
 * @returns {string} - The content of the manifest.json file.
 */
const content = `{
  "name": "Tiny Fords",
  "short_name": "TinyFords",
  "theme_color": "rgb(0, 84, 144)",
  "background_color": "rgb(0, 84, 144)",
  "display": "standalone",
  "start_url": "/",
  "id": "/",
  "shortcuts": [
    {
      "name": "Hot Wheels",
      "url": "/hotwheels",
      "icons": [
        {
          "src": "/images/icons/hot-wheels-96x96.png",
          "sizes": "96x96",
          "type": "image/png"
        }
      ]
    },
    {
      "name": "Matchbox",
      "url": "/matchbox",
      "icons": [
        {
          "src": "/images/icons/matchbox-96x96.png",
          "sizes": "96x96"
        }
      ]
    },
    {
      "name": "Other",
      "url": "/other",
      "icons": [
        {
          "src": "/images/icons/all-96x96.png",
          "sizes": "96x96"
        }
      ]
    },
    {
      "name": "All",
      "url": "/all",
      "icons": [
        {
          "src": "/images/icons/all-96x96.png",
          "sizes": "96x96"
        }
      ]
    }
  ],
  "icons": [
    {
      "src": "/images/icons/android-icon-36x36.png",
      "sizes": "36x36",
      "type": "image/png"
    },
    {
      "src": "/images/icons/android-icon-48x48.png",
      "sizes": "48x48",
      "type": "image/png"
    },
    {
      "src": "/images/icons/android-icon-72x72.png",
      "sizes": "72x72",
      "type": "image/png"
    },
    {
      "src": "/images/icons/android-icon-96x96.png",
      "sizes": "96x96",
      "type": "image/png"
    },
    {
      "src": "/images/icons/android-icon-144x144.png",
      "sizes": "144x144",
      "type": "image/png"
    },
    {
      "src": "/images/icons/android-icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/images/icons/icon-512x512.png",
      "sizes": "512x512",
      "type": "image/png"
    },
    {
      "src": "/images/icons/maskable-icon-48x48.png",
      "sizes": "48x48",
      "type": "image/png",
      "purpose": "maskable"
    },
    {
      "src": "/images/icons/maskable-icon-72x72.png",
      "sizes": "72x72",
      "type": "image/png",
      "purpose": "maskable"
    },
    {
      "src": "/images/icons/maskable-icon-96x96.png",
      "sizes": "96x96",
      "type": "image/png",
      "purpose": "maskable"
    },
    {
      "src": "/images/icons/maskable-icon-128x128.png",
      "sizes": "128x128",
      "type": "image/png",
      "purpose": "maskable"
    },
    {
      "src": "/images/icons/maskable-icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "maskable"
    },
    {
      "src": "/images/icons/maskable-icon-384x384.png",
      "sizes": "384x384",
      "type": "image/png",
      "purpose": "maskable"
    },
    {
      "src": "/images/icons/maskable-icon-512x512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "maskable"
    },
    {
      "src": "/images/icons/maskable-icon-1024x1024.png",
      "sizes": "1024x1024",
      "type": "image/png",
      "purpose": "maskable"
    }
  ]
}`;

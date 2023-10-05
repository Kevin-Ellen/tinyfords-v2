import pwaSw from '../csr-js/pwa/entry-pwa.js';
import { appData, apiAppData } from '../services/appData';
import { getCarsByCategoryId} from '../utils/dataCars.js';
import { ITEMS_PER_PAGE } from '../services/init.js';
import { createImgPath } from '../fragments/gridCars.js';

const apiSw = async (url) => {
  const cacheData = await buildPageCache(url);
  const carImageUrls = buildCarImageCache();
  const pageImages = extractImageUrls(appData.pages.all);
  const allUrlsToCache = [...cacheData, ...carImageUrls, ...pageImages];
  const uniqueUrlsToCache = [...new Set(allUrlsToCache)];

  const urlsToCacheString = `const urlsToCache = ${JSON.stringify(uniqueUrlsToCache)};`;

  const swCode = [
    urlsToCacheString,
    init,
  ].join('');

  return new Response(swCode, {status: 200, headers:{'content-type':'application/javascript'}});
}
export default apiSw;

const buildPageCache = async (url) => {
  await apiAppData();
  const data = appData.pages.all;
  url = new URL(url);
  
  const slugsPromises = data
    .filter(page => page.visibility && page.visibility.active === true)
    .flatMap(page => {  // Use flatMap to flatten the returned arrays
      if (page.template === 'collection') {
        const carCount = getCarsByCategoryId(page.id).length || appData.cars.all.length;
        return generatePagedSlugs(page.slug, carCount, ITEMS_PER_PAGE.collection);
      } else {
        return [page.slug];  // For non-collection pages, wrap the slug in an array
      }
    });

  const slugs = slugsPromises;

  return slugs;
}

const init = pwaSw;

const generatePagedSlugs = (slug, carCount, itemsPerPage) => {
  const totalPages = Math.ceil(carCount / itemsPerPage);
  const slugs = [];

  for (let i = 1; i <= totalPages; i++) {
    if (i === 1) {
      slugs.push(`${slug}`);
    } else {
      slugs.push(`${slug}?page=${i}`);
    }
  }

  return slugs;
}

const buildCarImageCache = () => {
  return appData.cars.all.map(car => createImgPath(car));
}

const extractImageUrls = (obj, urls = []) => {
  // Base case: if the object is not an object or array, return
  if (typeof obj !== 'object' || obj === null) {
    return urls;
  }

  // Check each property of the object
  for (let key in obj) {
    if (typeof obj[key] === 'string' && obj[key].endsWith('.jpg')) {
      urls.push(obj[key]);
    } else if (typeof obj[key] === 'object') {
      extractImageUrls(obj[key], urls);
    }
  }

  return urls;
}
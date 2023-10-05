import { servicesGithubDataCarsAll, servicesGithubDataPageAll } from '../services/github';
import { ITEMS_PER_PAGE } from './init';


import { getPageBySlug } from '../utils/dataPages';
import { getCarsByCategoryId, searchCars, utilDataCarsLatest } from '../utils/dataCars';

export const appData = {
  pages: {
    all: [],
    current: {},
  },
  cars: {
    all: [],
    current: [],
    overview: {
      ot: 0,
      hw: 0,
      mb: 0,
      all: 0,
    }
  },
  search: {
    searchTerm: null,
    success: false,
    action: null,
  },
  options: {
    noindex: null,
  },
  breadcrumbs: [],
  pagination:{
    page: null,
    start: null,
    end: null,
    total: null,
    slug: null,
    previous:{
      has: null,
      page: null,
    },
    next:{
      has: null,
      page: null,
    }
  }
}

export const apiAppData = async () => {
  try{
    appData.cars.all = await servicesGithubDataCarsAll();
    appData.pages.all = await servicesGithubDataPageAll();
  }catch(error){
    console.error('Error initializing appData: ', error);
  }
}

export const initAppData = async (url) => {
  try{
    appData.pages.all = await servicesGithubDataPageAll();
    const allCars = await servicesGithubDataCarsAll();

    appData.cars.all = utilDataCarsLatest(allCars);

    setCurrentPage(url);
    setBreadcrumbs();
    setNoindex();
    setCurrentCanonical();
    setCarsOverview();

    if(appData.pages.current.url.searchParams.get('q')){
      appData.search.searchTerm = appData.pages.current.url.searchParams.get('q');
      appData.search.action = 'search';
      appData.search.success = true;
    }

    if(appData.pages.current.hasCars){
      setCurrentCars(appData.pages.current.id);
      if(appData.search.action==='search' && appData.search.success){
        appData.cars.current = searchCars(appData.search.searchTerm);
      }
    }
    if(appData.pages.current.template==='collection'){
      setPagination(appData.pages.current.url.searchParams.get('page'));
    }

    if(appData.pages.current.template==='home'){
      appData.cars.current = utilDataCarsLatest(allCars, ITEMS_PER_PAGE.homepage);
    }


  }catch(error){
    console.error('Error initializing appData: ', error);
  }
}

export const setPageForApi = (url) => {
  setCurrentPage(url);
  setCurrentCars(appData.pages.current.id);
  setPagination(1);
}

const setCurrentPage = (url) => {
  try{
    appData.pages.current = getPageBySlug(url.pathname);
    appData.pages.current.url = url;
    return true;
  }catch(error){
    console.log('[Error] request.js: setCurrentPage', error);
    return false;
  }
}

const setCurrentCanonical = () => {
  const { pages: { current } } = appData;
  appData.pages.current.canonical = false;
  if(current.status === 200 && current.template !== 'offline') {
    appData.pages.current.canonical = `${current.url.protocol}//${current.url.host}${current.slug}`;

    if(current.template === 'collection' && current.url.searchParams.get('page') && current.url.searchParams.get('page') != 1) {
      appData.pages.current.canonical += `?page=${current.url.searchParams.get('page')}`;
    }
  }
}

const setCurrentCars = (id) => {
  try{
    appData.cars.current = (id==='home' || id=== 'all') ?  appData.cars.all : getCarsByCategoryId(id);
    return true;
  }catch(error){
    console.log('[Error] request.js: setCurrentCars', error);
    return false;
  }
}

const setPagination = (pageNumber = 1) => {
  const carsCount = appData.cars.current.length;
  pageNumber = parseInt(pageNumber);

  appData.pagination.page = pageNumber;
  appData.pagination.start = (pageNumber - 1) * ITEMS_PER_PAGE.collection;
  appData.pagination.end = appData.pagination.start + ITEMS_PER_PAGE.collection;
  appData.pagination.total = Math.ceil(carsCount / ITEMS_PER_PAGE.collection);
  appData.pagination.slug = appData.pages.current.url.pathname;
  appData.pagination.previous.has = pageNumber > 1;
  appData.pagination.previous.page = pageNumber > 1 ? pageNumber - 1 : null;
  appData.pagination.next.has = appData.pagination.end < carsCount;
  appData.pagination.next.page = appData.pagination.end < carsCount ? pageNumber + 1 : null;
}

/**
 * Generate the breadcrumb trail for the current page.
 * 
 * @param {Object} data - The data containing current page and all pages.
 * 
 */
const setBreadcrumbs = (data = appData.pages.all) => {
  appData.breadcrumbs = appData.pages.current.breadcrumbList.map((breadcrumbName, index) => {
    const breadcrumbPage = data.find(page => page.name === breadcrumbName);
    if (breadcrumbPage) {
      return {
        name: breadcrumbName,
        slug: breadcrumbPage.slug,
        position: index + 1
      };
    } else {
      return null;
    }
  }).filter(item => item);
};


const setNoindex = (data = appData.pages.current) => {
  // Default to false at the beginning of the function
  appData.options.noindex = false; 
  
  // Check if noindex is true in data and set appData.options.noindex accordingly
  if (data.visibility.robots.noindex) {
      appData.options.noindex = true; 
      return true;
  }
  
  // Iterate over searchParams and set appData.options.noindex to true 
  // under certain conditions
  for (const [key, value] of data.url.searchParams.entries()) {
      if (key !== 'page' || isNaN(value) || parseInt(value, 10) != value) {
          appData.options.noindex = true; 
          return true;
      }
  }
  
  // If none of the above conditions are met, return false
  return false;
}

const setCarsOverview = () => {
  appData.cars.overview.hw = 0;
  appData.cars.overview.mb = 0;
  appData.cars.overview.ot = 0;
  appData.cars.all.forEach((car) => {
    appData.cars.overview[car.categoryDetails.id] ++;
  });
  appData.cars.overview.all = appData.cars.overview.hw + appData.cars.overview.mb + appData.cars.overview.ot;
}
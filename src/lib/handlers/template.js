// src > lib > utils > template.js

import {servicesGithubDataPageAll} from '../services/github';

import documentHead from '../construction/documentHead';
import documentEnd from '../construction/documentEnd';

import pageHead from '../construction/pageHead';
import pageBreadcrumbs from '../construction/pageBreadcrumbs';
import pageFooter from '../construction/pageFooter';

import templateHome from '../templates/home';


const handlerTemplate = async (url) => {
  const dataPageAll = await servicesGithubDataPageAll();

  switch(url.pathname){
    case '/':
      const dataPageCurrent = findDataPageCurrent(url.pathname,dataPageAll);
      dataPageCurrent.url = url;
      if (!dataPageCurrent) {
        return new Response('Not Found',{status:404});
      }

      dataPageCurrent.breadcrumbList = generateBreadcrumbs(dataPageCurrent, dataPageAll);

      return new Response(
        await createPage(dataPageCurrent, dataPageAll),
        {
          status: 200,
          headers: {
            'Content-Type': 'text/html'
          }
        }
      );
  }
}

export default handlerTemplate;

const findDataPageCurrent = (slug,dataPageAll) => {
  return dataPageAll.find(page => page.slug === slug) || false;
}

const generateBreadcrumbs = (dataPageCurrent, dataPageAll) => {
  // Iterate through each breadcrumb name in the breadcrumbList
  return dataPageCurrent.breadcrumbList.map((breadcrumbName, index) => {
    // Find the page that matches the breadcrumb name
    const breadcrumbPage = dataPageAll.find(page => page.name === breadcrumbName);

    // If a matching page is found, return a breadcrumb object, else return null
    if (breadcrumbPage) {
      return {
        name: breadcrumbName,
        slug: breadcrumbPage.slug,
        position: index + 1
      };
    } else {
      return null;
    }
  }).filter(item => item); // This filter removes any null values
};

const createPage = async (dataPageCurrent, dataPageAll) => {

  const templates = {
    home: templateHome,
  }

  const sections = [
    documentHead,
    pageHead,
    pageBreadcrumbs,
    templates[dataPageCurrent.template],
    pageFooter,
    documentEnd
  ];

  const resolvedSections = await Promise.all(
    sections.map(section => section(dataPageCurrent, dataPageAll))
  )

  return resolvedSections.join('');
}

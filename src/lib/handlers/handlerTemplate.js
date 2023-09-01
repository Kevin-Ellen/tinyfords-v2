// src > lib > utils > handlerTemplate.js

import {utilGitHubGetAllPagesData} from '../utils/utilsGitHub';

import documentHead from '../construction/documentHead';
import documentEnd from '../construction/documentEnd';

import pageHead from '../construction/pageHead';
import pageBreadcrumbs from '../construction/pageBreadcrumbs';
import pageFooter from '../construction/pageFooter';

import templateHome from '../templates/templateHome';


const handlerTemplate = async (url) => {
  const allPageData = await utilGitHubGetAllPagesData();

  switch(url.pathname){
    case '/':
      pageData = findPageData(url.pathname,allPageData);
      pageData.url = url;
      if (!pageData) {
        return new Response('Not Found',{status:404});
      }

      pageData.breadcrumbList = generateBreadcrumbs(pageData, allPageData);

      return new Response(
        await createPage(pageData, allPageData),
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

const findPageData = (slug,data) => {
  return data.find(page => page.slug === slug) || false;
}

const generateBreadcrumbs = (pageData, allPageData) => {
  // Iterate through each breadcrumb name in the breadcrumbList
  return pageData.breadcrumbList.map((breadcrumbName, index) => {
    // Find the page that matches the breadcrumb name
    const breadcrumbPage = allPageData.find(page => page.name === breadcrumbName);

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

const createPage = async (pageData, allPageData) => {

  const templates = {
    home: templateHome,
  }

  const sections = [
    documentHead,
    pageHead,
    pageBreadcrumbs,
    templates[pageData.template],
    pageFooter,
    documentEnd
  ];

  const resolvedSections = await Promise.all(
    sections.map(section => section(pageData, allPageData))
  );

  return resolvedSections.join('');
}

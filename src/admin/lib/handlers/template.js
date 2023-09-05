// src > admin > lib > handlers > template.js - Handler for the admin template

import documentHead from '../construction/documentHead';
import documentEnd from '../construction/documentEnd';

import pageHead from '../construction/pageHead';
import pageBreadcrumbs from '../construction/pageBreadcrumbs';
import pageAFooter from '../construction/pageFooter';


import templateHome from '../templates/home';
import templateAdminCarAdd from '../templates/carAdd';
import templateAdminCarSearch from '../templates/carSearch';


const handlerTemplate = async (request, options = {}) => {
  const url = new URL(request.url);

  const pageNames = {
    '/admin': 'home',
    '/admin/add-car': 'carAdd',
    '/admin/search-car': 'carSearch',
  }

  switch(url.pathname){
    case '/admin':
    case '/admin/add-car':
    case '/admin/search-car':

      return new Response(
        await createPage(pageNames[url.pathname], request, options),
        {
          status:200,
          headers: {
            'Content-Type': 'text/html',
            'x-robots-tag': 'noindex'
          }
        }
      );
  }

  return new Response('template Handler');
}

export default handlerTemplate;

const createPage = async (templateName,request, options = {}) => {
  const {
    isAuthenticated = false,
    feedback = {
      success: null,
      message: null,
    },
    data = null
  } = options;

  const templates = {
    home: templateHome,
    carAdd: templateAdminCarAdd,
    carSearch: templateAdminCarSearch,
  }

  const sections = [
    documentHead,
    pageHead,
    pageBreadcrumbs,
    templates[templateName],
    pageAFooter,
    documentEnd,
  ];

  const resolvedSections = await Promise.all(
    sections.map(async section => {
      const result = await section(request, options);
      return Array.isArray(result) ? result.join('') : result;
    })
  );

  return resolvedSections.join('');
}
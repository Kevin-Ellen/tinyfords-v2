// src > admin > lib > handlers > template.js - Handler for the admin template

import documentHead from '../construction/documentHead';
import documentEnd from '../construction/documentEnd';

import pageHead from '../construction/pageHead';
import pageBreadcrumbs from '../construction/pageBreadcrumbs';
import pageAFooter from '../construction/pageFooter';



import templateHome from '../templates/home';
import templateCarAdd from '../templates/carAdd';


const handlerTemplate = async (request, options = {}) => {
  const url = new URL(request.url);

  const pageNames = {
    '/admin': 'home',
    '/admin/add-car': 'addCar',
  }

  switch(url.pathname){
    case '/admin':
    case '/admin/add-car':

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
    addCar: templateCarAdd,
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
// src > admin > lib > handlers > template.js - Handler for the admin template

import documentHead from '../construction/documentHead';
import documentEnd from '../construction/documentEnd';

import pageHead from '../construction/pageHead';
import pageBreadcrumbs from '../construction/pageBreadcrumbs';
import pageAFooter from '../construction/pageFooter';



import templateHome from '../templates/home';
import templateCarAdd from '../templates/carAdd';


const handlerTemplate = (request, isAuthenticated=false) => {
  const url = new URL(request.url);

  const pageNames = {
    '/admin': 'home',
    '/admin/add-car': 'addCar',
  }

  switch(url.pathname){
    case '/admin':
    case '/admin/add-car':
      return new Response(
        createPage(pageNames[url.pathname], request, isAuthenticated),
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

const createPage = (templateName,request, isAuthenticated=false) => {

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

  return sections.map(section => section(request,isAuthenticated));
}
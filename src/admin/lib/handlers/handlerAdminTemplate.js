// src > admin > lib > handlers > handlerAdminTemplate.js - Handler for the admin template

import documentAdminHead from '../construction/documentAdminHead';
import documentAdminEnd from '../construction/documentAdminEnd';

import pageAdminHead from '../construction/pageAdminHead';
import pageAdminBreadcrumbs from '../construction/pageAdminBreadcrumbs';
import pageAdminFooter from '../construction/pageAdminFooter';



import templateAdminHome from '../templates/templateAdminHome';



const handlerAdminTemplate = (request) => {
  const url = new URL(request.url);

  switch(url.pathname){
    case '/admin':
      return new Response(
        createPage('home', request),
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

export default handlerAdminTemplate;

const createPage = (templateName,request) => {

  const templates = {
    home: templateAdminHome,
  }

  const sections = [
    documentAdminHead,
    pageAdminHead,
    pageAdminBreadcrumbs,
    templates[templateName],
    pageAdminFooter,
    documentAdminEnd
  ];

  return sections.map(section => section(request));
}
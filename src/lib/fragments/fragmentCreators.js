import { assignClassName, assembleHTML } from '../utils/helpersRenders';
import { appData } from '../services/appData';

export const createIntroTemplate = (obj) => {

  const container = {
    element: obj.container?.element || 'section',
    className: assignClassName(obj.container?.className), 
  }

  const heading = {
    element: obj.heading?.element || 'h2',
    className: assignClassName(obj.heading?.className), 
    content: obj.heading?.content || false,
  }

  const html = [];

  html.push(`<${container.element} ${container.className}>`);
  if(heading.content){
    html.push(`<${heading.element} ${heading.className}>${heading.content}</${heading.element}>`);
  }
  if(obj.entries){
    obj.entries.forEach((entry) => {
      switch(entry.type){
        case 'text': html.push(generateTextEntry(entry));
      }
    });
  }
  html.push(`</${container.element}>`);

  return assembleHTML(html);
}

export const generateTextEntry = (obj) => {

  const container = {
    element: obj.element || 'p',
    className: assignClassName(obj.attributes?.className), 
  }

  const html = [];

  if(obj.heading && obj.heading.content) {
    const heading = {
      element: obj.heading?.element || 'h2',
      className: assignClassName(obj.heading?.className), 
      content: obj.heading?.content || false,
    }

    html.push(`<${heading.element} ${heading.className}>${heading.content}</${heading.element}>`);
  }

  if((appData.pages.current.template === 'collection') || (appData.pages.current.template === 'home')){
    const carCount = appData.pages.current.id ==='home' ? appData.cars.overview.all : appData.cars.overview[appData.pages.current.id];
    html.push(`<${container.element} ${container.className}>${obj.content.replace('<strong id=\"countCollection\"></strong>',`<strong id=\"countCollection\">${carCount}</strong>`)}</${container.element}>`);
  }else{
    html.push(`<${container.element} ${container.className}>${obj.content}</${container.element}>`);
  }

  return assembleHTML(html);
};

export const generateListEntry = (obj) => {

  const container = {
    element: obj.container?.element || 'section',
    className: assignClassName(obj.container?.className), 
  }
  const heading = {
    element: obj.heading?.element || 'h3',
    className: assignClassName(obj.heading?.className), 
    content: obj.heading?.content || false,
  }

  const list = {
    element: obj.element,
    className: assignClassName(obj.attributes?.className), 
  }

  const html = [];
  html.push(`<${container.element} ${container.className}>`);
  if(heading.content){
    html.push(`<${heading.element} ${heading.className}>${heading.content}</${heading.element}>`);
  }

  html.push(`<${list.element} ${list.className}>`);
  obj.content.forEach((entry) => {
    html.push(`<li>${entry}</li>`);
  });
  html.push(`</${list.element}>`);

  html.push(`</${container.element}>`);
  return assembleHTML(html);
}
import { generateTextEntry, generateListEntry } from './fragmentCreators';
import { assembleHTML, assignClassName } from '../utils/helpersRenders';

export const generateAsideImageSection = (section) => {
  const container = {
    element: section.container?.element || 'div',
    className: assignClassName(section.container?.attributes?.className), 
  };
  
  const image = {
    element: section.image?.element || 'picture',
    className: assignClassName(section.image?.attributes?.className), 
    sources: section.image?.images || {},
  };
  
  const childrenWrapper = {
    element: section.children?.wrapper?.element || 'div',
    className: section.children?.wrapper?.attributes?.className || '',
  };
  
  let html = [];
  html.push(`<${container.element} ${container.className}>`);
  html.push(`<${image.element} ${image.className}>`);
  html.push(`<source srcset="${image.sources.desktop}" media="(min-width: 500px)">`);
  html.push(`<source srcset="${image.sources.mobile}" media="(min-width: 0px)">`);

  html.push(`<img src="${image.sources.mobile}" alt="" width="16" height="9">`);
  html.push(`</${image.element}>`);
  html.push(`<${childrenWrapper.element} class="${childrenWrapper.className}">`);
  
  if (section.children?.entries) {
    section.children.entries.forEach(entry => {
      if (entry.type === 'text') {
        html.push(generateTextEntry(entry));
      } else if (entry.type === 'list') {
        html.push(generateListEntry(entry));
      }
    });
  }
  
  html.push(`</${childrenWrapper.element}>`);
  html.push(`</${container.element}>`);
  
  return assembleHTML(html);
}

export const generateTwoColumnWithImagesSection = (obj) => {
  const container = {
    element: obj.container?.element || 'section',
    className: assignClassName(obj.container?.attributes?.className), 
  }

  const wrapper = {
    element: obj.wrapper?.element || 'div',
    className: assignClassName(obj.wrapper?.attributes?.className), 
  }

  const html = [];

  const introHeading = {
    element: obj.intro.heading?.element || 'h3',
    className: assignClassName(obj.intro?.heading?.className), 
    content: obj.intro.heading.content || false,
  }
  
  html.push(`<${container.element} ${container.className}>`);
  if(introHeading.content){
    html.push(`<${introHeading.element} ${introHeading.className}>${introHeading.content}</${introHeading.element}>`);
  }
  html.push(generateTextEntry(obj.intro));
  html.push(`<${wrapper.element} ${wrapper.className}>`);
  

  // Image Column
  const imgSrc = obj.imageColumn?.image?.src || '';
  const imgAlt = obj.imageColumn?.image?.alt || '';
  html.push(`<img src="${imgSrc}" alt="${imgAlt}" width="1" height="1">`);
  html.push('<div>');

  // Content Column
  if (obj.contentColumn?.entries && Array.isArray(obj.contentColumn.entries)) {
    obj.contentColumn.entries.forEach(entry => {
      switch (entry.type) {
        case 'text':
          html.push(generateTextEntry(entry));
          break;
        case 'list':
          html.push(generateListEntry(entry));
          break;
        // Add cases for other entry types as needed
      }
    });
  }
  html.push('</div>');
  html.push(`</${wrapper.element}>`);
  html.push(`</${container.element}>`);
  return assembleHTML(html);
}
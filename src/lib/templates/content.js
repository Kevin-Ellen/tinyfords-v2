/**
 * content.js
 * 
 * This module provides the template for content pages.
 * Each content page may have different structure and information,
 * which are stored within /data/contentPages.js.
 */

import { appData } from '../services/appData';
import { assembleHTML, assignClassName } from '../utils/helpersRenders';
import { createIntroTemplate } from '../fragments/fragmentCreators';
import { generateAsideImageSection, generateTwoColumnWithImagesSection } from '../fragments/fragmentContentCreators';

 /**
 * Generate the HTML content for the collection page.
 * 
 * @param {Object} data - All the data (all pages & cars)
 * @returns {string} - The constructed template as an HTML string.
 */
 const templateContent = (data = appData.pages.current) => {

  const html = ['<main>'];

  const container = {
    element: data.content.container?.element || 'section',
    className: assignClassName(data.content.container?.className), 
  }

  html.push(`<${container.element} ${container.className}>`);
  html.push(`<h1>${data.h1}</h1>`);
  html.push(`<div class="contentLongFormContainer">`);


  if(data.content.intro){
    html.push(createIntroTemplate(data.content.intro));
  }

  if(data.content.sections){
    data.content.sections.forEach(section => {
      switch (section.type){
        case 'asideImage': html.push(generateAsideImageSection(section));break;
        case 'twoColumnWithImages': html.push(generateTwoColumnWithImagesSection(section));break;
      }
    });
  }

  html.push('</div>');

  // return generateHTMLFromSections(mergedObj);

  html.push(`</${container.element}>`);
  html.push(`</main>`);

  return assembleHTML(html);
};

export default templateContent;
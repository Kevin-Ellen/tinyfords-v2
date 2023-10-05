import fragmentSearchBar from '../fragments/searchBar';

export const generateHTMLFromSections = (sections, data={}) => {
  const html = [
    '<main>',
  ];
  html.push(sections.map(section => {
    const content = section.renderFn ? section.renderFn(section.content, data) : section.content;

    const {
      container: {
        element: containerElement = 'section',
        cssClass: containerCssClass = null
      } = {},
      heading: {
        element: headingElement = 'h2',
        content: headingContent = 'Results'
      } = {}
    } = section;

    const obj = {
      container: {
        element: containerElement,
        cssClass: containerCssClass ? `class="${containerCssClass}"` : '',
      },
      heading: {
        element: headingElement,
        content: headingContent,
      }
    };
    
    // Construct the section with heading and content
    return `
        <${obj.container.element} ${obj.container.cssClass}>
          <${obj.heading.element}>${obj.heading.content}</${obj.heading.element}>
          ${content}
        </${obj.container.element}>
    `;
  }).join(''));

  html.push('</main>');
  return html;
};

export const generateIntro = (data) => {
  return data.text.map((paragraph) => {
    if(!paragraph){return;}
    return `
      <p>${paragraph
        .replace('<strong id="countCollection"></strong>', `<strong id="countCollection">${data.carCount}</strong>`)
        .replace('<search></search>', fragmentSearchBar(data.url, data.options))
      }</p>`
  }).join('');
}
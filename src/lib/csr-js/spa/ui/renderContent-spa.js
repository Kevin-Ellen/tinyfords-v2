const renderContent = (data = appData.pages.current) => {
  const container = document.querySelector('main');
  
  // Clear previous content in the <main>
  while (container.firstChild) {
      container.removeChild(container.firstChild);
  }

  const containerElem = document.createElement(data.content.container?.element || 'section');
  containerElem.className = assignClassName(data.content.container?.className);
  
  const h1Elem = document.createElement('h1');
  h1Elem.innerHTML = data.h1;
  containerElem.appendChild(h1Elem);

  const contentLongFormContainer = document.createElement('div');
  contentLongFormContainer.className = 'contentLongFormContainer';

  if (data.content.intro) {
    contentLongFormContainer.appendChild(createIntroTemplate(data.content.intro));
  }

  if (data.content.sections) {
    data.content.sections.forEach(section => {
      let sectionElem;
      switch (section.type) {
        case 'asideImage':
          sectionElem = generateAsideImageSection(section);
          break;
        case 'twoColumnWithImages':
          sectionElem = generateTwoColumnWithImagesSection(section);
          break;
      }
      if (sectionElem) {
        contentLongFormContainer.appendChild(sectionElem);
      }
    });
  }

  containerElem.appendChild(contentLongFormContainer);
  
  const fragment = document.createDocumentFragment();
  fragment.appendChild(containerElem);
  
  container.appendChild(fragment);

  // return mainElem.outerHTML;
};

const generateAsideImageSection = (section) => {
  const fragment = document.createDocumentFragment();

  const containerElem = document.createElement(section.container?.element || 'div');
  containerElem.className = assignClassName(section.container?.attributes?.className);

  const imageElem = document.createElement(section.image?.element || 'picture');
  imageElem.className = assignClassName(section.image?.attributes?.className);

  const sourceDesktop = document.createElement('source');
  sourceDesktop.setAttribute('srcset', section.image?.images.desktop);
  sourceDesktop.setAttribute('media', '(min-width: 500px)');
  imageElem.appendChild(sourceDesktop);

  const sourceMobile = document.createElement('source');
  sourceMobile.setAttribute('srcset', section.image?.images.mobile);
  sourceMobile.setAttribute('media', '(min-width: 0px)');
  imageElem.appendChild(sourceMobile);

  const img = document.createElement('img');
  img.setAttribute('src', section.image?.images.mobile);
  img.setAttribute('alt', '');
  img.setAttribute('width', '16');
  img.setAttribute('height', '9');
  imageElem.appendChild(img);

  containerElem.appendChild(imageElem);

  const childrenWrapperElem = document.createElement(section.children?.wrapper?.element || 'div');
  childrenWrapperElem.className = section.children?.wrapper?.attributes?.className || '';
  containerElem.appendChild(childrenWrapperElem);

  if (section.children?.entries) {
    section.children.entries.forEach(entry => {
      let elem;
      if (entry.type === 'text') {
        elem = generateTextEntry(entry);
      } else if (entry.type === 'list') {
        elem = generateListEntry(entry);
      }
      if (elem) {
        childrenWrapperElem.appendChild(elem);
      }
    });
  }

  fragment.appendChild(containerElem);

  return fragment;
}

const generateTwoColumnWithImagesSection = (obj) => {
  const fragment = document.createDocumentFragment();

  const containerElem = document.createElement(obj.container?.element || 'section');
  containerElem.className = assignClassName(obj.container?.attributes?.className);

  if (obj.intro.heading?.content) {
    const introHeadingElem = document.createElement(obj.intro.heading?.element || 'h3');
    introHeadingElem.className = assignClassName(obj.intro?.heading?.className);
    introHeadingElem.innerHTML = obj.intro.heading.content;
    containerElem.appendChild(introHeadingElem);
  }

  const introElem = generateTextEntry(obj.intro);
  containerElem.appendChild(introElem);

  const wrapperElem = document.createElement(obj.wrapper?.element || 'div');
  wrapperElem.className = assignClassName(obj.wrapper?.attributes?.className);
  containerElem.appendChild(wrapperElem);

  // Image Column
  const imgElem = document.createElement('img');
  imgElem.setAttribute('src', obj.imageColumn?.image?.src || '');
  imgElem.setAttribute('alt', obj.imageColumn?.image?.alt || '');
  imgElem.setAttribute('width', '1');
  imgElem.setAttribute('height', '1');
  wrapperElem.appendChild(imgElem);

  const contentColumnElem = document.createElement('div');
  wrapperElem.appendChild(contentColumnElem);

  if (obj.contentColumn?.entries && Array.isArray(obj.contentColumn.entries)) {
    obj.contentColumn.entries.forEach(entry => {
      let elem;
      switch (entry.type) {
        case 'text':
          elem = generateTextEntry(entry);
          break;
        case 'list':
          elem = generateListEntry(entry);
          break;
        // Add cases for other entry types as needed
      }
      if (elem) {
        contentColumnElem.appendChild(elem);
      }
    });
  }

  fragment.appendChild(containerElem);
  return fragment;
}

const generateListEntry = (obj) => {
  // Create a document fragment
  const fragment = document.createDocumentFragment();

  const containerElem = document.createElement(obj.container?.element || 'section');
  if (obj.container?.className) {
    containerElem.className = obj.container.className;
  }

  if (obj.heading?.content) {
    const headingElem = document.createElement(obj.heading?.element || 'h3');
    if (obj.heading?.className) {
      headingElem.className = obj.heading.className;
    }
    headingElem.innerHTML = obj.heading.content;
    containerElem.appendChild(headingElem);
  }

  const listElem = document.createElement(obj.element);
  if (obj.attributes?.className) {
    listElem.className = obj.attributes.className;
  }

  obj.content.forEach((entry) => {
    const listItemElem = document.createElement('li');
    listItemElem.innerHTML = entry;
    listElem.appendChild(listItemElem);
  });

  containerElem.appendChild(listElem);
  fragment.appendChild(containerElem);

  return fragment;
}

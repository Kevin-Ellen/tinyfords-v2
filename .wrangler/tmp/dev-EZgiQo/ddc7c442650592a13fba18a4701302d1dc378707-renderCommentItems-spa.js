const createContainer = ({ element = 'section', className } = {}) => {
  const container = document.createElement(element);
  if (className) {
      container.className = className;
  }
  return container;
};

const createIntroTemplate = (obj) => {
  const container = createContainer(obj.container);

  const headingElement = createHeading(obj.heading);
  if (headingElement) {
      container.appendChild(headingElement);
  }

  if (obj.entries) {
      obj.entries.forEach((entry) => {
          if (entry.type === 'text') {
              container.appendChild(generateTextEntry(entry));
          }
      });
  }

  return container;
};

const createHeading = ({ element = 'h2', className = null, attributes = {}, content } = {}) => {
  if (!content) return null;

  const heading = document.createElement(element);
  if(className){heading.className = className}
  heading.textContent = content;
  return heading;
};

const generateTextEntry = (obj) => {
  const container = document.createElement(obj.element || 'p');

  if (obj.attributes?.className) {
    container.className = obj.attributes?.className;
  }

  // Check if a heading is present within the text entry
  if (obj.heading && obj.heading.content) {
      const heading = createHeading(obj.heading);
      container.appendChild(heading);
  }

  // Check if there's a content placeholder for the collection count
  if ((appData.pages.current.template === 'collection') || (appData.pages.current.template === 'home')) {
      const carCount = appData.pages.current.id === 'home' 
          ? appData.cars.overview.all 
          : appData.cars.overview[appData.pages.current.id];
      
      const contentWithCount = obj.content.replace('<strong id=\"countCollection\"></strong>',`<strong id=\"countCollection\">${carCount}</strong>`);
      container.innerHTML += contentWithCount;
  } else {
      container.innerHTML = obj.content;
  }

  return container;
};

const searchBar = (url = appData.pages.current.url.pathname, data = appData) => {
  let value = null;
  if (data.search?.success && data.search?.action === 'search') {
      value = data.search.searchValue;
  }

  const fragment = document.createDocumentFragment();
  const container = document.createElement('div');
  container.className = 'siteSearch';

  const form = document.createElement('form');
  form.action = url;
  form.method = 'post';
  form.className = 'searchBar';

  const input = document.createElement('input');
  input.type = 'search';
  input.required = true;
  input.placeholder = 'Search query';
  input.autocomplete = 'off';
  input.name = 'q';
  if (value) {
      input.value = value;
  }

  const button = document.createElement('button');
  button.type = 'submit';

  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 512 512');

  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('d', 'M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352c79.5 0 144-64.5 144-144s-64.5-144-144-144S64 128.5 64 208s64.5 144 144 144z');
  
  const span = document.createElement('span');
  span.className = 'a11y';
  span.textContent = 'Search';

  // Appending all elements
  svg.appendChild(path);
  button.appendChild(svg);
  button.appendChild(span);
  form.appendChild(input);
  form.appendChild(button);
  container.appendChild(form);
  fragment.appendChild(container);

  return fragment;
}

const updateSearchTextEntry = (obj) => {
  const parentContainer = document.querySelector('.fragmentContent section');
  
  const existingSearchTextElement = parentContainer.querySelector('.searchText');
  if (existingSearchTextElement) {
    parentContainer.removeChild(existingSearchTextElement);
  }

  const newTextEntry = generateTextEntry(obj);

  parentContainer.appendChild(newTextEntry);
};

import fetchPage from '../utils/fetchPage.js';
import {updateHistoryState} from '../utils/utils.js';
import { initialiseSPA } from '../entry.js';

// Function to attach link click handlers
const initialiseHandlers = () => {
  const links = document.querySelectorAll('a[href^="/"]');
  links.forEach(link => {
    link.removeEventListener('click', linkClickHandler);
    link.addEventListener('click', linkClickHandler);
  });
};
export default initialiseHandlers;

const linkClickHandler = async (event) => {
  event.preventDefault();
  const href = event.target.getAttribute('href');
  updateHistoryState(href);
  const content = await fetchPage(href);
  updatePage(content);
  window.scrollTo(0, 0);
  closeOpenMenus();
};

const closeOpenMenus = () => {
  const siteNavBox = document.querySelector('#siteNavBox');
  if (siteNavBox) siteNavBox.checked = false;
  const siteSearch = document.querySelector('#siteSearch');
  if (siteSearch) siteSearch.checked = false;
};

const updatePage = (content) => {
  document.querySelector('#pageContent').innerHTML = content;
  initialiseSPA();
}
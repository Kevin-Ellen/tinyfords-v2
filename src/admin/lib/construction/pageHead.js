/**
 * pageHead.js
 * 
 * This module constructs the header section of the admin pages, which includes the navigation menu 
 * and other associated elements. It leverages utility functions and configurable options to generate 
 * a dynamic and adaptive page header.
 * 
 * Dependencies:
 *  - isLoggedIn function from the misc utilities.
 */

// Import utility function to check if a user is logged in.
import { isLoggedIn } from '../utils/misc';

/**
 * Constructs and returns the header and navigation menu for the admin pages. 
 * It assembles the main navigation menu based on the user's authentication status 
 * and integrates it into the header section of the page.
 *
 * @param {Object} request - The incoming request object containing details about the request.
 * @param {Object} options - Configuration options which might include authentication status.
 * @return {string} - The constructed HTML string representing the header and navigation menu section of the page.
 */
const pageHead = (request, options) => {
  // Generate the appropriate navigation links based on the user's authentication status.
  const links = generateLinks(request, options);

  // Construct the HTML string for the header and navigation menu.
  const html = `
    <header class="siteHeader">
      <div class="siteHeaderContainer">
        <label class="siteNavLabel" for="siteNavBox">
          <svg viewBox="0 0 100 80" width="25" height="25">
            <rect width="100" height="20" rx="10"></rect>
            <rect y="30" width="100" height="20" rx="10"></rect>
            <rect y="60" width="100" height="20" rx="10"></rect>
          </svg>
          <span class="a11y">Open main menu</span>
        </label>

        <p class="siteNavName"><a href="/">Tiny Fords</a></p>

        <input type="checkbox" class="siteNavBox" id="siteNavBox">
        <nav class="siteNavMenu" aria-label="Main menu">
          <ul class="mainMenu">
            ${links}
          </ul>
        </nav>
      </div>
    </header>`;
  
  return html;
};

export default pageHead;

/**
 * A helper function to generate the navigation links based on the user's authentication status.
 * It creates a list of navigation links for authenticated users and a back link for unauthenticated users.
 *
 * @param {Object} request - The incoming request object.
 * @param {Object} options - A set of options that might include the user's authentication status.
 * @return {string} - The constructed HTML string representing the navigation links.
 */
const generateLinks = (request, options = {}) => {
  // Check if the user is authenticated.
  const loggedIn = isLoggedIn(request) || options.isAuthenticated;

  // Return the appropriate set of navigation links based on the authentication status.
  if (!loggedIn) {
    return `<li><a href="/">Back to public home</a></li>`;
  } else {
    return [
      { name: 'Admin home', slug: '/admin' },
      { name: 'Add car', slug: '/admin/add-car' },
      { name: 'Search car', slug: '/admin/search-car' },
      { name: 'Log out', slug: '/admin/logout' }
    ].map(page => `<li><a href="${page.slug}">${page.name}</a></li>`)
     .join('');
  }
};
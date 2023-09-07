/**
 * pageFooter.js
 * 
 * This module provides the function to generate the footer section of a webpage.
 * The footer typically contains links and other information that is displayed at the bottom of web pages.
 */

/**
 * Generates the HTML for the footer section based on the given data.
 * 
 * @param {Object} dataPageCurrent - Data specific to the current page.
 * @param {Array} dataPageAll - Array containing data for all pages.
 * @return {string} The HTML markup for the footer section.
 */
const pageFooter = (dataPageCurrent, dataPageAll) => {
  
  // Generate the links that should appear in the footer.
  const links = createLinks(dataPageAll);
  
  // Construct the full HTML for the footer section
  return(`
    <footer class="siteFooter">
      <ul class="siteFooterLinks">
        ${links}
      </ul>
      <h2>Thanks for visiting Tiny Fords</h2>
      <p>Here at Tiny Fords, we're passionate about Ford die-cast cars, and we're thrilled to share our collection with you. This non-commercial site is a labor of love, created by Kevin Ellen to keep track of his collection and avoid buying duplicates. We're proud to say it was made in 2023, using a Cloudflare Worker on a free account. We hope you've enjoyed exploring our collection and we look forward to your next visit! Don't forget to check out the contact page if you have any question or feedback. Thank you for choosing Tiny Fords.</p>
    </footer>
  `);
}
export default pageFooter;

/**
 * Generates the HTML links that will be included in the footer.
 * 
 * @param {Array} data - Array containing data for all pages.
 * @return {string} The HTML markup for the footer links.
 */
const createLinks = (data) => {
  
  // Define link categories and their corresponding slugs
  const categories = {
    'Collections': ['/hotwheels', '/matchbox', '/other', '/all'],
    'About': ['/about', '/about/how-to-find-toy-number', '/about/klas-car-keepers'] // Add '/about/klas-protectors' if it's part of your data
  };

  // Process each category and generate HTML for its links
  const entries = Object.entries(categories).map(([categoryName, slugs]) => {
    const links = data.filter(page => 
      page.status === 200 
      && page.active === true 
      && page.footer === true 
      && slugs.includes(page.slug))
    .map(page => `<li><a href="${page.slug}">${page.name}</a></li><li aria-hidden="true">/</li>`)
    .join('');

    return `
      <li>${categoryName} <span> > </span>
        <ul>
          ${links}
        </ul>
      </li>
    `;
  }).join('');

  // Return the Home link along with other categories
  return `<li><a href="/">Home</a></li>${entries}`;
}
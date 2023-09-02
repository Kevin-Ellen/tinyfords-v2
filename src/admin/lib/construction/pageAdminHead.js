// src > lib > construction > pageAdminHead.js - Everything on top

import { isLoggedIn } from '../utils/utilsAdmin';

const pageAdminHead = (request) => {

  const links = isLoggedIn(request) ? [
    {
      name: 'Admin home',
      slug: '/admin'
    },{
      name: 'Add car',
      slug: '/admin/add-car'
    },{
      name: 'Edit car',
      slug: '/admin/edit-car'
    },{
      name: 'Log out',
      slug: '/admin/logout'
    }
  ].map(page => `<li><a href="${page.slug}">${page.name}</a></li>`)
  .join('') : '<a href="/">Back to public home</a>';

  const html = `<header role="banner" class="siteHeader">
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
      <nav class="siteNavMenu" role="navigation" aria-label="Main menu">
        <ul class="mainMenu">
          ${links}
        </ul>
      </nav>
    </div>
  </header>`;
  return html;
}
export default pageAdminHead;
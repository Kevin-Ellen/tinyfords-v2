// src > lib > construction > pageHead.js - Everything on top

const pageHead =  (dataPageCurrent, dataPageAll)  => {

  const links = dataPageAll
    .filter(page => 
      page.status === 200 
      && page.active === true 
      && page.mainNav === true)
    .map(page => `<li><a href="${page.slug}">${page.name}</a></li>`)
    .join('');

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

      <div class="siteNavRight">
        <label class="siteNavLabel" for="siteSearch">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="25" height="25">
            <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352c79.5 0 144-64.5 144-144s-64.5-144-144-144S64 128.5 64 208s64.5 144 144 144z"></path>
          </svg>
          <span class="a11y">Open search box</span>
        </label>
      </div>

      <input type="checkbox" class="siteNavBox" id="siteNavBox">
      <nav class="siteNavMenu" role="navigation" aria-label="Main menu">
        <ul class="mainMenu">
          ${links}
        </ul>
      </nav>

      <input type="checkbox" class="siteNavBox" id="siteSearch">
      <div class="siteSearch">
        <form class="searchBar" action="/all">
          <input type="search" required placeholder="Search query" autocomplete="off" name="q">
          <button type="submit">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352c79.5 0 144-64.5 144-144s-64.5-144-144-144S64 128.5 64 208s64.5 144 144 144z"></path></svg>
            <span class="a11y">Search</span>
          </button>
        </form>
      </div>

    </div>
  </header>`;
  return html;
}
export default pageHead;
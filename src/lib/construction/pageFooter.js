// src > lib > construction > pageFooter.js - Everything at the bottom

const pageFooter = (pageData, allPageData) => {

  const links = allPageData
  .filter(page => 
    page.status === 200 
    && page.active === true 
    && page.footer === true)
  .map(page => `<li><a href="${page.slug}">${page.name}</a></li><li aria-hidden="true">/</li>`)
  .join('');

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
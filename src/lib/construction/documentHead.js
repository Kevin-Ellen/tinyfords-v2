/**
 * documentHead.js
 * 
 * This module exports a function that generates the opening part of an HTML document.
 * This includes the DOCTYPE declaration, opening HTML and BODY tags, and the HEAD contents.
 * The HEAD contains meta information, links to stylesheets, scripts, and other resources.
 */

// Importing the styles
import css from '../css/styles.css';

/**
 * Generates the opening HTML markup for the page.
 * 
 * @param {Object} data - All the cars and pages (current and all) data
 * @return {string} The opening HTML markup.
 */
const documentHead = (data) => {

  console.log(data);
  // If the current page status is 200 and the template is not offline or admin
  if(data.pages.current.status === 200 && data.pages.current.template !== 'offline') {

    // Set the canonical URL
    data.pages.current.canonical = `${data.pages.current.url.protocol}//${data.pages.current.url.host}${data.pages.current.slug}`;

    // Append the page parameter if it's a collection and not the first page
    if(data.pages.current.template === 'collection' && data.pages.current.url.params.get('page') && data.pages.current.url.params.get('page') != 1) {
      data.pages.current.canonical += `?page=${data.pages.current.url.params.get('page')}`;
    }
  }

  // Construct the HTML markup
  const html = `<!doctype html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">
        <link rel="preload" href="/fonts/montserratalternates/v17/mFTiWacfw6zH4dthXcyms1lPpC8I_b0juU0xQIXFB7xG-GNxkg.woff2" as="font" type="font/woff2" crossorigin>
        <link rel="preload" href="/fonts/montserratalternates/v17/mFTiWacfw6zH4dthXcyms1lPpC8I_b0juU0xNIPFB7xG-GNxkg.woff2" as="font" type="font/woff2" crossorigin>
        <link rel="preload" href="/fonts/quicksand/v30/6xKtdSZaM9iE8KbpRA_hK1QNYuDyPw.woff2" as="font" type="font/woff2" crossorigin>
        <style>
          ${css}
        </style>
        <title>${data.pages.current.metadata.title}</title>
        <meta property="og:locale" content="en_GB">
        <meta property="og:type" content="website">
        <meta property="og:site_name" content="Tiny Fords">
        ${data.pages.current.status===200 && data.pages.current.template!=='offline' && data.pages.current.template!=='admin'? 
          `<meta name="description" content="${data.pages.current.metadata.description}">
          <link rel="canonical" href="${data.pages.current.canonical}">
          <meta property="og:title" content="${data.pages.current.socialMedia.title}">
          <meta property="og:description" content="${data.pages.current.socialMedia.description}">
          <meta property="og:url" content="${data.pages.current.canonical}">
          <meta property="og:image" content="${data.pages.current.url.protocol}//${data.pages.current.url.host}/images/social-media/4080-2142/${data.pages.current.socialMedia.image}-4080-2142.jpg">
          <meta property="og:image:width" content="4080">
          <meta property="og:image:height" content="2142">
          <meta property="og:image:type" content="image/jpeg">

          <meta property="og:image" content="${data.pages.current.url.protocol}//${data.pages.current.url.host}/images/social-media/256/${data.pages.current.socialMedia.image}-256.jpg">
          <meta property="og:image:width" content="256">
          <meta property="og:image:height" content="256">
          <meta property="og:image:type" content="image/jpeg">

          <meta name="twitter:card" content="summary_large_image">
          <meta name="twitter:creator" content="@kevin_ellen_">
          <meta name="twitter:title" content="${data.pages.current.socialMedia.title}">
          <meta name="twitter:description" content="${data.pages.current.socialMedia.description}">
          <meta name="twitter:image" content="${data.pages.current.url.protocol}//${data.pages.current.url.host}/images/social-media/4080-2142/${data.pages.current.socialMedia.imageName}-4080-2142.jpg">
          ` 
        : ''}
        <link rel="apple-touch-icon" sizes="57x57" href="/images/icons/apple-icon-57x57.png">
        <link rel="apple-touch-icon" sizes="60x60" href="/images/icons/apple-icon-60x60.png">
        <link rel="apple-touch-icon" sizes="72x72" href="/images/icons/apple-icon-72x72.png">
        <link rel="apple-touch-icon" sizes="76x76" href="/images/icons/apple-icon-76x76.png">
        <link rel="apple-touch-icon" sizes="114x114" href="/images/icons/apple-icon-114x114.png">
        <link rel="apple-touch-icon" sizes="120x120" href="/images/icons/apple-icon-120x120.png">
        <link rel="apple-touch-icon" sizes="144x144" href="//iconsapple-icon-144x144.png">
        <link rel="apple-touch-icon" sizes="152x152" href="/images/icons/apple-icon-152x152.png">
        <link rel="apple-touch-icon" sizes="180x180" href="/images/icons/apple-icon-180x180.png">
        <link rel="icon" type="image/png" sizes="192x192" href="/images/icons/android-icon-192x192.png">
        <link rel="icon" type="image/png" sizes="32x32" href="/images/icons/favicon-32x32.png">
        <link rel="icon" type="image/png" sizes="96x96" href="/images/icons/favicon-96x96.png">
        <link rel="icon" type="image/png" sizes="16x16" href="/images/icons/favicon-16x16.png">
        <link rel="manifest" href="/manifest.json">
        <meta name="msapplication-TileColor" content="#005490">
        <meta name="msapplication-TileImage" content="/icons/ms-icon-144x144.png">
        <meta name="theme-color" content="#005490">
      </head>
      <body>`;

  return html;
}
export default documentHead;
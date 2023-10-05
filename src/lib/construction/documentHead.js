/**
 * documentHead.js
 * 
 * This module exports a function that generates the opening part of an HTML document.
 * This includes the DOCTYPE declaration, opening HTML and BODY tags, and the HEAD contents.
 * The HEAD contains meta information, links to stylesheets, scripts, and other resources.
 */

// Importing the styles
import css from '../css/styles.css';
import { appData } from '../services/appData';

/**
 * Generates the opening HTML markup for the page.
 * 
 * @param {Object} data - All the cars and pages (current and all) data
 * @return {string} The opening HTML markup.
 */
const documentHead = (data = appData) => {
  const { pages: { current } } = data;

  // Construct the HTML markup
  const html = `<!doctype html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">
        <style>
          ${css}
        </style>
        <title>${current.metadata.title}</title>
        <meta property="og:locale" content="en_GB">
        <meta property="og:type" content="website">
        <meta property="og:site_name" content="Tiny Fords">
        ${current.status===200 && current.template!=='offline' && current.template!=='admin'? 
          `<meta name="description" content="${current.metadata.description}">
          <link rel="canonical" href="${current.canonical}">
          <meta property="og:title" content="${current.socialMedia.title}">
          <meta property="og:description" content="${current.socialMedia.description}">
          <meta property="og:url" content="${current.canonical}">
          <meta property="og:image" content="${current.url.protocol}//${current.url.host}/images/social-media/4080-2142/${current.socialMedia.image}-4080-2142.jpg">
          <meta property="og:image:width" content="4080">
          <meta property="og:image:height" content="2142">
          <meta property="og:image:type" content="image/jpeg">

          <meta property="og:image" content="${current.url.protocol}//${current.url.host}/images/social-media/256/${current.socialMedia.image}-256.jpg">
          <meta property="og:image:width" content="256">
          <meta property="og:image:height" content="256">
          <meta property="og:image:type" content="image/jpeg">

          <meta name="twitter:card" content="summary_large_image">
          <meta name="twitter:creator" content="@kevin_ellen_">
          <meta name="twitter:title" content="${current.socialMedia.title}">
          <meta name="twitter:description" content="${current.socialMedia.description}">
          <meta name="twitter:image" content="${current.url.protocol}//${current.url.host}/images/social-media/4080-2142/${current.socialMedia.imageName}-4080-2142.jpg">
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
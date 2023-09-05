/**
 * documentHead.js
 * This module constructs the beginning part of an HTML document, including the `<head>` section.
 */

import css from '../css/stylesAdmin.css';

/**
 * Constructs and returns the initial section of an HTML document.
 * This includes meta tags, preloaded fonts, and embedded CSS for the admin panel.
 * @return {string} The initial section of an HTML document.
 */
const documentHead = () => {
  const html = `<!DOCTYPE html>
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
        <title>Tiny Fords - Admin panel</title>
        <meta name="theme-color" content="#005490">
      </head>
      <body>`;
  
  return html;
}
export default documentHead;
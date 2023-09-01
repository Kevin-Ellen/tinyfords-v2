// src > lib > construction > documentHead.js

import css from '../css/styles.css';

const documentHead = (pageData, allPageData) => {
  if(pageData.status===200 && pageData.template!=='offline'){
  
    pageData.canonical = `${pageData.url.protocol}//${pageData.url.host}${pageData.slug}`;

    if(pageData.template==='collection' && pageData.url.params.get('page') && pageData.url.params.get('page')!=1){
      pageData.canonical += `?page=${pageData.url.params.get('page')}`;
    }
  }

  html = `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">
        <link rel="preload" href="/fonts/montserratalternates/v17/mFTiWacfw6zH4dthXcyms1lPpC8I_b0juU0xQIXFB7xG-GNxkg.woff2" as="font" type="font/woff2" crossorigin />
        <link rel="preload" href="/fonts/montserratalternates/v17/mFTiWacfw6zH4dthXcyms1lPpC8I_b0juU0xNIPFB7xG-GNxkg.woff2" as="font" type="font/woff2" crossorigin />
        <link rel="preload" href="/fonts/quicksand/v30/6xKtdSZaM9iE8KbpRA_hK1QNYuDyPw.woff2" as="font" type="font/woff2" crossorigin />
        <style>
          ${css}
        </style>
        <title>${pageData.metadata.title}</title>
        <meta property="og:locale" content="en_GB" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Tiny Fords">
        ${pageData.status===200 && pageData.template!=='offline'? 
          `<meta name="description" content="${pageData.metadata.description}" />
          <link rel="canonical" href="${pageData.canonical}" />
          <meta property="og:title" content="${pageData.socialMedia.title}" />
          <meta property="og:description" content="${pageData.socialMedia.description}" />
          <meta property="og:url" content="${pageData.canonical}" />
          <meta property="og:image" content="${pageData.url.protocol}//${pageData.url.host}/social-media/images/4080-2142/${pageData.socialMedia.image}-4080-2142.jpg" />
          <meta property="og:image:width" content="4080" />
          <meta property="og:image:height" content="2142" />
          <meta property="og:image:type" content="image/jpeg">

          <meta property="og:image" content="${pageData.url.protocol}//${pageData.url.host}/social-media/images/256/${pageData.socialMedia.image}-256.jpg" />
          <meta property="og:image:width" content="256" />
          <meta property="og:image:height" content="256" />
          <meta property="og:image:type" content="image/jpeg">

          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:creator" content="@kevin_ellen_" />
          <meta name="twitter:title" content="${pageData.socialMedia.title}" />
          <meta name="twitter:description" ontent="${pageData.socialMedia.description}" />
          <meta name="twitter:image" content="${pageData.url.protocol}//${pageData.url.host}/social-media/images/4080-2142/${pageData.socialMedia.imageName}-4080-2142.jpg" />
          ` 
        : ''}
        <link rel="apple-touch-icon" sizes="57x57" href="/icons/apple-icon-57x57.png">
        <link rel="apple-touch-icon" sizes="60x60" href="/icons/apple-icon-60x60.png">
        <link rel="apple-touch-icon" sizes="72x72" href="/icons/apple-icon-72x72.png">
        <link rel="apple-touch-icon" sizes="76x76" href="/icons/apple-icon-76x76.png">
        <link rel="apple-touch-icon" sizes="114x114" href="/icons/apple-icon-114x114.png">
        <link rel="apple-touch-icon" sizes="120x120" href="/icons/apple-icon-120x120.png">
        <link rel="apple-touch-icon" sizes="144x144" href="//iconsapple-icon-144x144.png">
        <link rel="apple-touch-icon" sizes="152x152" href="/icons/apple-icon-152x152.png">
        <link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-icon-180x180.png">
        <link rel="icon" type="image/png" sizes="192x192" href="/icons/android-icon-192x192.png">
        <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png">
        <link rel="icon" type="image/png" sizes="96x96" href="/icons/favicon-96x96.png">
        <link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png">
        <link rel="manifest" href="/manifest.json">
        <meta name="msapplication-TileColor" content="#005490">
        <meta name="msapplication-TileImage" content="/icons/ms-icon-144x144.png">
        <meta name="theme-color" content="#005490f">
      </head>
      <body>`;

  return html;
}

export default documentHead;
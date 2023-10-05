/**
 * helpersRenders.js
 * 
 * Document with all the different helpers to aid in rendering.
 * Used by the templates.
 * 
 */

export const assembleHTML = (strings) => strings.join('');

export const assignClassName = (className) => className ? `class="${className}"` : '';
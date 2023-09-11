// GLOBALS

const ITEMS_PER_PAGE = 21; // or whatever value you choose
window.myAppGlobals = {
  carsData: [],
};

console.log('works');

worker.onmessage = (event) => {
  console.log(event.data);
};

worker.postMessage({type: 'init', data: {baseUrl: window.location.origin} });

// import handlerLinks from '/js/handlers/links.js';

// const ITEMS_PER_PAGE = 21; // or whatever value you choose
// // Global variable to store cars data
// let carsData = [];

// // Init the Worker
// const worker = new Worker('/js/worker/init.js');

// worker.onmessage = (event) => {
//   console.log(event.data);
// }

// worker.postMessage('test');


// document.addEventListener('DOMContentLoaded', () => {
//   console.log(`DOM loaded, let's do some SPA stuff!`);
//   initialiseSPA();
// });


// console.log('works!');

// export const initialiseSPA = () => {
//   handlerLinks();
//   // initialiseSearchHandlers();
// };
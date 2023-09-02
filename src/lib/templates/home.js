// src > lib > templates > home.js - Homepage template

import fragmentContent from '../fragments/content';
import fragmentGridCars from '../fragments/gridCars';

import { servicesGithubDataCarsAll } from '../services/github';
import { utilDataCarsLatest } from '../utils/dataCars';

const templateHome = async (dataPageCurrent, dataPageAll) => {

  const dataCarsAll = await servicesGithubDataCarsAll();

  const content = [
    `<h1>${dataPageCurrent.h1}</h1>`,
    `<p>Welcome to Tiny Fords, the website of a Ford die-cast car enthusiast. Here, you'll find my collection of Hot Wheels, Matchbox, and other small scale models of your many Ford cars. Our easy-to-use website makes it simple to navigate and find the cars, this is mainly so we can avoid buying duplicates and keep our collection up-to-date. Let's dive in and explore the collection together!</p>`,
    `<p>Currently there are <strong>${dataCarsAll.length}</strong> items within the various collections!</p>`
  ].join('');

  const dataCarsLatest = await utilDataCarsLatest(dataCarsAll,14);
  
  return sections = [
    `<main>`,
      fragmentContent(content),
      fragmentGridCars('Latest additions',2,dataCarsLatest),
    `<main>`,
  ].join('');
}
export default templateHome;
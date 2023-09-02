// src > lib > templates > home.js - Homepage template

import fragmentContent from '../fragments/fragmentContent';
import fragmentCarsGrid from '../fragments/fragmentCarsGrid';

import { utilGitHubGetAllCarsData } from '../utils/utilsGitHub';
import { utilGetLatestCars } from '../utils/utilsCarData';

const templateHome = async (pageData, allPageData) => {

  const allCars = await utilGitHubGetAllCarsData();

  const content = [
    `<h1>${pageData.h1}</h1>`,
    `<p>Welcome to Tiny Fords, the website of a Ford die-cast car enthusiast. Here, you'll find my collection of Hot Wheels, Matchbox, and other small scale models of your many Ford cars. Our easy-to-use website makes it simple to navigate and find the cars, this is mainly so we can avoid buying duplicates and keep our collection up-to-date. Let's dive in and explore the collection together!</p>`,
    `<p>Currently there are <strong>${allCars.length}</strong> items within the various collections!</p>`
  ].join('');

  const latestCars = await utilGetLatestCars(allCars,14);
  
  return sections = [
    `<main>`,
      fragmentContent(content),
      fragmentCarsGrid('Latest additions',2,latestCars),
    `<main>`,
  ].join('');
}
export default templateHome;
// src > lib > templates > templateHome.js - Homepage template

import fragmentContent from '../fragments/fragmentContent';
import fragmentGrid from '../fragments/fragmentGrid';

import { utilGitHubGetAllCarsData } from '../utils/utilsGitHub';
import { utilGetLatestCars } from '../utils/utilsCarData';

const templateHome = async (pageData, allPageData) => {

  const allCars = await utilGitHubGetAllCarsData();

  const contentArray = [
    `<h1>${pageData.h1}</h1>`,
    `<p>Welcome to Tiny Fords, the website of a Ford die-cast car enthusiast. Here, you'll find my collection of Hot Wheels, Matchbox, and other small scale models of your many Ford cars. Our easy-to-use website makes it simple to navigate and find the cars, this is mainly so we can avoid buying duplicates and keep our collection up-to-date. Let's dive in and explore the collection together!</p>`,
    `<p>Currently there are <strong>${allCars.length}</strong> items within the various collections!</p>`
  ];

  const latestCars = await utilGetLatestCars(allCars,14);

  const sections = [
    `<main>`,
      fragmentContent(contentArray.join('')),
      fragmentGrid('Latest additions',2,latestCars),
    `<main>`,
  ]

  
  return sections.join('');
}
export default templateHome;
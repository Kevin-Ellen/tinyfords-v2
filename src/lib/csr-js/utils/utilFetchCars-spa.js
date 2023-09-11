import {multiSort} from './utils.js';

const getSortedCars = async () => {
  const data = await fetchCarsData();
  return multiSort(data, ['addedDetails.date', 'id'], { 'addedDetails.date': 'desc', 'id': 'desc' });
};
export default getSortedCars;

const fetchCarsData = async () => {
  try {
    const response = await fetch('/json/cars');
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch cars data:', error.message);
  }
};


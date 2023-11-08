const scrollToTop = () => {
  window.scrollTo(0,0);
}

const assignClassName = (className) => className || '';
const assembleHTML = (strings) => strings.join('');

const searchCars = (term, data = appData.cars.current) => {
  if(!term) return data;
  // Convert the search term to lowercase for case-insensitive search
  term = term.toLowerCase();
  // Return only those cars that have the search term in their name, brand, or code
  return data.filter(car => {
    return (
      car.name && car.name.toLowerCase().includes(term) ||           // Check if name exists and includes the term
      car.brand && car.brand.toLowerCase().includes(term) ||         // Check if brand exists and includes the term
      car.code && car.code.toLowerCase().includes(term) ||              // Check if code exists and includes the term
      car.make && car.make.toLowerCase().includes(term)              // Check if code exists and includes the term
    );
  });
};

const closeMenus = () => {
  const checkboxes = document.querySelectorAll('.siteNavBox');
  checkboxes.forEach(checkbox => {
      checkbox.checked = false;
  });
};

const setUrl = (url) => {
  if(parseInt(url.searchParams.get('page'))===1){
    url.searchParams.delete('page');
  }
  history.pushState({}, '', url);
}
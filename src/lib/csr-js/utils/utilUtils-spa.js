export const updateHistoryState = (url) => {
  history.pushState({ url: url }, '', url);
};

export const multiSort = (data, fields, directions) => {
  return data.sort((a, b) => {
    for (const field of fields) {
      const valueA = getValueByPath(a, field);
      const valueB = getValueByPath(b, field);

      let comparison;
      // Check if we're dealing with dates
      if (valueA && valueB && Date.parse(valueA) && Date.parse(valueB)) {
        comparison = new Date(valueB) - new Date(valueA);
      } else {
        comparison = valueA < valueB ? -1 : valueA > valueB ? 1 : 0;
      }
      if (directions[field] === 'asc') {
        comparison *= -1;
      }
      if (comparison !== 0) return comparison;
    }
    return 0;
  });
};

export const getValueByPath = (obj, path) => {
  return path.split('.').reduce((acc, part) => acc && acc[part], obj);
}
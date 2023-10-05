import { appData, apiAppData } from '../services/appData';
import handleError from '../handlers/error';
import { assembleHTML } from '../utils/helpersRenders';

const apiCreator = async (url) => {
  await apiAppData();
  switch(url.pathname){
    case '/api/cars': return new Response(apiCars(), {status: 200, headers: {'content-type':'text/html', 'x-robots-tag':'noindex'}});
    case '/api/cases': return new Response(apiCases(), {status: 200, headers: {'content-type':'text/html', 'x-robots-tag':'noindex'}});
    default: return handleError(403, 'Not allowed');
  }
}
export default apiCreator;

const apiCars = () => {
  const headers = [
    'Name',
    'Make',
    'Brand',
    'Code'
  ];

  const data = [ ...appData.cars.all];

  return createTable(headers, data);
}

const apiCases = () => {

  const allCars = [ ...appData.cars.all];

  const cases = {
    long: {
      name: 'Long card',
      has: 0,
      hasNot: 0
    },
    short: {
      name: 'Short card',
      has: 0,
      hasNot: 0
    },
    premium: {
      name: 'Premium',
      has: 0,
      hasNot: 0
    },
    transport: {
      name: 'Team Transport',
      has: 0,
      hasNot: 0
    }
  }

  allCars.forEach(car => {
    const caseId = car.caseDetails.id;
    if(cases[caseId]) {
      cases[caseId][car.caseDetails.status ? 'has' : 'hasNot'] += 1;
    }
  });

  const headers = [
    'Type',
    'In case',
    'Not in case'
  ];

  const data = Object.entries(cases).map(([key, value]) => {
    return {
      [headers[0].toLowerCase()]: value.name, // 'Type': 'Long card'
      [headers[1].toLowerCase()]: value.has, // 'In case': 47
      [headers[2].toLowerCase()]: value.hasNot, // 'Not in case': 42
    };
  });
  return createTable(headers, data);

}

const createTable = (headers, data) => {
  const html = [openHtml];
  html.push('<table>');
  html.push('<thead>');
  html.push('<tr>');
  headers.forEach((head) => {
    html.push(`<th>${head}</th>`);
  });
  html.push('</tr>');
  html.push('</thead>');
  html.push('<tbody>');
  data.forEach((entry) => {
    html.push('<tr>');
    headers.forEach((head) => {
      html.push(`<td>${entry[head.toLowerCase()]}</td>`);
    });
    html.push('</tr>');
  });
  html.push('</tbody>');
  html.push('</table>');
  html.push(closeHtml);
  return assembleHTML(html);
}

const openHtml = `<!doctype html><html lang="en"><head><title>Collection table</title></head><body>`;
const closeHtml = `</body></html>`;
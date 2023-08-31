// src > admin > lib > templates > adminLandingPage.js - Landing page for admin panel

import {adminGitHubCarData} from '../adminGitHub';

const properties = [
  {'key': 'id', 'value': 'ID'},
  {'key': 'name', 'value': 'Name'},
  {'key': 'make', 'value': 'Make'},
  {'key': 'brand', 'value': 'Brand'},
  {'key': 'code', 'value': 'Code'},
  {'key': 'base', 'value': 'Base'},
  {'key': 'type', 'value': 'Type'},
  {'key': 'hasCase', 'value': 'Has case'},
  {'key': 'hasPhoto', 'value': 'Has photo'},
  {'key': 'added', 'value': 'Added'},
  {'key': 'quantity', 'value': 'Quantity'}
];

const adminLandingPage = async () => {

  const carsData = await adminGitHubCarData();



  const html = `
    <table>
      ${tableHeader()}
      <tbody>
        ${tableEntries(carsData)}
      </tbody>
    </table>`;

  return new Response(html, {
    headers: {
      'Content-Type': 'text/html',
      'X-Robots-Tag': 'noindex'
    }
  });
}

export default adminLandingPage;

const tableHeader = () => {
  const headers = properties.map(prop => `<th>${prop.value}</th>`).join('');
  return `
    <thead>
      <tr>
        ${headers}
      </tr>
    </thead>
  `;
}

const tableEntries = (data) => {
  return data.map(car => {
    const cells = properties.map(prop => `<td>${car[prop.key]}</td>`).join('');
    return `<tr>${cells}</tr>`;
  }).join('');
}

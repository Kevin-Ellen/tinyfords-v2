// src > admin > lib > templates > carAdd.js - Landing page to add the car

import fragmentContent from '../../../lib/fragments/content';
import fragmentFormCarAdd from '../fragments/formCarAdd';

import { quickLogin } from '../utils/misc';

const templateAdminCarAdd = async (request, options = {}) => {

  const contentTop = [
    `<h1>Add car</h1>`
  ];

  const contentFeedback = [
    options.feedback ? fragmentContent(addedDetail(options)) : null,
  ].join('');

  const sections = [
    fragmentContent(contentTop),
    contentFeedback || null,
    await fragmentFormCarAdd(),
  ].join('');

  return quickLogin(request) || sections;
}
export default templateAdminCarAdd;

const addedDetail = (options) => {
  console.log(options);
  // if(!options.feedback.success){ return `<h2>${options.feedback.message}</h2>`}

  const sections = [
    `<h2>${options.feedback.message}</h2>`,
    createCarDetails(options.data),
  ].join('');


  return sections;
}

const createCarDetails = (data) => {
  const html = `<h3>Car details</h3>
  <div class="carCard">
    <ul class="carDetails">
      <li><strong>ID:</strong> ${data.id}</li>
      <li><strong>Code:</strong> ${data.code}</li>
      <li><strong>Base:</strong> ${data.base}</li>
      <li><strong>Name:</strong> ${data.name}</li>
      <li><strong>Make:</strong> ${data.make}</li>
      <li><strong>Brand:</strong> ${data.brand}</li>
      <li><strong>Category:</strong> ${data.categoryDetails.name}</li>
      <li><strong>Case type:</strong> ${data.caseDetails.name}</li>
      <li><strong>In case:</strong> ${data.caseDetails.status===null ? 'n/a' : data.caseDetails.status ? 'Yes' : 'No'}</li>
      <li><strong>Has photo:</strong> ${data.hasPhoto ? 'Yes' : 'No'}</li>
      <li><strong>Quantity:</strong> ${data.quantity}</li>
    </ul>
  </div>`;
  return html;
}


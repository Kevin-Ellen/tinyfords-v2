// src > admin > lib > fragments > formCarAdd.js - Form to add vehicles to the JSON

import { servicesGithubDataCarsAll } from '../../../lib/services/github';
import utilCarConstruct from '../../../lib/utils/carConstruct';
import { getUniqueCarCategories, getUniqueCarCaseTypes,  } from '../../../lib/utils/dataCars';

const fragmentFormCarEdit = async (data,options={}) => {

  const dataCarsAll = await servicesGithubDataCarsAll();

  const dataCar = {...data};

  const categories = generateOptions(getUniqueCarCategories(dataCarsAll), dataCar.categoryDetails.id);
  const cases = generateOptions(getUniqueCarCaseTypes(dataCarsAll), dataCar.caseDetails.id);
  
  const html = `<section class="fragmentContent adminCenter">
    <h2>Edit car form</h2>
    <div class="formContainer">

      <form action="/admin/edit-car" method="post" class="adminForm">

      <input type="hidden" name="id" id="id" value="${dataCar.id}">
      <input type="hidden" name="action" id="formAction" value="editSubmit">

        <div class="inputGroup">
          <p>ID: ${dataCar.id}</p>
        </div>

        <div class="inputGroup">
          <label for="base">Code:</label>
          <input type="text" id="code" name="code" value="${dataCar.code || ''}">
        </div>


        <div class="inputGroup">
          <label for="base">Base:</label>
          <input type="text" id="base" name="base" value="${dataCar.base || ''}" >
        </div>

        <div class="inputGroup">
          <label for="name">Name:</label>
          <input type="text" id="name" name="name" value="${dataCar.name}" required>
        </div>

        <div class="inputGroup">
          <label for="make">Make:</label>
          <input type="text" id="make" name="make" value="${dataCar.make}" required>
        </div>

        <div class="inputGroup">
          <label for="category">Category:</label>
          <select id="category" name="category" required>
            <option value="" selected disabled>Select a category</option>
            ${categories}
          </select>
        </div>

        <div class="inputGroup">
          <label for="brand">Brand:</label>
          <input type="text" id="brand" name="brand" value="${dataCar.brand || ''}">
        </div>

        <div class="inputGroup">
          <label for="hasPhoto">Photo is online:</label>
          <input type="checkbox" id="hasPhoto" name="hasPhoto" ${dataCar.hasPhoto ? 'checked' : ''}>
        </div>

        <fieldset class="inputGroup">
          <legend>Case Details</legend>
        
          <label for="caseType">Case Type:</label>
          <select id="caseType" name="caseType" required>
            <option value="" selected disabled>Select a type</option>
            ${cases}
          </select>
          
          <div class="radioGroup">
            <label>Has Case:</label>
            
            <div class="radioEntry">
              <label for="yes">Yes</label>
              <input type="radio" id="yes" name="hasCase" value="true" ${dataCar.caseDetails.status===true ? 'checked' : ''}>
            </div>

            <div class="radioEntry">
              <label for="no">No</label>
              <input type="radio" id="no" name="hasCase" value="false" ${dataCar.caseDetails.status===false || dataCar.caseDetails.status === undefined ? 'checked' : ''}>
            </div>
            
            <div class="radioEntry">
              <label for="na">N/A</label>
              <input type="radio" id="na" name="hasCase" value="null" ${dataCar.caseDetails.status===null ? 'checked' : ''}>
            </div>
          </div>
        </fieldset>

        <div class="inputGroup">
        <label for="quantity">Quantity:</label>
        <input type="number" id="quantity" name="quantity" min="1" value="${dataCar.quantity > 0 ? dataCar.quantity : 1}">
        </div>

        <button type="submit">Edit car</button>
      </form>
    </div>
  </section>`;

  return html;
}

export default fragmentFormCarEdit;

const generateOptions = (items, selectedValue, valueProp = 'id', nameProp = 'name') => {
  return items.map(item => `
    <option value="${item[valueProp]}" ${item[valueProp] === selectedValue ? 'selected' : ''}>
      ${item[nameProp]}
    </option>
  `).join('');
}

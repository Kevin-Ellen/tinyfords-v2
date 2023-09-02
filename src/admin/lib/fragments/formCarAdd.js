// src > admin > lib > fragments > formCarAdd.js - Form to add vehicles to the JSON

import { servicesGithubDataCarsAll } from '../../../lib/services/github';

import { getUniqueCarCategories, getUniqueCarCaseTypes } from '../../../lib/utils/dataCars';

const fragmentFormCarAdd = async () => {

  const dataCarsAll = await servicesGithubDataCarsAll();
  
  const categories = getUniqueCarCategories(dataCarsAll).map(category => `<option value="${category.short}">${category.name}</option>`).join('');

  const cases = getUniqueCarCaseTypes(dataCarsAll).map(caseDetail => `<option value="${caseDetail.type}">${caseDetail.name}</option>`).join('');


  const html = `<section class="fragmentContent adminCenter">
    <h1>Add car</h1>
    <div class="formContainer">

      <form action="/admin/add-car" method="post" class="adminForm">

      <input type="hidden" name="id" id="id" value="${Math.max(...dataCarsAll.map(car => car.id))+1}">

        <div class="inputGroup">
          <label for="code">Code:</label>
          <input type="text" id="code" name="code" required>
        </div>

        <div class="inputGroup">
          <label for="base">Base:</label>
          <input type="text" id="base" name="base" required>
        </div>

        <div class="inputGroup">
          <label for="name">Name:</label>
          <input type="text" id="name" name="name" required>
        </div>

        <div class="inputGroup">
          <label for="make">Make:</label>
          <input type="text" id="make" name="make">
        </div>

        <div class="inputGroup">
          <label for="category">Category:</label>
          <select id="category" name="category">
            <option value="" selected disabled>Select a category</option>
            ${categories}
          </select>
        </div>

        <div class="inputGroup">
          <label for="brand">Brand:</label>
          <input type="text" id="brand" name="brand">
        </div>

        <div class="inputGroup">
          <label for="hasPhoto">Photo is online:</label>
          <input type="checkbox" id="hasPhoto" name="hasPhoto">
        </div>

        <fieldset class="inputGroup">
          <legend>Case Details</legend>
        
          <label for="caseType">Case Type:</label>
          <select id="caseType" name="caseType">
            <option value="" selected disabled>Select a type</option>
            ${cases}
          </select>
          
          <div class="radioGroup">
            <label>Has Case:</label>
            
            <div class="radioEntry">
              <label for="yes">Yes</label>
              <input type="radio" id="yes" name="hasCase" value="true">
            </div>

            <div class="radioEntry">
              <label for="no">No</label>
              <input type="radio" id="no" name="hasCase" value="false" checked>
            </div>
            
            <div class="radioEntry">
              <label for="na">N/A</label>
              <input type="radio" id="na" name="hasCase" value="null">
            </div>
          </div>
        </fieldset>

        <div class="inputGroup">
        <label for="quantity">Quantity:</label>
        <input type="number" id="quantity" name="quantity" min="1" value="1">
        </div>

        <button type="submit">Add car</button>
      </form>
    </div>
  </section>`;

  return html;
}

export default fragmentFormCarAdd;

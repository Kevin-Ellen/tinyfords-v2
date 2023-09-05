// src > admin > lib > fragments > formCarSearch.js - Search a car

import { servicesGithubDataCarsAll } from '../../../lib/services/github';

import { getUniqueCarCategories, getUniqueCarCaseTypes,  } from '../../../lib/utils/dataCars';

import { generateOptions } from '../utils/misc';

const fragmentFormCarSearch = async (options={}) => {

  const dataCarsAll = await servicesGithubDataCarsAll();

  const categories = generateOptions(getUniqueCarCategories(dataCarsAll));
  const cases = generateOptions(getUniqueCarCaseTypes(dataCarsAll));

  const html = `<section class="fragmentContent adminCenter">
    <h2>Car search form</h2>
    <div class="formContainer">
      <form action="/admin/search-car" method="post" class="adminForm">
        <div class="inputGroup">
          <label for="id">ID:</label>
          <input type="number" min="0" id="id" name="id">
        </div>
        <div class="inputGroup">
          <label for="code">Code:</label>
          <input type="text" id="code" name="base">
        </div>
        <div class="inputGroup">
          <label for="name">Name:</label>
          <input type="text" id="name" name="name">
        </div>
        <div class="inputGroup">
          <label for="make">Make:</label>
          <input type="text" id="make" name="make">
        </div>
        <div class="inputGroup">
          <label for="category">Category:</label>
          <select id="category" name="category">
            <option value="" selected>Select a category</option>
            ${categories}
          </select>
        </div>
        <div class="inputGroup">
          <label for="brand">Brand:</label>
          <input type="text" id="brand" name="brand">
        </div>
        <fieldset class="inputGroup">
          <label>Photo is online:</label>
          <div class="radioGroup">
            <div class="radioEntry">
              <label for="hasPhoto-yes">Yes</label>
              <input type="radio" id="hasPhoto-yes" name="hasPhoto" value="true">
            </div>

            <div class="radioEntry">
              <label for="hasPhoto-no">No</label>
              <input type="radio" id="hasPhoto-no" name="hasPhoto" value="false">
            </div>
          </div>
        </fieldset>
        <fieldset class="inputGroup">
          <legend>Case Details</legend>
        
          <label for="caseType">Case Type:</label>
          <select id="caseType" name="caseType">
            <option value="" selected>Select a type</option>
            ${cases}
          </select>
          
          <div class="radioGroup">
            <label>Has Case:</label>
            
            <div class="radioEntry">
              <label for="hasCase-yes">Yes</label>
              <input type="radio" id="hasCase-yes" name="hasCase" value="true">
            </div>

            <div class="radioEntry">
              <label for="hasCase-no">No</label>
              <input type="radio" id="hasCase-no" name="hasCase" value="false">
            </div>
            
            <div class="radioEntry">
              <label for="hasCase-na">N/A</label>
              <input type="radio" id="hasCase-na" name="hasCase" value="null">
            </div>
          </div>
      </fieldset>

        <button type="reset">Reset form</button>

        <button type="submit">Search car</button>
      </form>
    </div>
  </section>`;

  return html;
}

export default fragmentFormCarSearch;
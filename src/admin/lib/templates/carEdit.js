// src > admin > lib > templates > carEdit.js - Car edit handler

import fragmentContent from '../../../lib/fragments/content';
import fragmentFormCarSearch from '../fragments/formCarSearch';
import fragmentFormCarEdit from '../fragments/formCarEdit';

import { quickLogin } from '../utils/misc';

const templateAdminCarEdit = async (request, options = {}) => {

  if(!options.feedback.search){
    return await response(options);
  }

  const sections = [
    await fragmentFormCarEdit(options.data),
  ].join('');


  return options.isAuthenticated ?  sections :  quickLogin(request) || sections;
}
export default templateAdminCarEdit;

const response = async (options) => {
  const sections = [
    fragmentContent(addedDetail(options)),
    await fragmentFormCarSearch(),
  ];
  return sections;
}

const addedDetail = (options) => {

  const sections = [
    `<div class="adminCenter">`,
      `<h2>${options.feedback.message}</h2>`,
      `<p>Car ID searched for was: ${options.data.id}</p>`,
    `</div>`,
  ].join('');


  return sections;
}
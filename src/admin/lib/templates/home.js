// src > admin > lib > templates > home.js - Landing page for admin

import fragmentContent from '../../../lib/fragments/content';

import { quickLogin } from '../utils/misc';

const templateAdminHome = (request, options) => {
  
  const content = [
    `<h1>Admin panel</h1>`,
    `<p>Admin functions to add and edit cars.</p>`,
    `<ul>`,
      `<li><a href="/admin/add-car">Add car</a></li>`,
      `<li><a href="/admin/edit-car">Edit car</a></li>`,
    `</ul>`,
  ].join('');

  const sections = [
    fragmentContent(content)
  ].join('');

  

  return options.isAuthenticated ?  sections :  quickLogin(request) || sections;
}
export default templateAdminHome;


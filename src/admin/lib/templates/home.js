// src > admin > lib > templates > home.js - Landing page for admin

import fragmentContent from '../../../lib/fragments/fragmentContent';

import { quickLogin } from '../utils/misc';

const templateAdminHome = (request, isAuthenticated=false) => {

  console.log(`Called from home: ${quickLogin(request)}`);
  
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

  

  return isAuthenticated ?  sections :  quickLogin(request) || sections;
}
export default templateAdminHome;


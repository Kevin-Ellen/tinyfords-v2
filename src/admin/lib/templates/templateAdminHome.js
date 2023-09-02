// src > admin > lib > templates > templateAdminHome.js - Landing page for admin

import fragmentContent from '../../../lib/fragments/fragmentContent';

import { quickLogin } from '../utils/utilsAdmin';

const templateAdminHome = (request) => {
  
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

  const html = `Admin Home`;
  return quickLogin(request) || sections;
}
export default templateAdminHome;


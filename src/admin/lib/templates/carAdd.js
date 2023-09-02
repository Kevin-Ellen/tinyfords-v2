// src > admin > lib > templates > carAdd.js - Landing page to add the car

import fragmentContent from '../../../lib/fragments/fragmentContent';
import fragmentFormCarAddag from '../fragments/formCarAdd';

import { quickLogin } from '../utils/misc';

const templateAdminCarAdd = (request) => {
  
  const content = [
    `<h1>Add Car</h1>`,
  ].join('');

  const sections = [
    fragmentContent(content)
  ].join('');

  return quickLogin(request) || sections;
}
export default templateAdminCarAdd;


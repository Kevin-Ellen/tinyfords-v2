// src > admin > lib > templates > carAdd.js - Landing page to add the car

import fragmentContent from '../../../lib/fragments/content';
import fragmentFormCarAdd from '../fragments/formCarAdd';

import { quickLogin } from '../utils/misc';

const templateAdminCarAdd = async (request) => {

  const sections = [
    await fragmentFormCarAdd(),
  ].join('');

  return quickLogin(request) || sections;
}
export default templateAdminCarAdd;


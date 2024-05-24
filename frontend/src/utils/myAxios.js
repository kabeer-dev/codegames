/**
 * axios setup to use mock service
 */

import axios from 'axios';

const myAxios = axios.create();

myAxios.defaults.baseURL = process.env.REACT_APP_API_URL;

export default myAxios;

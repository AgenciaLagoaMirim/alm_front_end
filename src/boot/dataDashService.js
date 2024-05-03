import axios from "axios";
import { boot } from 'quasar/wrappers';

const dataDashService = axios.create({
  baseURL: 'http://185.137.92.73:8080',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',

  },
});

export default boot(({ app }) => {
  app.config.globalProperties.$axios = axios;
  app.config.globalProperties.$dataDashService = dataDashService;
});

export { dataDashService };

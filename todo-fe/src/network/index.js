import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3000/api',
  timeout: 3000,
  // headers: {
  //   "Content-Type": "application/josn"
  // }
});

export default instance;
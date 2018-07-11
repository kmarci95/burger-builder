import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://burger-builder-aefa4.firebaseio.com/'
});

export default instance;
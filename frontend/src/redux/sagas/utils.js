import axios from 'axios';

export const fetchLogin = (email, password, url = 'http://localhost:4000/users/login') => axios.post(url, {
  email,
  password,
}).then(({ data }) => data);

export const fetchRegist = (nickname, email, password, url = 'http://localhost:4000/users/registration') => axios.post(url, {
  nickname,
  email,
  password,
}).then(({ data }) => data);

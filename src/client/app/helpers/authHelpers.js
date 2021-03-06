import axios from 'axios';

exports.checkSession = () => {
  return axios.get('auth/signedIn');
}

exports.signup = (user) => {
  return axios({
    method: 'POST',
    url: 'auth/signup',
    data: user
  });
}

exports.login = (user) => {
  return axios({
    method: 'POST',
    url: 'auth/login',
    data: user
  });  
};

exports.logout = () => {
  return axios.get('/auth/logout', {
    params: {
      token: window.localStorage.token
    }
  });
};

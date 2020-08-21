import axios from 'axios';
axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
// import VueCookies from 'vue-cookies';
// VueCookies.config('7d');

// const API = axios.create({
//     // baseURL: 'https://arboratorgrew.ilpga.fr:8888/api',
//     // baseURL: `/api`,
//     baseURL: ( process.env.DEV ) ? "/api"  : process.env.API+"/api",
//     timeout: 50000,
//     withCredentials: true
// });
// console.log(7878, process.env.DEV, 7878787, ( process.env.DEV ) ? "/login"  : process.env.API+"/login")
// const AUTH = axios.create({
//     // baseURL: 'https://arboratorgrew.ilpga.fr:8888/login',
//     // baseURL: process.env.API + `/login`,
//     // baseURL: ( process.env.DEV ) ? "/login"  : process.env.API+"/login",
//     baseURL: "http://127.0.0.1:8000/typometricsapp/",
//     timeout: 5000,
//     withCredentials: false
// });
// axios.defaults.baseURL = 'http://127.0.0.1:8000/typometricsapp/';
axios.defaults.baseURL = ( process.env.DEV ) ? 'http://127.0.0.1:8000'  : 'https://typometrics.elizia.net:7000';

const API = axios.create({
    // baseURL: "http://127.0.0.1:8000/typometricsapp/",
    // baseURL: "http://localhost:8000",
//     baseURL: "http://127.0.0.1:8000/typometricsapp/",
    baseURL:  ( process.env.DEV ) ? 'http://127.0.0.1:8000/typometricsapp/'  : 'https://typometrics.elizia.net:7000/typometricsapp/',
    
    timeout: 60000
})

const header = {
    headers:{
      'Authorization': "Bearer " + localStorage.getItem('JWTAccess')
    }
  }
  const payload = {
    testValue: "Hello API"
  }



export default {
    getData(data){ // new from kim JSON.stringify(user)
        return API.post('typo/', data) //, header);
    },
    getOptions(data){ // new from kim JSON.stringify(user)
        // console.log(999, data)
        return API.post('typoptions/', data) //, header);
    },
    getTypes(data){ // new from kim
        return API.get('types/', data); //, header);
    },




}

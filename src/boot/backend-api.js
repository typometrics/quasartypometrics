import axios from 'axios';
axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';

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

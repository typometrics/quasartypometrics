import Vue from 'vue'
import axios from 'axios'

Vue.prototype.$axios = axios

const axiosInstance = axios.create({
//   baseURL: 'http://127.0.0.1:8000'

	baseURL: ( process.env.DEV ) ? 'http://127.0.0.1:8000'  : 'https://typometrics.elizia.net:8000',

})
export default ({ Vue }) => {
  Vue.prototype.$axios = axios
}
export { axiosInstance }

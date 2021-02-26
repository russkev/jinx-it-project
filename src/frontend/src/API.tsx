import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL;

axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-XSRFToken'

export default axios.create({
    baseURL: BASE_URL,
})
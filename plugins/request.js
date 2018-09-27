import axios from 'axios'

// create an axios instance
const service = axios.create({
  baseURL: process.env.NODE_ENV === 'development' ? process.env.baseUrl : process.env.BASE_URL, // api的base_url
  timeout: 5000 // request timeout
})

export default service
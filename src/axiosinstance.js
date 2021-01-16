import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://each-day-counts.firebaseio.com/'
})

export default instance;
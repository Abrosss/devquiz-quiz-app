import axios from 'axios'

export default axios.create({
    authURL: import.meta.env.VITE_AUTH_URL 
})


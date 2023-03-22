import axios from 'axios'

export default axios.create({
    baseURL: "https://devquiz-taupe.vercel.app/auth"
})


import axios from "axios"

const BASE_URL = 'http://localhost:3000/api/'
let token
const localValue = JSON.parse(localStorage.getItem("persist:root"))
if(localValue) token = JSON.parse(JSON.parse(localStorage.getItem("persist:root"))?.user)?.currentUser?.accessToken


export const publicRequest = axios.create({
    baseURL : BASE_URL,
    withCredentials: true
})

export const userRequest = axios.create({
    baseURL : BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'token': `Bearer ${token}`
    },
    withCredentials: true
    
})
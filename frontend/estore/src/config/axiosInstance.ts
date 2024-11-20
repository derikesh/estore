import axios from "axios"
import { baseUrl } from "./baseUrl"


const axiosApi = axios.create({
    baseURL: baseUrl,
    headers:{
        "Content-Type" : "application/json",
    }
}) 


export default axiosApi;
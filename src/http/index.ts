import axios from "axios"
import { AuthResponse } from "../models/response/AuthResponse"

export const API_URL = "https://gym-project-api.onrender.com"

const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL,
})

$api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`
    return config
})

$api.interceptors.response.use(
    (config) => {
        return config
    },
    async (error) => {
        const originalRequest = error.config

        if (
            Number(error.response.status) === 401 &&
            error.config &&
            error.config._isRetry
        ) {
            originalRequest._isRetry = true
            try {
                const response = await axios.get<AuthResponse>(
                    `${API_URL}/user/refresh`,
                    { withCredentials: true }
                )
                localStorage.setItem("token", response.data.accessToken)
                return $api.request(originalRequest)
            } catch (error) {
                console.log(error)
            }
        }

        throw error.response.data.message
    }
)

export default $api

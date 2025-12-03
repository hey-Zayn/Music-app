import axios from "axios"

export const axiosInstance = axios.create({
    // baseURL: import.meta.env.MODE === "development" ? "http://localhost:5000/api" : "/api",
    baseURL: import.meta.env.MODE === "development" ? "https://music-bd.vercel.app/api" : "/api",
})
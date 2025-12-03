import axios from "axios"

export const axiosInstance = axios.create({
    baseURL: import.meta.env.MODE === "development" ? "https://music-bd.vercel.app/api" : "/api",
})
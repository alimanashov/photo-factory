import axios from "axios";

const api = axios.create({
    baseURL: "https://api.unsplash.com/",
    headers: {
        "Authorization": "Client-ID ".concat(import.meta.env.VITE_ACCESS_KEY),
    },
});

export default api;
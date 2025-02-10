import { axiosInstance } from "../services/axios"

export const getAllProducts = async () => {
    try {
        const response = await fetch("/api/products");
        if (!response.ok) throw new Error("Failed to fetch");
        const data = await response.json();
        return data
    } catch (error) {
        console.error(error);
    }
}
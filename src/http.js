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

export const getProduct = async (id) => {
    try {
        const response = await fetch(`/api/products/${id}`);
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        return data
    } catch (err) {
        console.error(error);
    }
}
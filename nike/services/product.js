import { axiosInstance } from "./axios"

export const search = async (query) => {
    const {data} = await axiosInstance.get("/products/search", {params: {query}});

    return data;
}
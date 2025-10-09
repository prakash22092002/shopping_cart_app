import axios from 'axios';

const API_BASE = 'https://catalog-management-system-dev-ak3ogf6zea-uc.a.run.app';

export const fetchProductsAPI = async ({ page = 1, limit = 10, search = '', category = '', sort = '', signal }) => {
    try {
        const params = new URLSearchParams({
            page,
        });

        const url = `${API_BASE}/cms/products?${params}`;

        const response = await axios.get(url, { signal });


        return response.data;
    } catch (error) {
        console.error('Error response:', error.response?.data);
        throw error;
    }
};


// yae mae create keya just for the future purpose , fro retrive data end point for the fetch unique products by uska id
export const fetchProductByIdAPI = async (id, signal) => {
    const response = await axios.get(`${API_BASE}/cms/products/${id}`, { signal });
    return response.data;
};
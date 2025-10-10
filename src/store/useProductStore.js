import { create } from 'zustand';
import { fetchProductsAPI, fetchProductByIdAPI } from '../api/products';

export const useProductStore = create((set, get) => ({
    products: [],
    totalProducts: 0,
    loading: false,
    error: null,
    page: 1,
    pageSize: 10,
    search: '',
    category: '',
    sort: '',

    fetchProducts: async () => {
        const { page } = get();

        set({ loading: true, error: null });

        try {
            const data = await fetchProductsAPI({
                page,
            });

            // for storing the value for the products and the total products from the endpoint
            const products = data?.products ?? [];
            const totalProducts = data?.totalResults ?? 0;

            set({
                products: products,
                totalProducts: parseInt(totalProducts) || 0,
                loading: false,
                error: null
            });
        } catch (error) {
            console.error('Store error:', error);
            set({
                error: error?.message ?? 'Failed to load products',
                loading: false
            });
        }
    },

    fetchProductById: async (id, singleProductData) => {
        set({ loading: true, error: null });
        try {
            // const data = await fetchProductByIdAPI(id); 
            set({
                products: [singleProductData],
                loading: false,
                error: null
            });
            // debugger
        } catch (error) {
            set({
                error: error.message || 'Failed to load product',
                loading: false
            });
        }
    },

    setPage: (page) => {
        set({ page });
    },

}));
import { create } from 'zustand'

const useCartStore = create((set) => ({
    myCart: [],

    insertIntoCart: (cartData) =>
        set((state) => {
            return { myCart: [...state.myCart, cartData] };
        }),
}));

export default useCartStore;

import { createSlice } from '@reduxjs/toolkit';

const ProductDetail = createSlice({
    name: 'ProductDetail',
    initialState: {
        productDetail: null,
        productGameDetail: null,
        productCustomPrice: '',
        icon: null
    },
    reducers: {
        AddProductDetail: (state, action) => {
            state.productDetail = action.payload;
        },
        AddProductGameDetail: (state, action) => {
            state.productGameDetail = action.payload;
        },
        AddProductCustomPrice: (state, action) => {
            state.productCustomPrice = action.payload;
        },
        AddIcon: (state, action) => {
            state.icon = action.payload;
        }
    }
});

export const { AddProductDetail, AddProductGameDetail, AddProductCustomPrice, AddIcon } = ProductDetail.actions;
export default ProductDetail.reducer;

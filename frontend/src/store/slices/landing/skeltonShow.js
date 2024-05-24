import { createSlice } from '@reduxjs/toolkit';

// export const fetchAllProducts = createAsyncThunk('fetchAllProducts', async () => {
//     let allProducts = [];

//     try {
//         const response = await myAxios.get('/product/getAllProducts');
//         if (response.status == 200) {
//             allProducts = response.data.data.getProducts;
//         }
//     } catch (error) {
//         console.error('Error fetching products:', error);
//         throw error;
//     }
//     return allProducts;
// });

const changeSkelton = createSlice({
    name: 'skelton',
    initialState: {
        skeltonStatus: false,
        products: null,
        isError: false
    },
    // extraReducers: (builder) => {
    //     builder.addCase(fetchAllProducts.pending, (state, action) => {
    //         state.skeltonStatus = false;
    //         state.products = null;
    //     });
    //     builder.addCase(fetchAllProducts.fulfilled, (state, action) => {
    //         state.products = action.payload;
    //         state.skeltonStatus = true;
    //     });
    //     builder.addCase(fetchAllProducts.rejected, (state, action) => {
    //         state.isError = true;
    //     });
    // }
});

export const { changeSkltn } = changeSkelton.actions;
export default changeSkelton.reducer;

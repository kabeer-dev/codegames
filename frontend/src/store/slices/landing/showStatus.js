import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import myAxios from '../../../axios';

export const fetchStories = createAsyncThunk('fetchStories', async () => {
    let stories = [];
    try {
        const response = await myAxios.get('/nonAuth/stories');
        if (response.status === 200) {
            stories = response.data.data.stories;
        }
    } catch (err) {
        console.error('Error', err);
    }
    return stories;
});

// export const statusData = createAsyncThunk(
//   'statusData',
//   async (data, {rejectWithValue}) => {
//     try {
//       const result = await myAxios.get(data.endPoint);
//         return result;
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   },
// );

const gameStatus = createSlice({
    name: 'gameStatus',
    initialState: {
        gameStatus: false,
        loadingStatus: false,
        statusesSkeleton: false,
        statuses: []
    },
    reducers: {
        showGameStatus: (state, action) => {
            state.gameStatus = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchStories.pending, (state) => {
            state.loadingStatus = true;
        });
        builder.addCase(fetchStories.fulfilled, (state, action) => {
            state.loadingStatus = false;
            state.statuses = action.payload;
            state.statusesSkeleton = true;
        });
        builder.addCase(fetchStories.rejected, (state, action) => {
            state.loadingStatus = false;
            state.statuses = action.payload;
        });
    }
});
export const { showGameStatus } = gameStatus.actions;
export default gameStatus.reducer;

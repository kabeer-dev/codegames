import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import global from '../../../assets/images/landing/world.svg';
import russia from '../../../assets/images/landing/Russia.svg';
import kaza from '../../../assets/images/landing/kazakhstan.svg';

export const fetchRegion = createAsyncThunk('fetchRegion', async () => {
    let region = { name: '', flg: '' };
    let currency = { name: 'USD' };
    try {
        const response = await fetch('https://ipinfo.io/json');
        const data = await response.json();

        if (data.country === 'RU') {
            region = { name: 'Russia', flg: russia };
            currency = { name: 'Rub' };
        } else if (data.country === 'KZ') {
            region = { name: 'Kazakhstan', flg: kaza };
            currency = { name: 'KZT' };
        } else {
            region = { name: 'Global', flg: global };
            currency = { name: 'USD' };
        }
    } catch (error) {
        console.error('Error fetching Region:', error);
        throw error;
    }
    return { region: region, currency: currency };
});

const mobileDropDownView = createSlice({
    name: 'mobileDropDownView',
    initialState: {
        dropDownStatus: false,
        title: '',
        data: {},
        dropDownType: '',
        selectedCountryName: { name: '', flg: '' },
        selectCurrency: { name: '' }
    },
    reducers: {
        changeMobileDropDownView: (state, action) => {
            state.dropDownStatus = action.payload.status;
            state.title = action.payload.title;
            state.data = action.payload.data;
            state.dropDownType = action.payload.dropDownType;
        },
        selectCountry: (state, action) => {
            state.selectedCountryName.name = action.payload.name;
            state.selectedCountryName.flg = action.payload.flg;
        },
        selectCurrencyData: (state, action) => {
            state.selectCurrency.name = action.payload.name;
        }
    },

    extraReducers: (builder) => {
        builder.addCase(fetchRegion.pending, (state, action) => {
            state.selectedCountryName = { name: '', flg: '' };
            state.selectCurrency = { name: '' };
        });
        builder.addCase(fetchRegion.fulfilled, (state, action) => {
            state.selectedCountryName = action.payload.region;
            state.selectCurrency = action.payload.currency;
        });
        builder.addCase(fetchRegion.rejected, (state, action) => {
            console.error('Error', 'Gettig Region error.');
        });
    }
});
export const { changeMobileDropDownView, selectCountry, selectCurrencyData } = mobileDropDownView.actions;
export default mobileDropDownView.reducer;

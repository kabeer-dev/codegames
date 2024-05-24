// third-party
import { combineReducers } from 'redux';
// project imports
import snackbarReducer from './slices/snackbar';
import menuReducer from './slices/menu';
import changeSkelton from './slices/landing/skeltonShow';
import changeMobileScreen from './slices/landing/showMobileScreen';
import showStatus from './slices/landing/showStatus';
import GalleryReducer from './slices/landing/galleryModal';
import PaymantReducer from './slices/landing/paymentMethod';
import mobileDropDownView from './slices/landing/showMobileDropDown';
import productDetail from './slices/landing/productDetail';
import Email from './slices/landing/Email';

// ==============================|| COMBINE REDUCER ||============================== //
const reducer = combineReducers({
    snackbar: snackbarReducer,
    menu: menuReducer,

    changeSkelton: changeSkelton,
    changeMobileScreen: changeMobileScreen,
    showStatus: showStatus,
    gallery: GalleryReducer,
    paymentCompCheck: PaymantReducer,
    mobileDropDown: mobileDropDownView,
    productDetail: productDetail,
    email: Email
});

export default reducer;

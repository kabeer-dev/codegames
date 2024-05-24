import React, { useEffect } from 'react';
import SEOBlock from '../../../../ui-component/landing/Components/SEOBlock';
import { Grid } from '@mui/material';
import MightLike from '../../../../ui-component/landing/Components/MightLike';
import HeaderPubgPurchase from './HeaderPubgPurchase';
import PubgPurchaseDetail from './PubgPurchaseDetail';
import DrawerAppBar from '../../../../layout/landing/HomePageLayout';
import Footer from '../../../../layout/landing/HomePageFooter';
import { bodyBgColor } from '../../../../ui-component/landing/constants/style';
import { useDispatch, useSelector } from 'react-redux';
import MobileLanding from '../homePages/MobileLandingModel';
import MobileDropDown from '../homePages/MobileDropDown';
import myAxios from '../../../../axios';
import { AddProductDetail } from '../../../../store/slices/landing/productDetail';
import { AddProductGameDetail } from '../../../../store/slices/landing/productDetail';
import { AddProductCustomPrice } from '../../../../store/slices/landing/productDetail';
// import { paymentComponent } from '../../../../store/slices/landing/paymentMethod'
import { useNavigate } from 'react-router-dom';

const PUBGPurchase = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { status } = useSelector((state) => state.changeMobileScreen);
    const { dropDownStatus } = useSelector((state) => state.mobileDropDown);
    const { payFooter } = useSelector((state) => state.paymentCompCheck);
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    useEffect(() => {
        const getPubgPageProducts = async () => {
            try {
                const response = await myAxios.get('/nonAuth/pubg-page-product');
                if (response.status === 200) {
                    if (response.data.data.results.length > 0) {
                        // dispatch(paymentComponent('wooppay'))
                        const twoDifitPrice = response.data.data.results[0].products[0].customPrice.toFixed(2);
                        dispatch(AddProductDetail(response.data.data.results[0]));
                        dispatch(AddProductGameDetail(response.data.data.results[0].products[0].product));
                        dispatch(AddProductCustomPrice(twoDifitPrice));
                    } else {
                        navigate('/');
                    }
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        getPubgPageProducts();
        return () => {
            // dispatch(paymentComponent(null))
            dispatch(AddProductDetail(null));
            dispatch(AddProductGameDetail(null));
            dispatch(AddProductCustomPrice(''));
        };
    }, []);
    return (
        <Grid sx={{ ...bodyBgColor }}>
            <MobileDropDown />
            <Grid
                sx={{
                    display: dropDownStatus ? 'none' : 'block'
                }}
            >
                <MobileLanding />
                <Grid
                    sx={{
                        display: dropDownStatus || payFooter ? 'none' : 'block'
                    }}
                >
                    <DrawerAppBar />
                </Grid>
                <Grid
                    sx={{
                        display: status ? 'none' : 'block'
                    }}
                >
                    <HeaderPubgPurchase />
                    <PubgPurchaseDetail />
                    <Grid sx={{ pt: { lg: 2, xs: 1 } }}>
                        <MightLike />
                    </Grid>
                    <Grid sx={{ pt: { lg: 1.7, sm: 0, xs: 2 } }}>
                        <SEOBlock />
                    </Grid>
                    <Grid
                        sx={{
                            background: 'rgba(131, 151, 195, 0.1)',
                            borderRadius: { sm: 0, xs: '16px 16px 0px 0px' }
                        }}
                    >
                        <Footer />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default PUBGPurchase;

import React, { useEffect } from 'react';
import DrawerAppBar from '../../../../layout/landing/HomePageLayout';
import Footer from '../../../../layout/landing/HomePageFooter';
import SEOBlock from '../../../../ui-component/landing/Components/SEOBlock';
import BannerImg from './BannerImg';
import { Grid } from '@mui/material';
import MightLike from '../../../../ui-component/landing/Components/MightLike';
import GameImageSlider from './GameImageSlider';
import GameDetail from './GameDetail';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { AddProductDetail } from '../../../../store/slices/landing/productDetail';
import { AddProductGameDetail } from '../../../../store/slices/landing/productDetail';
import { AddProductCustomPrice } from '../../../../store/slices/landing/productDetail';
import { bodyBgColor } from '../../../../ui-component/landing/constants/style';
import { useSelector } from 'react-redux';
import MobileLanding from '../homePages/MobileLandingModel';
import MobileDropDown from '../homePages/MobileDropDown';
import { paymentComponent } from '../../../../store/slices/landing/paymentMethod';

const GamePurchase = () => {
    const { status } = useSelector((state) => state.changeMobileScreen);
    const { dropDownStatus } = useSelector((state) => state.mobileDropDown);
    const { payFooter } = useSelector((state) => state.paymentCompCheck);
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const data = location.state;
    useEffect(() => {
        if (!data) {
            navigate('/');
        } else {
            dispatch(paymentComponent('wooppay'))
            const twoDifitPrice = data.products[0].customPrice.toFixed(2);
            dispatch(AddProductDetail(data));
            dispatch(AddProductGameDetail(data.products[0].product));
            dispatch(AddProductCustomPrice(twoDifitPrice));
        }
        return () => {
            // dispatch(paymentComponent(''))
            dispatch(AddProductDetail(null));
            dispatch(AddProductGameDetail(null));
            dispatch(AddProductCustomPrice(''));
        };
    }, []);
    useEffect(() => {
        window.scrollTo(0, 0);
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
                    <BannerImg />
                    <GameImageSlider />
                    <GameDetail />
                    <Grid sx={{ pt: { lg: 5, sm: 2, xs: 1 } }}>
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

export default GamePurchase;

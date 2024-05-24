import React, { useEffect } from 'react';
import DrawerAppBar from '../../../../layout/landing/HomePageLayout';
import Footer from '../../../../layout/landing/HomePageFooter';
import SEOBlock from '../../../../ui-component/landing/Components/SEOBlock';
import { Grid } from '@mui/material';
import MightLike from '../../../../ui-component/landing/Components/MightLike';
import BannerImage from './BannerImage';
import SteamDetail from './steamDetail';
import { bodyBgColor } from '../../../../ui-component/landing/constants/style';
import { useSelector } from 'react-redux';
import MobileLanding from '../homePages/MobileLandingModel';
import MobileDropDown from '../homePages/MobileDropDown';

const SteamPurchase = () => {
    const { status } = useSelector((state) => state.changeMobileScreen);
    const { dropDownStatus } = useSelector((state) => state.mobileDropDown);
    const { payFooter } = useSelector((state) => state.paymentCompCheck);
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
                    <BannerImage />
                    <SteamDetail />
                    <MightLike />
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

export default SteamPurchase;

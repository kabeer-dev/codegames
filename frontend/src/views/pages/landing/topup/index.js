import { CardMedia, Grid, useMediaQuery, Card, CardContent, Typography } from '@mui/material';
import React, { useEffect } from 'react'
import { bodyBgColor } from 'ui-component/landing/constants/style';
import MainImage from 'assets/images/landing/gamesApi/mainImage.png'
import { useDispatch, useSelector } from 'react-redux';
import { changeMobile } from 'store/slices/landing/showMobileScreen';
import { changeMobileDropDownView } from 'store/slices/landing/showMobileDropDown';
import MobileDropDown from '../homePages/MobileDropDown';
import MobileLanding from '../homePages/MobileLandingModel';
import DrawerAppBar from 'layout/landing/HomePageLayout';
import Footer from 'layout/landing/HomePageFooter';
import { containerSpace } from 'ui-component/landing/constants/style';
import { Container } from '@mui/system';
import SEOBlock from 'ui-component/landing/Components/SEOBlock';
import { ServicetextSx } from 'ui-component/landing/constants/homepageSx';
import TopupImg1 from 'assets/images/landing/top-up/direct-topup/img1.PNG'
import TopupImg2 from 'assets/images/landing/top-up/direct-topup/img2.PNG'
import giftCardImg1 from 'assets/images/landing/top-up/gift-cards/img1.PNG'
import giftCardImg2 from 'assets/images/landing/top-up/gift-cards/img2.PNG'
import giftCardImg3 from 'assets/images/landing/top-up/gift-cards/img3.PNG'
import giftCardImg4 from 'assets/images/landing/top-up/gift-cards/img4.PNG'
import giftCardImg5 from 'assets/images/landing/top-up/gift-cards/img5.PNG'
import giftCardImg6 from 'assets/images/landing/top-up/gift-cards/img6.PNG'

const directTopupData = [
    {
        image: TopupImg1,
        name: 'Nintendo eShop'
    },
    {
        image: TopupImg2,
        name: 'Netflix'
    }
]

const giftCardsData = [
    {
        image: giftCardImg1,
        name: 'Brawl Stars'
    },
    {
        image: giftCardImg2,
        name: 'Plants vs. Zombees'
    },
    {
        image: giftCardImg3,
        name: 'Roblox'
    },
    {
        image: giftCardImg4,
        name: 'Pubg mobile'
    },
    {
        image: giftCardImg5,
        name: 'Pubg New State'
    },
    {
        image: giftCardImg6,
        name: 'Call of Duty'
    },
    {
        image: giftCardImg1,
        name: 'Brawl Stars'
    },
    {
        image: giftCardImg3,
        name: 'Roblox'
    },
    {
        image: giftCardImg2,
        name: 'Plants vs. Zombees'
    },
    {
        image: giftCardImg4,
        name: 'Pubg mobile'
    },
    {
        image: giftCardImg5,
        name: 'Pubg New State'
    },
    {
        image: giftCardImg6,
        name: 'Call of Duty'
    },
    {
        image: giftCardImg1,
        name: 'Brawl Stars'
    },

]

const Topup = () => {
    const dispatch = useDispatch();
    const { status } = useSelector((state) => state.changeMobileScreen);
    const { dropDownStatus } = useSelector((state) => state.mobileDropDown);
    const { payFooter } = useSelector((state) => state.paymentCompCheck);
    const isSmallScreen = useMediaQuery('(max-width:600px)');

    useEffect(() => {
        window.scrollTo(0, 0);
        if (status) {
            dispatch(changeMobile(isSmallScreen));
        }
        if (dropDownStatus) {
            dispatch(
                changeMobileDropDownView({
                    status: isSmallScreen,
                    title: '',
                    data: {}
                })
            );
        }
    }, [isSmallScreen]);

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
            </Grid>

            <Container
                maxWidth="xl"
                sx={{
                    pt: { md: 15.5, sm: 21.5, xs: 10.4 },
                    ...containerSpace
                }}
            >
                <Grid container>
                    <Grid item xs={12}>
                        <Typography sx={{ color: '#8C95AD', fontFamily: 'Nunito Sans', fontSize: '14px', fontWeight: '600' }}>
                            Home &nbsp; | &nbsp; Mobile games
                        </Typography>
                    </Grid>

                    <Grid item xs={12} sx={{ mt: 4 }}>
                        <Typography
                            sx={{
                                width: { sm: '75%', xs: '96%' },
                                ...ServicetextSx,
                                fontWeight: { sm: 700, xs: 400 }
                            }}
                        >
                            Direct Top-up
                        </Typography>
                    </Grid>

                    <Grid container spacing={2} sx={{ mt: 1 }}>
                        {directTopupData.map((data) => (
                            <Grid item md={1.33} sm={2} xs={3}>
                                <CardMedia component='img' image={data.image} alt='img' sx={{ height: {lg: '120px', sm: '100px', xs: '70px'}, borderRadius: {sm: '25px', xs: '15px'} }} />
                                <Typography sx={{ mt: {sm: 2, xs: 1}, px: {sm: '15px', xs: '5px'}, color: '#FFFFFF', fontFamily: 'Nunito Sans', fontSize: {sm: '16px', xs: '12px'}, fontWeight: {sm: '600', xs: '400'}, textAlign: 'center' }}>
                                    {data.name}
                                </Typography>
                            </Grid>
                        ))}
                    </Grid>

                    <Grid item xs={12} sx={{ mt: 5 }}>
                        <Typography
                            sx={{
                                width: { sm: '75%', xs: '96%' },
                                ...ServicetextSx,
                                fontWeight: { sm: 700, xs: 400 }
                            }}
                        >
                            By Gift Cards
                        </Typography>
                    </Grid>

                    <Grid container spacing={2} sx={{ mt: 1 }}>
                        {giftCardsData.map((data) => (
                            <Grid item md={1.33} sm={2} xs={3}>
                                <CardMedia component='img' image={data.image} alt='img' sx={{ height: {lg: '120px', sm: '100px', xs: '70px'}, borderRadius: {sm: '25px', xs: '15px'} }} />
                                <Typography sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', mt: {sm: 2, xs: 1}, px: {sm: '15px', xs: '5px'}, color: '#FFFFFF', fontFamily: 'Nunito Sans', fontSize: {sm: '16px', xs: '12px'}, fontWeight: {sm: '600', xs: '400'}, textAlign: 'center' }}>
                                    {data.name}
                                </Typography>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>

            </Container>

            <Grid sx={{ mt: { sm: 5.3, xs: 3 } }}>
                <SEOBlock />
            </Grid>

            <Grid
                sx={{
                    mt: 5,
                    background: 'rgba(131, 151, 195, 0.1)',
                    borderRadius: { sm: 0, xs: '16px 16px 0px 0px' }
                }}
            >
                <Footer />
            </Grid>

        </Grid>
    )
}

export default Topup
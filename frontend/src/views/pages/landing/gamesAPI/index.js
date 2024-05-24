import { CardMedia, Grid, useMediaQuery, Card, CardActions, CardContent, Typography } from '@mui/material';
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
import CardImage1 from 'assets/images/landing/gamesApi/cardImage1.png'
import CardImage2 from 'assets/images/landing/gamesApi/cardImage2.png'
import CardImage3 from 'assets/images/landing/gamesApi/cardImage3.png'

const cardsData = [
    {
        image: CardImage1,
        name: "Get access to a huge database\nof games",
        text: "Over 10,000 games and accounts are\navailable for instant purchase."
    },
    {
        image: CardImage2,
        name: "Replenishment of Steam accounts,\nand popular mobile games",
        text: "Favorable terms, instant deposits\nand the best commissions on the global market"
    },
    {
        image: CardImage3,
        name: "A whole world\nof gift cards:",
        text: "You will be surprised by the pleasant prices for\ngift cards for gaming platforms and services"
    }
]

const GameAPI = () => {
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
                <Grid item xs={12}>
                    <CardMedia component='img' image={MainImage} alt='mainImage' />
                </Grid>

                <Grid item xs={12} sx={{ mt: 2 }}>
                    <Grid container spacing={2}>
                        {cardsData.map((data, index) => (
                            <Grid key={index} item xs={4}>
                                <Card sx={{ minHeight: '431px', backgroundColor: '#000000' }}>
                                    <CardMedia
                                        sx={{ height: 229 }}
                                        image={data.image}
                                        title="green iguana"
                                    />
                                    <CardContent sx={{ mt: 3 }}>
                                        <Typography gutterBottom component="div" sx={{ whiteSpace: 'pre-line', color: '#FFFFFF', fontFamily: 'Nunito Sans', fontSize: '20px', fontWeight: '800' }}>
                                            {data.name}
                                        </Typography>
                                        <Typography sx={{ mt: 3, color: '#FFFFFF', fontFamily: 'Nunito Sans', fontSize: '16px', fontWeight: '400' }}>
                                            {data.text}
                                        </Typography>
                                    </CardContent>
                                    {/* <CardActions>
                                        <Button size="small">Share</Button>
                                        <Button size="small">Learn More</Button>
                                    </CardActions> */}
                                </Card>
                            </Grid>
                        ))}

                    </Grid>
                </Grid>
            </Container>

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

export default GameAPI
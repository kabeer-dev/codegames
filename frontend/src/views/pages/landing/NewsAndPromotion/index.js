import React, { useEffect } from 'react';
import SEOBlock from '../../../../ui-component/landing/Components/SEOBlock';
import { Container, Grid, Typography, Card, CardMedia } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Skelton from '../../../../ui-component/landing/Components/Skelton';
import { containerSpace } from '../../../../ui-component/landing/constants/style';
import { newsPromotion } from '../../../../ui-component/landing/Data/NewsData';
import {
    newsAndPromotionTitle,
    newsAndPromotionWrap,
    newsAndPromotionCard,
    newsAndPromotionImg,
    newsAndPromotionTxt,
    newsAndPromotionDesc,
    newsAndPromotionDate
} from '../../../../ui-component/landing/constants/NewsSx';
import DrawerAppBar from '../../../../layout/landing/HomePageLayout';
import Footer from '../../../../layout/landing/HomePageFooter';
import { bodyBgColor } from '../../../../ui-component/landing/constants/style';
import MobileLanding from '../homePages/MobileLandingModel';
import MobileDropDown from '../homePages/MobileDropDown';

const NewsAndPermotion = () => {
    const { status } = useSelector((state) => state.changeMobileScreen);
    const { dropDownStatus } = useSelector((state) => state.mobileDropDown);
    const { payFooter } = useSelector((state) => state.paymentCompCheck);
    const navigate = useNavigate();
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
                    <Container
                        maxWidth="xl"
                        sx={{
                            pt: true ? { md: 15.5, sm: 23, xs: 12.3 } : '20px',
                            ...containerSpace
                        }}
                    >
                        <Grid
                            container
                            sx={{
                                ...newsAndPromotionWrap
                            }}
                        >
                            <Typography>Home | </Typography>
                            <Typography sx={{ pl: 1 }}> News and promotions</Typography>
                        </Grid>
                        <Grid sx={{ pt: { sm: 4.5, xs: 2 }, pb: { sm: 1, xs: 0 } }}>
                            {true ? (
                                <Typography
                                    sx={{
                                        ...newsAndPromotionTitle
                                    }}
                                >
                                    News and promotions
                                </Typography>
                            ) : (
                                <Skelton
                                    style={{
                                        width: { md: '30%', xs: '70%' },
                                        height: 40
                                    }}
                                />
                            )}
                        </Grid>
                        <Grid container spacing={2} sx={{ pt: { md: 3.5, xs: 2 }, pb: 5 }}>
                            {newsPromotion.map((card, index) => (
                                <Grid key={index} item lg={3} md={4} sm={6} xs={12}>
                                    {true ? (
                                        <Card
                                            sx={{
                                                ...newsAndPromotionCard
                                            }}
                                            onClick={() => navigate('/news')}
                                        >
                                            <CardMedia
                                                component="img"
                                                sx={{
                                                    ...newsAndPromotionImg
                                                }}
                                                image={card.imageSrc}
                                                alt="Paella dish"
                                            />
                                            <Typography
                                                sx={{
                                                    ...newsAndPromotionTxt
                                                }}
                                            >
                                                {card.name}
                                            </Typography>
                                            <Typography
                                                sx={{
                                                    ...newsAndPromotionDesc
                                                }}
                                            >
                                                {card.desc}
                                            </Typography>
                                            <Typography
                                                sx={{
                                                    ...newsAndPromotionDate
                                                }}
                                            >
                                                {card.date}
                                            </Typography>
                                        </Card>
                                    ) : (
                                        <>
                                            <Skelton
                                                style={{
                                                    width: '100%',
                                                    height: '187px'
                                                }}
                                            />
                                            <Skelton
                                                style={{
                                                    mt: 2.5,
                                                    width: '70%',
                                                    height: '36px'
                                                }}
                                            />
                                            <Skelton
                                                style={{
                                                    mt: 1.5,
                                                    width: '50%',
                                                    height: '30px'
                                                }}
                                            />
                                            <Skelton
                                                style={{
                                                    mt: 1.5,
                                                    width: '190px',
                                                    height: '20px'
                                                }}
                                            />
                                        </>
                                    )}
                                </Grid>
                            ))}
                        </Grid>
                    </Container>
                    <Grid>
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

export default NewsAndPermotion;

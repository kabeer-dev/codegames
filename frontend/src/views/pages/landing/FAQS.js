import React, { useEffect } from 'react';
import whiteTele from '../../../assets/images/landing/telegram1.svg';
import { Container, Grid, Typography, Button, CardMedia } from '@mui/material';
import FAQS from '../../../ui-component/landing/Components/Faqs';
import { containerSpace } from '../../../ui-component/landing/constants/style';
import DrawerAppBar from '../../../layout/landing/HomePageLayout';
import Footer from '../../../layout/landing/HomePageFooter';
import { bodyBgColor } from '../../../ui-component/landing/constants/style';
import { FaqsTitle, FaqsBtn, FaqsBtnImg, FaqsBtnTxt, FaqsBtnWrap } from '../../../ui-component/landing/constants/FaqSx';
import { useSelector } from 'react-redux';
import MobileLanding from './homePages/MobileLandingModel';
import MobileDropDown from './homePages/MobileDropDown';
const FAQs = () => {
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
                    <Container
                        maxWidth="xl"
                        sx={{
                            ...containerSpace,
                            // pt: skeltonStatus ? { md: 20.5, sm: 28, xs: 13.3 } : '20px',
                            pt: { md: 20.5, sm: 28, xs: 13.3 },
                            pb: { lg: 12, md: 10, xs: 3 }
                        }}
                    >
                        <Grid sx={{ width: { xl: '92%', xs: '100%' } }}>
                            <Grid sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography
                                    sx={{
                                        ...FaqsTitle
                                    }}
                                >
                                    FAQ
                                </Typography>
                                <Grid>
                                    <Button
                                        sx={{
                                            ...FaqsBtn
                                        }}
                                    >
                                        <Grid
                                            sx={{
                                                ...FaqsBtnWrap
                                            }}
                                        >
                                            <CardMedia
                                                component="img"
                                                image={whiteTele}
                                                alt="not"
                                                sx={{
                                                    ...FaqsBtnImg
                                                }}
                                            />
                                        </Grid>

                                        <Typography
                                            variant="overline"
                                            sx={{
                                                ...FaqsBtnTxt
                                            }}
                                        >
                                            Official Telegram
                                        </Typography>
                                    </Button>
                                </Grid>
                            </Grid>
                            <Grid sx={{ pt: 4 }}>
                                <FAQS padd={{ sm: 1, xs: 0 }} />
                            </Grid>
                        </Grid>
                    </Container>
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

export default FAQs;

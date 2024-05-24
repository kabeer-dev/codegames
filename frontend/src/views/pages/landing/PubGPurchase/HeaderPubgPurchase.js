import { Container, Grid, Typography, Skeleton, CardMedia } from '@mui/material';
import React from 'react';
import { BannerContSpace, skeltonColor } from '../../../../ui-component/landing/constants/style';
import { useSelector } from 'react-redux';
import GppMaybeIcon from '@mui/icons-material/GppMaybe';
import {
    pubgPurHead,
    pubgPurHeadTxtWrap,
    pubgPurHeadTxt,
    pubgPurHeadPreTxt,
    pubgPurHeadDesc,
    pubgPurHeadIcon,
    pubgPurHeadGradient
} from '../../../../ui-component/landing/constants/PubgSx';
import DescriptionLength from '../../../../ui-component/landing/Components/DescriptionLength';

const HeaderPubgPurchase = () => {
    const { productDetail } = useSelector((state) => state.productDetail);
    const { productGameDetail } = useSelector((state) => state.productDetail);
    return (
        <Container
            maxWidth="xl"
            sx={{
                pt: productDetail && productGameDetail ? { md: 15.5, sm: 23, xs: 8.5 } : '20px',
                ...BannerContSpace
            }}
        >
            {productDetail && productGameDetail ? (
                <Grid
                    container
                    sx={{
                        display: 'flex',
                        borderRadius: { sm: 4, xs: 0 },
                        overflow: 'hidden'
                    }}
                >
                    <Grid
                        sx={{
                            backgroundImage: `url(${productDetail.coverImages[0]})`,
                            ...pubgPurHead
                        }}
                    >
                        <Grid
                            sx={{
                                ...pubgPurHeadGradient
                            }}
                        ></Grid>

                        <Grid
                            container
                            sx={{
                                ...pubgPurHeadTxtWrap
                            }}
                        >
                            <Grid item xl={2} lg={2.5} md={3} sm={3} xs={3.5} sx={{ display: 'flex', justifyContent: 'center' }}>
                                <CardMedia
                                    component="img"
                                    image={productDetail.thumnailImage}
                                    alt="not"
                                    sx={{
                                        ...pubgPurHeadIcon
                                    }}
                                />
                            </Grid>
                            <Grid
                                item
                                xl={10}
                                lg={9}
                                md={9}
                                sm={9}
                                xs={8.5}
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                    px: { sm: 0, xs: 0.8 }
                                }}
                            >
                                <Grid sx={{ display: { sm: 'flex', xs: 'none' } }}>
                                    <GppMaybeIcon sx={{ height: '16px', width: '16px' }} />
                                    <Typography
                                        sx={{
                                            ...pubgPurHeadPreTxt
                                        }}
                                    >
                                        Official partner
                                    </Typography>
                                </Grid>
                                <Typography
                                    sx={{
                                        ...pubgPurHeadTxt
                                    }}
                                >
                                    {productDetail.name}
                                </Typography>
                                <Typography
                                    sx={{
                                        ...pubgPurHeadDesc
                                    }}
                                >
                                    <DescriptionLength title={productDetail.description} />
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            ) : (
                <Skeleton
                    variant="rectangular"
                    width="100%"
                    sx={{
                        ...skeltonColor,
                        height: { sm: '355px', xs: '184px' }
                    }}
                />
            )}
        </Container>
    );
};

export default HeaderPubgPurchase;

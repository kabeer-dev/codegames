import { Container, Grid, Typography, Skeleton, CardMedia } from '@mui/material';
import React from 'react';
import { BannerContSpace, skeltonColor } from '../../../../ui-component/landing/constants/style';
import { useSelector } from 'react-redux';
import {
    steamgiftHead,
    steamgiftHeadGradient,
    steamgiftHeadTitleWrap,
    steamgiftHeadTitle,
    steamgiftHeadDesc,
    steamgiftHeadIcon
} from '../../../../ui-component/landing/constants/SteamSx';
import DescriptionLength from '../../../../ui-component/landing/Components/DescriptionLength';

const HeaderImage = () => {
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
                <>
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
                                background: `url(${productDetail.coverImages[0]})`,
                                ...steamgiftHead
                            }}
                        >
                            <Grid
                                sx={{
                                    ...steamgiftHeadGradient
                                }}
                            ></Grid>

                            <Grid
                                container
                                sx={{
                                    ...steamgiftHeadTitleWrap
                                }}
                            >
                                <Grid
                                    item
                                    xl={2}
                                    lg={2.5}
                                    md={2.5}
                                    sm={3}
                                    xs={3.5}
                                    sx={{ pt: { lg: 9, md: 2, xs: 0 }, display: 'flex', justifyContent: 'center' }}
                                >
                                    <CardMedia
                                        component="img"
                                        image={productDetail.thumnailImage}
                                        alt="not"
                                        sx={{
                                            ...steamgiftHeadIcon
                                        }}
                                    />
                                </Grid>
                                <Grid item xl={5.7} lg={4.5} md={4.5} xs={8.5} sx={{ pt: { lg: 9, md: 2, xs: 0 }, px: { sm: 0, xs: 1.2 } }}>
                                    <Typography
                                        sx={{
                                            ...steamgiftHeadTitle
                                        }}
                                    >
                                        {productDetail.name}
                                    </Typography>
                                    <Typography
                                        sx={{
                                            ...steamgiftHeadDesc
                                        }}
                                    >
                                        <DescriptionLength title={productDetail.description} />
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </>
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

export default HeaderImage;

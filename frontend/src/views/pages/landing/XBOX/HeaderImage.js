import { Container, Grid, Typography, Skeleton, CardMedia, Box } from '@mui/material';
import React from 'react';
import headerImg from '../../../../assets/images/landing/XboxCar.svg';
import img1 from '../../../../assets/images/landing/Xboxicon.svg';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { BannerContSpace, skeltonColor } from '../../../../ui-component/landing/constants/style';
import { Xboxproperties } from '../../../../ui-component/landing/Data/XboxData';
import {
    xboxHeadImgWrap,
    xboxHeadImg,
    xboxHeadImgTitle,
    xboxHeadImgTitleWrap,
    xboxHeadImgDesc,
    xboxHeadImgIcon,
    xboxHeadIconTxtWrap,
    xboxHeadIconTxt,
    xboxHeadDetail,
    xboxHeadDetailXs,
    xboxHeadGradient
} from '../../../../ui-component/landing/constants/XboxSx';
import DescriptionLength from '../../../../ui-component/landing/Components/DescriptionLength';

const title =
    'Join Xbox Game Pass and play hundreds of high-quality console and PC games for one low monthly fee. EA Play subscription included';
export const HeaderDetaial = () => {
    return (
        <>
            {Xboxproperties.map((data, index) => (
                <Box
                    key={index}
                    sx={{
                        display: 'flex',
                        pr: { sm: 2, xs: 1 }
                    }}
                >
                    <Grid
                        sx={{
                            ...xboxHeadIconTxtWrap
                        }}
                    >
                        <FontAwesomeIcon
                            icon={data.icon}
                            style={{ color: '#FFFF', width: '20px', height: '24px' }}
                            className="gameePurchasefont"
                        />
                    </Grid>
                    <Typography
                        sx={{
                            ...xboxHeadIconTxt
                        }}
                    >
                        {data.desc}
                    </Typography>
                </Box>
            ))}
        </>
    );
};

const HeaderImage = () => {
    const { skeltonStatus } = useSelector((state) => state.changeSkelton);
    return (
        <Container
            maxWidth="xl"
            sx={{
                pt: skeltonStatus ? { md: 15.5, sm: 23, xs: 8.5 } : '20px',
                ...BannerContSpace
            }}
        >
            {skeltonStatus ? (
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
                                backgroundImage: `url(${headerImg})`,
                                ...xboxHeadImg
                            }}
                        >
                            <Grid
                                sx={{
                                    ...xboxHeadGradient
                                }}
                            ></Grid>
                            <Grid
                                container
                                sx={{
                                    ...xboxHeadImgWrap
                                }}
                            >
                                <Grid item xl={2} lg={2.5} md={3} sm={3} xs={3.5} sx={{ py: 1, display: 'flex', justifyContent: 'center' }}>
                                    <CardMedia
                                        component="img"
                                        image={img1}
                                        alt="not"
                                        sx={{
                                            ...xboxHeadImgIcon
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
                                        ...xboxHeadImgTitleWrap,
                                        px: { sm: 0, xs: 0.8 }
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            ...xboxHeadImgTitle
                                        }}
                                    >
                                        Xbox Game Pass Ultimate 1 month (Turkey)
                                    </Typography>
                                    <Typography
                                        sx={{
                                            ...xboxHeadImgDesc
                                        }}
                                    >
                                        <DescriptionLength title={title} />
                                    </Typography>

                                    <Grid
                                        container
                                        sx={{
                                            ...xboxHeadDetail
                                        }}
                                    >
                                        <HeaderDetaial />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid
                        container
                        sx={{
                            ...xboxHeadDetailXs
                        }}
                    >
                        <HeaderDetaial />
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

import { Container, Grid, Typography, Skeleton, CardMedia, Box, useMediaQuery } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { BannerContSpace, skeltonColor } from '../../../../ui-component/landing/constants/style';
import {
    gamePurchaseBanner,
    gamePurchaseBannerTxt,
    gamePurchaseBannerDesc,
    gamePurchaseDetailIcon,
    gamePurchaseDetailSx,
    gamePurchaseBannerIcon,
    gamePurchaseBannerIconWrap,
    gamePurchaseBannerDet,
    gamePurchaseBannerDetTxt,
    gamePurchaseGradient
} from '../../../../ui-component/landing/constants/GamePurchaseSX';
import defaultImage from '../../../../assets/images/landing/default-noImage.jpg';
import { faEarthAmericas } from '@fortawesome/free-solid-svg-icons';
import DescriptionLength from '../../../../ui-component/landing/Components/DescriptionLength';
import image from 'assets/images/landing/Year18.svg';
import { faSteam, faXbox, faPlaystation } from '@fortawesome/free-brands-svg-icons';
import { faDesktop } from '@fortawesome/free-solid-svg-icons';
import CountryDropDown from 'ui-component/landing/Components/CountryDropDown'
import {
    HeaderDropDown,
    HeaderDropDownTxt
} from 'ui-component/landing/constants/LayoutSx';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import GlobalFlag from 'assets/images/landing/countryFlags/global.png';
import KzFlag from 'assets/images/landing/countryFlags/kazakhstan.png';
import RuFlag from 'assets/images/landing/countryFlags/Russia.png';
import TdFlag from 'assets/images/landing/countryFlags/tajikistan.png';
import AmFlag from 'assets/images/landing/countryFlags/armenia.png';
import GrFlag from 'assets/images/landing/countryFlags/georgia.png';
import TrFlag from 'assets/images/landing/countryFlags/turkey.png';

import PlaystationImage from 'assets/images/landing/platformImages/playstation.png'
import XboxImage from 'assets/images/landing/platformImages/xbox.png'
import SteamImage from 'assets/images/landing/platformImages/steam.png'

const countriesData = [
    {
        name: 'Global',
        flg: GlobalFlag
    },
    {
        name: 'Kazakhtan',
        flg: KzFlag
    },
    {
        name: 'Russia',
        flg: RuFlag
    },
    {
        name: 'Tadjikistan',
        flg: TdFlag
    },
    {
        name: 'Armenia',
        flg: AmFlag
    },
    {
        name: 'Georgia',
        flg: GrFlag
    },
    {
        name: 'Turkey',
        flg: TrFlag
    },
]

export const BannerDetaial = () => {
    const isMediumScreen = useMediaQuery('(min-width: 600px) and (max-width: 900px)');
    const { productDetail } = useSelector((state) => state.productDetail);
    const [anchorE2, setAnchorE2] = React.useState(null);
    const [selectedCountry, setSelectedCountry] = React.useState({name: 'Global', flg: GlobalFlag})

    return (
        productDetail && (
            <>
                <Box
                    sx={{
                        display: 'flex',
                        pr: { sm: 1, xs: 0 }
                    }}
                >
                    <Grid
                        sx={{
                            ...gamePurchaseBannerDet
                        }}
                    >
                        <FontAwesomeIcon
                            icon={
                                productDetail.products[0].product.platform === 'PlayStation 4' ||
                                    productDetail.products[0].product.platform === 'PlayStation 5'
                                    ? faPlaystation
                                    : productDetail.products[0].product.platform === 'XBOX ONE'
                                        ? faXbox
                                        : productDetail.products[0].product.platform === 'Steam'
                                            ? faSteam
                                            : faDesktop
                            }
                            style={{
                                color: 'rgba(209, 212, 219, 1)',
                                width: '20px',
                                height: '20px'
                            }}
                        />
                    </Grid>
                    <Typography
                        sx={{
                            ...gamePurchaseBannerDetTxt
                        }}
                    >
                        {productDetail.products[0].product.platform}
                    </Typography>
                </Box>

                <Box
                    sx={{
                        display: 'flex',
                        pr: { sm: 1, xs: 0 }
                    }}
                >

                    {/* <Grid
                        sx={{
                          
                        }}
                        onClick={(e) => {
                            setAnchorE2(e.currentTarget);
                        }}
                    >

                        <img src={selectedCountry.flg} alt="not"  />
                        <Typography
                            sx={{
                                px: 1,
                                ...HeaderDropDownTxt
                            }}
                        >
                            {isMediumScreen ? selectedCountry.name.substring(0, 3) : selectedCountry.name}
                        </Typography>
                        <ExpandMoreIcon />
                    </Grid>

                    <CountryDropDown
                        open={anchorE2}
                        close={() => {
                            setAnchorE2(null);
                        }}
                        arr={countriesData}
                        width={230}
                        selectedCountry={selectedCountry}
                        setSelectedCountry={setSelectedCountry}
                    /> */}
                    <Grid
                        sx={{
                            ...gamePurchaseBannerDet
                        }}
                    >
                        <FontAwesomeIcon
                            icon={faEarthAmericas}
                            style={{
                                color: 'rgba(209, 212, 219, 1)',
                                width: '20px',
                                height: '20px'
                            }}
                        />
                    </Grid> 
                    <Typography
                        sx={{
                            ...gamePurchaseBannerDetTxt
                        }}
                    >
                        {productDetail.products[0].product.regionalLimitations}
                    </Typography>
                </Box>
                
                <Box
                    sx={{
                        display: 'flex',
                        pr: { sm: 2, xs: 1 },
                        alignSelf: 'center'
                    }}
                >
                    <CardMedia
                        component="img"
                        image={image}
                        sx={{ height: { sm: '24px', xs: '28px' }, width: { sm: '24px', xs: '28px' } }}
                    />
                    <Typography
                        sx={{
                            display: 'flex',
                            ...gamePurchaseBannerDetTxt,
                            alignSelf: { sm: 'auto', xs: 'center' }
                        }}
                    >
                        <Box sx={{ display: { sm: 'flex', xs: 'none' } }}>Recommended</Box> &nbsp;from 18 years old
                    </Typography>
                </Box>
            </>
        )
    );
};

const BannerImg = () => {
    const { productDetail } = useSelector((state) => state.productDetail);
    let [headingName, name] = '';
    if (productDetail && productDetail.singleProduct) {
        [headingName, name] = productDetail.products[0].product.name.split(':');
    }
    return (
        <Container
            maxWidth="xl"
            sx={{
                pt: { md: 15.5, sm: 23, xs: 8.5 },
                ...BannerContSpace
            }}
        >
            {productDetail ? (
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
                                background: `url(${productDetail.singleProduct
                                    ? productDetail.products[0].product.screenshots &&
                                        productDetail.products[0].product.screenshots[0] &&
                                        productDetail.products[0].product.screenshots[0].url
                                        ? productDetail.products[0].product.screenshots[0].url_original
                                        : productDetail.products[0].product.images &&
                                            productDetail.products[0].product.images.screenshots &&
                                            productDetail.products[0].product.images.screenshots[0] &&
                                            productDetail.products[0].product.images.screenshots[0].url
                                            ? productDetail.products[0].product.images.screenshots[0].url
                                            : productDetail.products[0].product.images &&
                                                productDetail.images.cover &&
                                                productDetail.images.cover.url
                                                ? productDetail.products[0].product.images.cover.url
                                                : defaultImage
                                    : productDetail.coverImages[0]
                                    })`,

                                ...gamePurchaseBanner
                            }}
                        >
                            <Grid
                                sx={{
                                    ...gamePurchaseGradient
                                }}
                            ></Grid>

                            <Grid
                                container
                                sx={{
                                    ...gamePurchaseBannerIconWrap
                                }}
                            >
                                <Grid item xl={2} lg={2.5} md={3} sm={2.5} xs={3.5} sx={{ display: 'flex' }}>
                                    <CardMedia
                                        component="img"
                                        image={
                                            productDetail.singleProduct
                                                ? productDetail.products[0].product.coverImageOriginal
                                                    ? productDetail.products[0].product.coverImageOriginal
                                                    : productDetail.products[0].product.coverImage
                                                        ? productDetail.products[0].product.coverImage
                                                        : defaultImage
                                                : productDetail.thumnailImage
                                        }
                                        alt="not"
                                        sx={{
                                            ...gamePurchaseBannerIcon
                                        }}
                                        className="gamePurchaseImg"
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
                                        justifyContent: { sm: 'space-between', xs: 'space-around' }
                                    }}
                                >
                                    {productDetail.singleProduct ? (
                                        name ? (
                                            <Typography
                                                sx={{
                                                    ...gamePurchaseBannerTxt
                                                }}
                                            >
                                                {headingName}: <br />
                                                {name}
                                            </Typography>
                                        ) : (
                                            <Typography
                                                sx={{
                                                    ...gamePurchaseBannerTxt
                                                }}
                                            >
                                                {productDetail.name}
                                            </Typography>
                                        )
                                    ) : (
                                        <Typography
                                            sx={{
                                                ...gamePurchaseBannerTxt
                                            }}
                                        >
                                            {productDetail.singleProduct ? productDetail.products[0].product.name : productDetail.name}
                                        </Typography>
                                    )}
                                    <Typography sx={{ ...gamePurchaseBannerDesc }}>
                                        <DescriptionLength
                                            title={
                                                productDetail.singleProduct
                                                    ? productDetail.products[0].product.description
                                                        ? productDetail.products[0].product.description
                                                        : '«Призрачная свобода» — это сюжетное дополнение, привносящее элементы шпионского триллера в игру Cyberpunk 2077'
                                                    : productDetail.description
                                            }
                                        />
                                    </Typography>

                                    <Grid
                                        container
                                        sx={{
                                            ...gamePurchaseDetailIcon
                                        }}
                                    >
                                        <BannerDetaial />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid
                        container
                        sx={{
                            ...gamePurchaseDetailSx
                        }}
                    >
                        <BannerDetaial />
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

export default BannerImg;

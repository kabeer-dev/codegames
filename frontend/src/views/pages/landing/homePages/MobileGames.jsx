import { Button, CardMedia, Container, Grid, Skeleton, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { MobileGameSkelton } from '../../../../ui-component/landing/Data/HomePageData';
import { useNavigate } from 'react-router-dom';
import { BannerContSpace, skeltonBg } from '../../../../ui-component/landing/constants/style';
import {
    mobileGamHeadTxt,
    mobGamGridWrap,
    mobAndSubWrap,
    mobAndSubTxt,
    mobAndSubImgWrap,
    mobAndSubImg,
    mobGamBecButton,
    mobGamBecTxt,
    mobGamBecWrap
} from '../../../../ui-component/landing/constants/homepageSx';
import Skelton from '../../../../ui-component/landing/Components/Skelton';
import defaultImage from 'assets/images/landing/default-noImage.jpg';
// import TopAnimation from './Animation/TopAnimation';
import myAxios from '../../../../axios';

const MobileGames = () => {
    const navigate = useNavigate();
    const [mobileGames, setMobileGames] = useState([]);
    const [subAndPaymentGames, setSubAndPaymentGamesGames] = useState([]);
    const [gamesloading, setGamesLoading] = useState(false);
    useEffect(() => {
        const getMobileAndSubGames = async () => {
            const response = await myAxios.get('/nonAuth/mobile-and-sub-games');
            if (response && response.status === 200) {
                setMobileGames(response.data.data.mobile_results);
                setSubAndPaymentGamesGames(response.data.data.sub_results);
                setGamesLoading(true);
            }
        };
        getMobileAndSubGames();
    }, []);
    return (
        <>
            {gamesloading ? (
                mobileGames.length > 0 || subAndPaymentGames.length > 0 ? (
                    <Container
                        maxWidth="xl"
                        sx={{
                            mt: { md: 3, xs: 0 },
                            ...BannerContSpace
                        }}
                    >
                        {/* <TopAnimation> */}
                        <Grid container spacing={{ sm: 3, xs: 0 }} sx={{ py: { sm: 5, xs: 3 } }}>
                            {mobileGames.length > 0 ? (
                                <Grid item md={subAndPaymentGames.length > 0 ? 6 : 12} xs={12}>
                                    <Grid
                                        sx={{
                                            ...mobGamGridWrap
                                        }}
                                    >
                                        {gamesloading ? (
                                            <>
                                                <Typography
                                                    sx={{
                                                        ...mobileGamHeadTxt
                                                    }}
                                                >
                                                    Mobile games
                                                </Typography>
                                                <Grid sx={{ ...mobGamBecWrap }}>
                                                    <Button
                                                        sx={{
                                                            ...mobGamBecButton
                                                        }}
                                                    >
                                                        <Typography
                                                            sx={{
                                                                ...mobGamBecTxt
                                                            }}
                                                        >
                                                            All
                                                        </Typography>{' '}
                                                        <ChevronRightIcon />
                                                    </Button>
                                                </Grid>
                                            </>
                                        ) : (
                                            <>
                                                <Skeleton
                                                    width="40%"
                                                    height={60}
                                                    sx={{
                                                        backgroundColor: '#1B2037',
                                                        marginBottom: '10px'
                                                    }}
                                                />
                                                <Skeleton
                                                    width="15%"
                                                    height={60}
                                                    sx={{
                                                        backgroundColor: '#1B2037',
                                                        borderRadius: 6
                                                    }}
                                                />
                                            </>
                                        )}
                                    </Grid>
                                    <Grid sx={{ pt: { sm: 3, xs: 1.5 } }}>
                                        <Grid
                                            container
                                            sx={{
                                                ...mobAndSubWrap
                                            }}
                                        >
                                            <>
                                                {mobileGames.slice(0, subAndPaymentGames.length > 0 ? 10 : 20).map((data, index) => (
                                                    <Grid
                                                        item
                                                        lg={subAndPaymentGames.length > 0 ? 2.4 : 1.2}
                                                        md={2.4}
                                                        sm={2.4}
                                                        xs={3}
                                                        sx={{
                                                            ...mobAndSubImgWrap,
                                                            cursor: 'pointer'
                                                        }}
                                                        key={index}
                                                        onClick={() => {
                                                            // dispatch(AddProductDetail(product))
                                                            navigate('/game-purchase', { state: data });
                                                        }}
                                                    >
                                                        <CardMedia
                                                            component="img"
                                                            sx={{
                                                                ...mobAndSubImg
                                                            }}
                                                            image={
                                                                data.singleProduct
                                                                    ? data.products[0].product.coverImageOriginal
                                                                        ? data.products[0].product.coverImageOriginal
                                                                        : data.products[0].product.coverImage
                                                                            ? data.products[0].product.coverImage
                                                                            : defaultImage
                                                                    : data.thumnailImage
                                                            }
                                                            alt="Paella dish"
                                                            className="mobileImg"
                                                        />
                                                        <Typography
                                                            sx={{
                                                                ...mobAndSubTxt
                                                            }}
                                                        >
                                                            {data.singleProduct
                                                                ? data.products[0].product.originalName
                                                                    ? data.products[0].product.originalName
                                                                    : data.products[0].product.name
                                                                : data.name}
                                                        </Typography>
                                                    </Grid>
                                                ))}
                                            </>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            ) : (
                                ''
                            )}
                            {subAndPaymentGames.length > 0 ? (
                                <Grid item md={mobileGames.length > 0 ? 6 : 12} xs={12} sx={{ pt: { sm: 'none', xs: 2 } }}>
                                    <Grid
                                        sx={{
                                            ...mobGamGridWrap,
                                            pt: { md: 0, sm: 2.5, xs: 1 }
                                        }}
                                    >
                                        {gamesloading ? (
                                            <>
                                                <Typography
                                                    sx={{
                                                        ...mobileGamHeadTxt
                                                    }}
                                                >
                                                    Subscriptions and payment cards
                                                </Typography>
                                                <Grid sx={{ ...mobGamBecWrap }}>
                                                    <Button
                                                        sx={{
                                                            ...mobGamBecButton
                                                        }}
                                                    >
                                                        <Typography
                                                            sx={{
                                                                ...mobGamBecTxt
                                                            }}
                                                        >
                                                            All
                                                        </Typography>{' '}
                                                        <ChevronRightIcon />
                                                    </Button>
                                                </Grid>
                                            </>
                                        ) : (
                                            <>
                                                <Skeleton
                                                    width="60%"
                                                    height={60}
                                                    sx={{
                                                        backgroundColor: '#1B2037',
                                                        marginBottom: '10px'
                                                    }}
                                                />
                                                <Skeleton
                                                    width="15%"
                                                    height={60}
                                                    sx={{
                                                        backgroundColor: '#1B2037',
                                                        borderRadius: 6
                                                    }}
                                                />
                                            </>
                                        )}
                                    </Grid>

                                    <Grid sx={{ pt: { sm: 3, xs: 1.5 } }}>
                                        <Grid
                                            container
                                            sx={{
                                                ...mobAndSubWrap
                                            }}
                                        >
                                            <>
                                                {subAndPaymentGames.slice(0, mobileGames.length > 0 ? 10 : 20).map((data, index) => (
                                                    <Grid
                                                        item
                                                        lg={mobileGames.length > 0 ? 2.4 : 1.2}
                                                        md={2.4}
                                                        sm={2.4}
                                                        xs={3}
                                                        sx={{
                                                            ...mobAndSubImgWrap,
                                                            cursor: 'pointer'
                                                        }}
                                                        key={index}
                                                        onClick={() => {
                                                            // dispatch(AddProductDetail(product))
                                                            navigate('/game-purchase', { state: data });
                                                        }}
                                                    >
                                                        <CardMedia
                                                            component="img"
                                                            sx={{
                                                                ...mobAndSubImg
                                                            }}
                                                            image={
                                                                data.singleProduct
                                                                    ? data.products[0].product.coverImageOriginal
                                                                        ? data.products[0].product.coverImageOriginal
                                                                        : data.products[0].product.coverImage
                                                                            ? data.products[0].product.coverImage
                                                                            : defaultImage
                                                                    : data.thumnailImage
                                                            }
                                                            alt="Paella dish"
                                                            className="mobileImg"
                                                        />
                                                        <Typography
                                                            sx={{
                                                                ...mobAndSubTxt
                                                            }}
                                                        >
                                                            {data.singleProduct
                                                                ? data.products[0].product.originalName
                                                                    ? data.products[0].product.originalName
                                                                    : data.products[0].product.name
                                                                : data.name}
                                                        </Typography>
                                                    </Grid>
                                                ))}
                                            </>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            ) : (
                                ''
                            )}
                        </Grid>
                        {/* </TopAnimation> */}
                    </Container>
                ) : (
                    ''
                )
            ) : (
                <Container
                    maxWidth="xl"
                    sx={{
                        mt: { md: 3, xs: 0 },
                        ...BannerContSpace
                    }}
                >
                    <Grid container spacing={{ sm: 3, xs: 0 }} sx={{ py: { sm: 5, xs: 3 } }}>
                        <Grid item md={6} xs={12}>
                            <Grid
                                sx={{
                                    ...mobGamGridWrap
                                }}
                            >
                                <>
                                    <Skeleton
                                        width="40%"
                                        height={60}
                                        sx={{
                                            backgroundColor: '#1B2037',
                                            marginBottom: '10px'
                                        }}
                                    />
                                    <Skeleton
                                        width="15%"
                                        height={60}
                                        sx={{
                                            backgroundColor: '#1B2037',
                                            borderRadius: 6
                                        }}
                                    />
                                </>
                            </Grid>
                            <Grid sx={{ pt: { sm: 3, xs: 1.5 } }}>
                                <Grid
                                    container
                                    sx={{
                                        ...mobAndSubWrap
                                    }}
                                >
                                    <>
                                        {MobileGameSkelton.map((data, index) => (
                                            <Grid item lg={2} md={2.4} sm={2.4} xs={3} sx={{ pr: 1 }} key={index}>
                                                <Skelton
                                                    style={{
                                                        ...skeltonBg,
                                                        height: '98px',
                                                        width: '100%'
                                                    }}
                                                />
                                                <Skeleton
                                                    width="90%"
                                                    style={{
                                                        ...skeltonBg
                                                    }}
                                                />
                                                <Skeleton
                                                    width="60%"
                                                    style={{
                                                        ...skeltonBg
                                                    }}
                                                />
                                            </Grid>
                                        ))}
                                    </>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item md={6} xs={12} sx={{ pt: { sm: 'none', xs: 2 } }}>
                            <Grid
                                sx={{
                                    ...mobGamGridWrap,
                                    pt: { md: 0, sm: 2.5, xs: 1 }
                                }}
                            >
                                <>
                                    <Skeleton
                                        width="60%"
                                        height={60}
                                        sx={{
                                            backgroundColor: '#1B2037',
                                            marginBottom: '10px'
                                        }}
                                    />
                                    <Skeleton
                                        width="15%"
                                        height={60}
                                        sx={{
                                            backgroundColor: '#1B2037',
                                            borderRadius: 6
                                        }}
                                    />
                                </>
                            </Grid>
                            <Grid sx={{ pt: { sm: 3, xs: 1.5 } }}>
                                <Grid
                                    container
                                    sx={{
                                        ...mobAndSubWrap
                                    }}
                                >
                                    <>
                                        {MobileGameSkelton.map((data, index) => (
                                            <Grid item lg={2} md={2.4} sm={2.4} xs={3} sx={{ pr: 1 }} key={index}>
                                                <Skelton
                                                    style={{
                                                        ...skeltonBg,
                                                        height: '98px',
                                                        width: '100%'
                                                    }}
                                                />
                                                <Skeleton
                                                    width="90%"
                                                    style={{
                                                        ...skeltonBg
                                                    }}
                                                />
                                                <Skeleton
                                                    width="60%"
                                                    style={{
                                                        ...skeltonBg
                                                    }}
                                                />
                                            </Grid>
                                        ))}
                                    </>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Container>
            )}
        </>
    );
};

export default MobileGames;

import React, { useEffect, useRef, useState } from 'react';
import { CardMedia, Container, Grid, useMediaQuery } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';
import { useSelector } from 'react-redux';
import HotChip from '../../../../ui-component/landing/Components/HotChip';
import { containerSpace, skeltonColor } from '../../../../ui-component/landing/constants/style';
import { homepageBannerChip } from '../../../../ui-component/landing/constants/homepageSx';
import myAxios from '../../../../axios';
import './headerImage.css';

const HeaderImg = () => {
    const isSmallScreen = useMediaQuery('(max-width:600px)');
    const { selectedCountryName } = useSelector((state) => state.mobileDropDown);
    const selectedRegionName = selectedCountryName.name;
    const [currentHeader, setCurrentHeader] = useState(0);
    const [animation, setAnimation] = useState(false);
    const [current, setCurrent] = useState(0);
    const headerRef = useRef();
    const duration = 10;
    const [headerImages, setHeaderImages] = useState('');
    const [regionData, setRegionData] = useState('');
    useEffect(() => {
        const getBanners = async () => {
            const response = await myAxios.get('/nonAuth/get-banners');
            if (response.status === 200) {
                const filteredBanners = response.data.data.getBanners.filter((banner) => {
                    return banner.regions.some((region) => region.name === selectedRegionName);
                });
                if (filteredBanners.length > 0) {
                    const getRegionData = filteredBanners[0].regions.filter((region) => region.name === selectedRegionName);
                    setRegionData(getRegionData[0]);
                }
                setHeaderImages(filteredBanners);
            }
        };
        getBanners();
        setCurrentHeader(0);
    }, [selectedRegionName]);
    useEffect(() => {
        if (headerImages) {
            if (current < duration) {
                if (!animation) {
                    setAnimation(true);
                }
                headerRef.current = setInterval(() => {
                    setCurrent((prev) => prev + 1);
                }, 1000);
            } else if (current === duration) {
                setAnimation(false);
                setCurrentHeader((prev) => (prev + 1) % headerImages.length);
                setCurrent(0);
            }
        }
        return () => {
            clearTimeout(headerRef.current);
        };
    }, [currentHeader, headerImages, current, animation]);
    return (
        <>
            {headerImages ? (
                headerImages && headerImages.length > 0 ? (
                    <Container
                        maxWidth="xl"
                        sx={{
                            mt: { md: 2, xs: 1 },
                            ...containerSpace
                        }}
                    >
                        {/* <FadeInWhenVisible> */}
                        <Grid
                            container
                            sx={{
                                display: 'flex',
                                borderRadius: { sm: 6, xs: 4 },
                                overflow: 'hidden'
                            }}
                        >
                            <Grid sx={{ position: 'relative', width: '100%' }}>
                                <img
                                    src={
                                        isSmallScreen
                                            ? headerImages[currentHeader]?.smallScreenBannerImage
                                            : headerImages[currentHeader]?.bannerImage
                                    }
                                    alt="not"
                                    style={{
                                        objectFit: 'fill',
                                        height: '394px',
                                        width: '100%'
                                    }}
                                    className="BannerImage"
                                />
                                <Grid
                                    sx={{
                                        position: 'absolute',
                                        top: { sm: 10, xs: 4 },
                                        right: { sm: 10, xs: 8 }
                                    }}
                                >
                                    <Grid
                                        sx={{
                                            height: { md: '368px', sm: '308px', xs: '175px' },
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'space-between'
                                        }}
                                    >
                                        <Grid
                                            sx={{
                                                ...homepageBannerChip
                                            }}
                                        >
                                            {regionData?.hot ? <HotChip /> : ''}
                                        </Grid>

                                        <Grid
                                            sx={{
                                                zIndex: 1,
                                                display: 'flex',
                                                justifyContent: 'end'
                                            }}
                                        >
                                            {headerImages.map((item, index) => {
                                                return (
                                                    <Grid
                                                        key={index}
                                                        sx={{
                                                            mx: 0.6,
                                                            display: 'flex',
                                                            justifyContent: 'center',
                                                            alignItems: 'center'
                                                        }}
                                                        onClick={() => {
                                                            setCurrentHeader(index);
                                                            setCurrent(0);
                                                            clearTimeout(headerRef.current);
                                                        }}
                                                    >
                                                        {currentHeader === index && (
                                                            <svg
                                                                width={isSmallScreen ? '34' : '44'}
                                                                height={isSmallScreen ? '34' : '44'}
                                                                viewBox="0 0 250 250"
                                                                className="circular-progress"
                                                                style={{
                                                                    position: 'absolute'
                                                                }}
                                                            >
                                                                <circle className="bg"></circle>
                                                                <circle className="fg"></circle>
                                                            </svg>
                                                        )}

                                                        <CardMedia
                                                            sx={{
                                                                cursor: 'pointer',
                                                                borderRadius: 8,
                                                                height: { sm: '40px', xs: '30px' },
                                                                width: { sm: '40px', xs: '30px' },
                                                                p: 0.4
                                                            }}
                                                            component="img"
                                                            image={item.bannerImage}
                                                            alt="Paella dish"
                                                            loading="lazy"
                                                        />
                                                    </Grid>
                                                );
                                            })}
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        {/* </FadeInWhenVisible> */}
                    </Container>
                ) : (
                    ''
                )
            ) : (
                <Container
                    maxWidth="xl"
                    sx={{
                        mt: { md: 2, xs: 1 },
                        ...containerSpace
                    }}
                >
                    <Skeleton
                        variant="rectangular"
                        width="100%"
                        // height={{sm:400,xs:"184px"}}
                        sx={{
                            ...skeltonColor,
                            height: { sm: '400px', xs: '184px' }
                        }}
                    />
                </Container>
            )}
        </>
    );
};
export default HeaderImg;

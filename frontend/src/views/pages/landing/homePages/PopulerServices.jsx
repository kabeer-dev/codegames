import { useEffect, useState } from 'react';
import Skeleton from '@mui/material/Skeleton';
import { Container, Typography, CardMedia, Grid, Card, Chip, Box, useMediaQuery } from '@mui/material';
import CrousalSlider from '../../../../ui-component/landing/Components/Slider';
import Skelton from '../../../../ui-component/landing/Components/Skelton';
import HotChip from '../../../../ui-component/landing/Components/HotChip';
import defaultImage from '../../../../assets/images/landing/default-noImage.jpg';
import { containerSpace, skeltonColor } from '../../../../ui-component/landing/constants/style';
import {
    ServiceDisChip,
    popServiceChipRap,
    popServiceCard,
    popServiceImg,
    popServicePriceRap,
    popServicePrice,
    popServiceDesc
} from '../../../../ui-component/landing/constants/homepageSx';
import { MobileGameSkelton } from '../../../../ui-component/landing/Data/HomePageData';
//Aniamtion
// import FadeInWhenVisible from './Animation/Animation';
// import TopAnimation from './Animation/TopAnimation';
// import LeftAnimation from './Animation/LeftAnimation';
// import { motion } from 'framer-motion';
import myAxios from '../../../../axios';
import { useNavigate } from 'react-router-dom';
import RadiusButton from 'ui-component/landing/Components/RadiusButton';

export default function ServicesSlider() {
    const navigate = useNavigate();
    const [popularProducts, setPopularProducts] = useState('');

    const isXsScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));

    useEffect(() => {
        const getPopularServices = async () => {
            const response = await myAxios.get('/nonAuth/popular-services');
            if (response && response.status === 200) {
                setPopularProducts(response.data.data.results);
            }
        };
        getPopularServices();
    }, []);

    const handleServiceClick = (data) => {
        if (isXsScreen) {
            navigate('/game-purchase', { state: data });
        }
    };
    return (
        <>
            {popularProducts ? (
                popularProducts && popularProducts.length > 0 ? (
                    <Container
                        maxWidth="xl"
                        sx={{
                            mt: { lg: 5, sm: 2.5 },
                            ...containerSpace
                        }}
                    >
                        <Grid sx={{ pt: 2 }}>
                            {/* <FadeInWhenVisible> */}
                            <CrousalSlider
                                slideToshow={6}
                                firstbp={4.2}
                                secondbp={3.3}
                                thirdbp={3.12}
                                title="Popular services"
                                haveBtn={true}
                                loop={true}
                            >
                                {popularProducts.map((data, index) => (
                                    <Grid
                                        key={index}
                                        sx={{
                                            pl: index === 0 ? { sm: 0, xs: 0.3 } : { sm: 0.6, xs: 0.3 },
                                            pr: { sm: 0.6, xs: 0.8 }
                                        }}
                                        onClick={
                                            () => handleServiceClick(data)
                                            // () => {
                                            // dispatch(AddProductDetail(product))
                                            // navigate('/game-purchase', { state: data });
                                        }
                                    >
                                        {/* <motion.div
                                                    initial={{ x: -1000 }}
                                                    animate={{ x: 0 }}
                                                    transition={{
                                                        duration: 0.93,
                                                        delay: 0
                                                    }}
                                                    whileHover={{ scale: 0.98, opacity: 0.8 }}
                                                > */}
                                        <Card
                                            sx={{
                                                ...popServiceCard
                                            }}
                                        >
                                            <Grid
                                                sx={{
                                                    ...popServiceChipRap
                                                }}
                                            >
                                                <Box>
                                                    <HotChip text={index + 11} />
                                                   
                                                </Box>
                                                <Grid
                                                    sx={{
                                                        mt: { sm: 0.4, xs: '2px' },
                                                        display: 'flex'
                                                    }}
                                                >
                                                    {data.isHot ? <HotChip /> : ''}
                                                </Grid>
                                            </Grid>
                                            <CardMedia
                                                component="img"
                                                sx={{ ...popServiceImg }}
                                                image={
                                                    data.singleProduct
                                                        ? data.products[0].product.coverImageOriginal
                                                            ? data.products[0].product.coverImageOriginal
                                                            : data.products[0].product.images &&
                                                              data.products[0].product.images.cover &&
                                                              data.products[0].product.images.cover.thumbnail
                                                            ? data.products[0].product.images.cover.thumbnail
                                                            : data.products[0].product.images &&
                                                              data.products[0].product.images.cover &&
                                                              data.products[0].product.images.cover.url
                                                            ? data.products[0].product.images.cover.url
                                                            : data.products[0].product.screenshots &&
                                                              data.products[0].product.screenshots[0]
                                                            ? data.products[0].product.screenshots[0].url
                                                            : data.products[0].product.images &&
                                                              data.products[0].product.images.screenshots &&
                                                              data.products[0].product.images.screenshots[0]
                                                            ? data.products[0].product.images.screenshots[0].url
                                                            : data.products[0].product.screenshots &&
                                                              data.products[0].product.screenshots[0]
                                                            ? data.products[0].product.screenshots[0].url
                                                            : defaultImage
                                                        : data.thumnailImage
                                                }
                                                alt="Paella dish"
                                            />
                                            <Grid
                                                sx={{
                                                    ...popServicePriceRap
                                                }}
                                            >
                                                <Typography
                                                    sx={{
                                                        ...popServicePrice
                                                    }}
                                                >
                                                    {data.products[0].customPrice.toFixed(2)} €
                                                </Typography>
                                            </Grid>
                                            <Typography sx={{ ...popServiceDesc }}>
                                                {data.singleProduct
                                                    ? data.products[0].product.originalName
                                                        ? data.products[0].product.originalName
                                                        : data.products[0].product.name
                                                    : data.name}
                                            </Typography>
                                            {!isXsScreen && (
                                                <RadiusButton
                                                    sx={{ ...popServiceDesc }}
                                                    name="Buy"
                                                    onClick={() => navigate('/game-purchase', { state: data })}
                                                />
                                            )}
                                        </Card>
                                        {/* </motion.div> */}
                                    </Grid>
                                ))}
                            </CrousalSlider>
                            {/* </FadeInWhenVisible> */}
                        </Grid>
                    </Container>
                ) : (
                    ''
                )
            ) : (
                <Container
                    maxWidth="xl"
                    sx={{
                        mt: { lg: 5, sm: 2.5 },
                        ...containerSpace
                    }}
                >
                    <Grid sx={{ pt: 2 }}>
                        <CrousalSlider
                            slideToshow={6}
                            firstbp={4.2}
                            secondbp={3.3}
                            thirdbp={3.12}
                            title="Popular services"
                            haveBtn={true}
                            loop={true}
                        >
                            {MobileGameSkelton.map((data, index) => (
                                <Grid key={index} sx={{ pr: 2, pt: 1 }}>
                                    <Skelton
                                        width="100%"
                                        style={{
                                            height: { sm: 256, xs: 145 },
                                            width: { sm: '199px', xs: '96px' },
                                            pt: 2
                                        }}
                                    />
                                    <Skeleton
                                        sx={{
                                            ...skeltonColor,
                                            width: { sm: '199px', xs: '96px' }
                                        }}
                                    />
                                    <Skeleton
                                        sx={{
                                            ...skeltonColor,
                                            width: { sm: '199px', xs: '96px' }
                                        }}
                                    />
                                </Grid>
                            ))}
                        </CrousalSlider>
                    </Grid>
                </Container>
            )}
        </>
    );
}

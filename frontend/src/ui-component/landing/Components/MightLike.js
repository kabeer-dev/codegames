import React, { useEffect, useState } from 'react';
import { Container, Typography, CardMedia, Grid, Card } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';
import CrousalSlider from '../Components/Slider';
import Skelton from './Skelton';
import img from '../../../assets/images/landing/ps5.svg';
import { containerSpace, skeltonColor } from '../constants/style';
import defaultImage from '../../../assets/images/landing/default-noImage.jpg';
// import { AddProductDetail } from '../../../store/slices/landing/productDetail';
import { mightLikeTitle, mightLikeCard, mightLikeImg, mightLikeTxt, mightLikePrice } from '../constants/style';
import myAxios from '../../../axios';

const MightLike = () => {
    const [popularProducts, setPopularProducts] = useState([]);
    const [showPopularProducts, setShowPopularProducts] = useState(false);
    useEffect(() => {
        const getPopularServices = async () => {
            const response = await myAxios.get('/nonAuth/popular-services');
            if (response && response.status === 200) {
                setPopularProducts(response.data.data.results);
                setShowPopularProducts(true);
            }
        };
        getPopularServices();
    }, []);
    return (
        <Container
            maxWidth="xl"
            sx={{
                mt: { lg: 1, sm: 1, xs: 1 },
                ...containerSpace
            }}
        >
            <Grid sx={{ pt: { sm: 2, xs: 0 } }}>
                <Grid sx={{ pb: { sm: 3, xs: 0.2 } }}>
                    {showPopularProducts ? (
                        <Typography
                            sx={{
                                ...mightLikeTitle
                            }}
                        >
                            You might like it
                        </Typography>
                    ) : (
                        <Skelton
                            style={{
                                width: { sm: '410px', xs: '70%' },
                                height: { sm: '48px', xs: '24px' }
                            }}
                        />
                    )}
                </Grid>
                <CrousalSlider slideToshow={6} firstbp={4} secondbp={3.3} thirdbp={2.1} title=" " haveBtn={false}>
                    {showPopularProducts &&
                        popularProducts.map((data, index) => (
                            <Grid
                                key={index}
                                onClick={() => {
                                    // navigate('/game-purchase', { state: product.productId });
                                }}
                                sx={{ px: { sm: 0.6, xs: 0.5 }, pt: { sm: 0, xs: 1 } }}
                            >
                                <CardMedia
                                    component="img"
                                    image={img}
                                    alt="not"
                                    sx={{
                                        height: { sm: 'auto', xs: 'auto' },
                                        width: { sm: '200px', xs: '96px' },
                                        objectFit: 'fill'
                                    }}
                                />
                                <Card
                                    sx={{
                                        ...mightLikeCard
                                    }}
                                >
                                    <CardMedia
                                        sx={{
                                            ...mightLikeImg
                                        }}
                                        component="img"
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
                                                    : data.products[0].product.screenshots && data.products[0].product.screenshots[0]
                                                    ? data.products[0].product.screenshots[0].url
                                                    : data.products[0].product.images &&
                                                      data.products[0].product.images.screenshots &&
                                                      data.products[0].product.images.screenshots[0]
                                                    ? data.products[0].product.images.screenshots[0].url
                                                    : data.products[0].product.screenshots && data.products[0].product.screenshots[0]
                                                    ? data.products[0].product.screenshots[0].url
                                                    : defaultImage
                                                : data.thumnailImage
                                        }
                                        title="green iguana"
                                    />
                                    <Grid
                                        sx={{
                                            display: { sm: 'flex', xs: 'block' },
                                            justifyContent: 'space-between',
                                            px: 0.5,
                                            pt: { sm: 2, xs: 0.5 }
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                ...mightLikePrice
                                            }}
                                        >
                                            {data.products[0].customPrice.toFixed(2)} €
                                        </Typography>
                                    </Grid>
                                    <Typography
                                        sx={{
                                            ...mightLikeTxt
                                        }}
                                    >
                                        {data.singleProduct
                                            ? data.products[0].product.originalName
                                                ? data.products[0].product.originalName
                                                : data.products[0].product.name
                                            : data.name}
                                    </Typography>
                                </Card>
                            </Grid>
                        ))}

                    {!popularProducts &&
                        [1, 2, 3, 4, 5, 6, 7, 8].map((data, index) => (
                            <Grid key={index} sx={{ pr: 2 }}>
                                <Skelton
                                    style={{
                                        height: { sm: '278px', xs: '160px' },
                                        width: { sm: '200px', xs: '96px' }
                                    }}
                                />
                                <Skeleton
                                    sx={{
                                        ...skeltonColor,
                                        width: '81px',
                                        height: '24px',
                                        mt: 1
                                    }}
                                />
                                <Skeleton
                                    sx={{
                                        ...skeltonColor,
                                        width: { sm: '200px', xs: '96px' },
                                        height: '14px',
                                        mb: 7
                                    }}
                                />
                            </Grid>
                        ))}
                </CrousalSlider>
            </Grid>
        </Container>
    );
};

export default MightLike;

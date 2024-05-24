import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import { CardMedia, Container, Grid } from '@mui/material';
import Skelton from '../../../../ui-component/landing/Components/Skelton';
import { containerSpace } from '../../../../ui-component/landing/constants/style';
import { homepageSliderImg, homepageSliderCard, homepageSliderTxt } from '../../../../ui-component/landing/constants/homepageSx';
import myAxios from '../../../../axios';
import CrousalSlider from 'ui-component/landing/Components/Slider';
import defaultImage from '../../../../assets/images/landing/default-noImage.jpg';

export const FastCategory = () => {
    const [fastCategories, setFastCategories] = useState([]);
    const [fastLoading, setFastLoading] = useState(false);

    useEffect(() => {
        const getFastCategories = async () => {
            const response = await myAxios.get('/nonAuth/fast-categories');
            if (response.status === 200) {
                setFastCategories(response.data.data.results);
                setFastLoading(true);
            }
        };
        getFastCategories();
    }, []);
    return (
        <>
            {fastLoading ? (
                fastCategories && fastCategories.length > 0 ? (
                    <Container
                        maxWidth="xl"
                        sx={{
                            // mt: { md: 2, xs: 1 },
                            ...containerSpace
                        }}
                    >
                        {/* <ZoomInAnimation> */}
                        <Grid sx={{ pt: { md: 3, xs: 2 } }}>
                            <div>
                                <CrousalSlider
                                    slideToshow={9.2}
                                    bp={8.2}
                                    firstbp={7.1}
                                    secondbp={6.2}
                                    thirdbp={4.5}
                                    title="Popular services"
                                    haveBtn={false}
                                    loop={true}
                                >
                                    {fastCategories.map((data, index) => (
                                        
                                        <Grid key={index} sx={{ pr: 1.2 }}>
                                            <Grid
                                                sx={{
                                                    ...homepageSliderCard,
                                                    width: 'fit-content'
                                                }}
                                            >
                                                <CardMedia
                                                    component="img"
                                                    image={
                                                        data.singleProduct
                                                            ? data.products[0].product.coverImageOriginal
                                                                ? data.products[0].product.coverImageOriginal
                                                                : data.products[0].product.coverImage
                                                                    ? data.products[0].product.coverImage
                                                                    : defaultImage
                                                            : data.thumnailImage
                                                    }
                                                    alt="not"
                                                    sx={{ ...homepageSliderImg }}
                                                />
                                                <Typography
                                                    sx={{
                                                        ...homepageSliderTxt
                                                    }}
                                                >
                                                    {data.singleProduct
                                                        ? data.products[0].product.originalName
                                                            ? data.products[0].product.originalName
                                                            : data.products[0].product.name
                                                        : data.name}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    ))}
                                </CrousalSlider>
                            </div>
                        </Grid>
                        {/* </ZoomInAnimation> */}
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
                    <Grid sx={{ pt: { md: 4, xs: 3 } }}>
                        <div>
                            <CrousalSlider
                                slideToshow={9.2}
                                bp={8.2}
                                firstbp={7.1}
                                secondbp={6.2}
                                thirdbp={4.5}
                                title="Popular services"
                                haveBtn={false}
                                loop={true}
                            >
                                {[1, 2, 3, 4, 5, 6, 7, 8].map((data, index) => (
                                    <Grid key={index} sx={{ pr: 1 }}>
                                        <Skelton
                                            style={{
                                                width: '200px',
                                                height: '48px'
                                            }}
                                        />
                                    </Grid>
                                ))}
                            </CrousalSlider>
                        </div>
                    </Grid>
                </Container>
            )}
        </>
    );
};

import { CardMedia, Container, Divider, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Skelton from './Skelton';
import { containerSpace } from '../constants/style';
import {
    seoBlockTitle,
    seoBlockTitle2,
    seoBlockWrap,
    seoBlockDivider,
    seoBlockImg,
    seoBlockTxt,
    seoBlockDesc,
    seoBlockTitleWrap
} from '../constants/style';
import myAxios from '../../../axios';
// import TopAnimation from 'views/pages/landing/homePages/Animation/TopAnimation';

const SEOBlock = () => {
    const [seoBlocks, setSeoBlocks] = useState([]);
    const [seoBlockShow, setSeoBlockShow] = useState(false);
    useEffect(() => {
        const getSeoBlocks = async () => {
            const response = await myAxios.get('/nonAuth/seoBlock');
            if (response && response.status === 200) {
                setSeoBlocks(response.data.data.results);
                setSeoBlockShow(true);
            }
        };
        getSeoBlocks();
    }, []);
    return (
        <Container maxWidth="xl" sx={{ mb: 1, ...containerSpace }}>
            {/* <TopAnimation> */}
            <Grid sx={{ pb: { sm: 3.5, xs: 2 } }}>
                {seoBlockShow ? (
                    <Typography
                        sx={{
                            ...seoBlockTitle
                        }}
                    >
                        SEO BLOCK
                    </Typography>
                ) : (
                    <Skelton
                        style={{
                            width: { sm: 'none', xs: '260px' },
                            height: { sm: 'none', xs: '30px' },
                            mb: 2,
                            mt: 1
                        }}
                    />
                )}
                {seoBlockShow ? (
                    seoBlocks.length > 0 ? (
                        <Grid
                            container
                            sx={{
                                ...seoBlockWrap
                            }}
                        >
                            <Typography
                                sx={{
                                    ...seoBlockTitle2
                                }}
                            >
                                SEO BLOCK
                            </Typography>
                            <Divider
                                sx={{
                                    ...seoBlockDivider
                                }}
                            />
                            {seoBlocks.map((item, index) => (
                                <Grid container key={index} sx={{ pt: { sm: 3.5, xs: 1 }, pb: 1.5 }}>
                                    <Grid item lg={1.5} md={2} sm={3} sx={{ display: { sm: 'flex', xs: 'none' } }}>
                                        <CardMedia
                                            component="img"
                                            sx={{
                                                ...seoBlockImg
                                            }}
                                            image={item.image}
                                            alt="Paella dish"
                                        />
                                    </Grid>
                                    <Grid
                                        item
                                        lg={9}
                                        md={10}
                                        sm={9}
                                        sx={{
                                            ...seoBlockTitleWrap
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                ...seoBlockTxt
                                            }}
                                        >
                                            {item.title}
                                        </Typography>
                                        <Typography
                                            sx={{
                                                pt: { sm: 0, xs: 1 },
                                                ...seoBlockDesc
                                            }}
                                        >
                                            {item.description}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            ))}
                        </Grid>
                    ) : (
                        ''
                    )
                ) : (
                    <Skelton
                        width="100%"
                        height={450}
                        style={{
                            backgroundColor: 'rgba(131, 151, 195, 0.1)'
                        }}
                    />
                )}
            </Grid>
            {/* </TopAnimation> */}
        </Container>
    );
};

export default SEOBlock;

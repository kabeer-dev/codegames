import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import { Typography, Grid, Button } from '@mui/material';
import { mainSliderTitle, mainSliderBtn1, mainSliderBtn2 } from '../constants/style';
//Animation
// import FadeInWhenVisible from 'views/pages/landing/homePages/Animation/Animation';
// import LeftAnimation from 'views/pages/landing/homePages/Animation/LeftAnimation';
// import { motion, useAnimation } from 'framer-motion';
// import { duration } from 'moment';

const CrousalSlider = ({ slideToshow, bp, firstbp, secondbp, thirdbp, haveBtn, title, children, loop }) => {
    const [sliderRef, setSliderRef] = useState(null);
    const sliderSettings = {
        arrows: false,
        slidesToShow: 1,
        infinite: loop ? true : false,
        variableWidth: true
    };
    return (
        <Grid className="content">
            {haveBtn ? (
                <Grid sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    {/*
                     <motion.div
                            initial={{ y: 1000 }}
                            animate={{ y: 0 }}
                            transition={{
                                duration: '2',
                                delay: 0.2
                            }}
                        > */}
                    <Typography
                        sx={{
                            ...mainSliderTitle
                        }}
                    >
                        {title}
                    </Typography>
                    {/* ) : (
                     </motion.div>
                     <Skeleton width="30%" height={70} style={{ ...skeltonColor }} />
                     )} */}
                    <Grid sx={{ display: { sm: 'flex', xs: 'none' } }}>
                        <>
                            <Grid>
                                <Button
                                    onClick={sliderRef?.slickPrev}
                                    type="button"
                                    sx={{
                                        ...mainSliderBtn1
                                    }}
                                >
                                    <ArrowBackIosIcon
                                        sx={{
                                            fontSize: '18px',
                                            color: '#FFFF'
                                        }}
                                    />
                                </Button>
                            </Grid>
                            <Grid sx={{ pr: { lg: 0.6, xs: 0 } }}>
                                <Button
                                    onClick={sliderRef?.slickNext}
                                    type="button"
                                    sx={{
                                        ...mainSliderBtn2
                                    }}
                                >
                                    <ArrowForwardIosRoundedIcon
                                        sx={{
                                            fontSize: '18px',
                                            color: '#FFFF'
                                        }}
                                    />
                                </Button>
                            </Grid>
                        </>
                        {/* ) : (
                            ' '
                        )} */}
                    </Grid>
                </Grid>
            ) : (
                ' '
            )}
            <Grid>
                <Slider ref={setSliderRef} {...sliderSettings} swipeToSlide={true}>
                    {children}
                </Slider>
            </Grid>
        </Grid>
    );
};

CrousalSlider.propTypes = {
    children: PropTypes.node
};

export default CrousalSlider;

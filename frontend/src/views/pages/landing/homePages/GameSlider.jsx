import React from 'react';
import Slider from 'react-slick';
import { Typography, CardMedia, Grid, Card, Chip } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';
import { useNavigate } from 'react-router-dom';
import Skelton from '../../../../ui-component/landing/Components/Skelton';
import defaultImage from '../../../../assets/images/landing/default-noImage.jpg';
import { skeltonColor } from '../../../../ui-component/landing/constants/style';
import { MobileGameSkelton } from '../../../../ui-component/landing/Data/HomePageData';
import { GmSlideCardSx, GmSlideImg, GmSlideDetail, GmSlideTxt1, GmSlideTitle } from '../../../../ui-component/landing/constants/homepageSx';
import { Box } from '@mui/system';
import { ServiceDisChip, popServiceChipRap } from 'ui-component/landing/constants/homepageSx';
import Turkey from 'assets/images/landing/turkeyFlag.svg';

const sliderSettings = {
    arrows: false,
    slidesToShow: 1,
    infinite: false,
    variableWidth: true
};

const GameSlider = ({ setSliderRef, arrayShow, headImage }) => {
    const navigate = useNavigate();
    return (
        <Slider ref={setSliderRef} {...sliderSettings}>
            {
                // skeltonStatus &&
                arrayShow.length > 0
                    ? arrayShow.map((card, index) => (
                          <Grid
                              container
                              key={index}
                              sx={{
                                  display: 'flex',
                                  flexDirection: 'column'
                              }}
                          >
                              {card.games.map((data, i) => (
                                  <Grid
                                      key={i + 1}
                                      sx={{ px: { sm: 0.6, xs: 0.5 }, pt: 1 }}
                                      onClick={() => {
                                          // dispatch(AddProductDetail(product))
                                          navigate('/game-purchase', { state: data });
                                      }}
                                  >
                                      <Card
                                          sx={{
                                              ...GmSlideCardSx
                                          }}
                                      >
                                          <Grid
                                              sx={{
                                                  ...popServiceChipRap,
                                                  top: { sm: '48px', xs: '26px' },
                                                  display: 'flex'
                                              }}
                                          >
                                              <Box>
                                                  <Chip
                                                      label={`${index + 20}%`}
                                                      sx={{
                                                          ...ServiceDisChip,
                                                          '& .MuiChip-label': {
                                                              px: { sm: '6px', xs: '4px' }
                                                          }
                                                      }}
                                                  />
                                              </Box>
                                              <Box sx={{ pl: 0.5 }}>
                                                  <Chip
                                                      label="Global"
                                                      sx={{
                                                          ...ServiceDisChip,
                                                          background: '#FFFF',
                                                          fontSize: { sm: '11px', xs: '10px' },
                                                          textTransform: 'uppercase'
                                                      }}
                                                  />
                                              </Box>
                                              {/* <Box sx={{ pl: 0.5 }}>
                                                  <CardMedia
                                                      component="img"
                                                      image={Turkey}
                                                      alt="not"
                                                      sx={{ width: '28px', height: '28px' }}
                                                  />
                                              </Box> */}
                                          </Grid>
                                          <CardMedia
                                              component="img"
                                              image={headImage}
                                              alt="not"
                                              sx={{
                                                  height: { sm: 'auto', xs: 'auto' },
                                                  width: { sm: '200px', xs: '107px' },
                                                  objectFit: 'fill'
                                              }}
                                          />

                                          <CardMedia
                                              sx={{
                                                  ...GmSlideImg
                                              }}
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
                                              title="green iguana"
                                          />

                                          <Grid
                                              sx={{
                                                  ...GmSlideDetail
                                              }}
                                          >
                                              <Typography
                                                  sx={{
                                                      ...GmSlideTxt1
                                                  }}
                                              >
                                                  {data.products[0].customPrice.toFixed(2)} €
                                              </Typography>
                                          </Grid>
                                          <Typography
                                              sx={{
                                                  ...GmSlideTitle,
                                                  width: { sm: '200px', xs: '107px' }
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
                          </Grid>
                      ))
                    : ''
            }

            {!arrayShow &&
                MobileGameSkelton.map((data, index) => (
                    <Grid container key={index} sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Grid sx={{ pr: 2 }}>
                            <Skelton
                                style={{
                                    height: { sm: 278, xs: 190 },
                                    pt: 2
                                }}
                            />
                            <Skeleton
                                height={31}
                                style={{
                                    ...skeltonColor,
                                    width: { sm: '200px', xs: '107px' }
                                }}
                            />
                            <Skeleton
                                height={11}
                                style={{
                                    ...skeltonColor,
                                    width: { sm: '200px', xs: '107px' }
                                }}
                            />
                        </Grid>
                        <Grid sx={{ pr: 2, pt: 2 }}>
                            <Skelton
                                style={{
                                    width: { sm: '200px', xs: '107px' },
                                    height: { sm: 278, xs: 190 },
                                    pt: 2
                                }}
                            />
                            <Skeleton
                                height={31}
                                style={{
                                    ...skeltonColor,
                                    width: { sm: '200px', xs: '107px' }
                                }}
                            />
                            <Skeleton
                                height={11}
                                style={{
                                    ...skeltonColor,
                                    width: { sm: '200px', xs: '107px' }
                                }}
                            />
                        </Grid>
                    </Grid>
                ))}
        </Slider>
    );
};

export default GameSlider;

import { useEffect, useState } from 'react';
import StarRateIcon from '@mui/icons-material/StarRate';
import VerifiedIcon from '@mui/icons-material/Verified';
import { Container, Typography, Rating, Grid, Card, Box } from '@mui/material';
import Skelton from '../../../../ui-component/landing/Components/Skelton';
import CrousalSlider from '../../../../ui-component/landing/Components/Slider';
import { containerSpace, skeltonBg } from '../../../../ui-component/landing/constants/style';
import {
    reviewCardSx,
    ReviewHeadTxt,
    ReviewHeadStarTxt,
    ReviewHeadDesc,
    reviewCardDate,
    reviewCardDesc,
    reviewCardTitle,
    reviewCardVerfied,
    reviewCardVerfiedTxt,
    reviewCardStarTxt
} from '../../../../ui-component/landing/constants/homepageSx';
// import LeftAnimation from './Animation/LeftAnimation';
import myAxios from '../../../../axios';

export default function Reviews() {
    const [value, setValue] = useState(5);
    const [reviews, setReviews] = useState([]);
    const [reviewShow, setReviewShow] = useState(false);
    useEffect(() => {
        const getReviews = async () => {
            const response = await myAxios.get('/nonAuth/reviews');
            if (response.status === 200) {
                const updatedReviews = response.data.data.results.map((review) => {
                    // Convert updatedAt field to desired format
                    const date = new Date(review.updatedAt);
                    const formattedDate = `${date.getDate()} ${date.toLocaleString('en-US', { month: 'long' })}, ${date.getFullYear()}`;
                    return { ...review, updatedAt: formattedDate };
                });
                setReviews(updatedReviews);
                setReviewShow(true);
            }
        };
        getReviews();
    }, []);

    return (
        <Container maxWidth="xl" sx={{ ...containerSpace }}>
            {/* <LeftAnimation> */}
            <Grid
                sx={{
                    pt: reviewShow && reviews.length > 0 ? { sm: 3, xs: 2 } : 0,
                    pb: reviewShow && reviews.length > 0 ? { sm: 4, xs: 2 } : 0
                }}
            >
                <Grid item xs={6}>
                    {reviewShow ? (
                        <Typography
                            sx={{
                                ...ReviewHeadTxt
                            }}
                        >
                            {reviews.length > 0 ? 'Reviews' : ''}
                        </Typography>
                    ) : (
                        <Skelton
                            width={167}
                            height={40}
                            style={{
                                ...skeltonBg
                            }}
                        />
                    )}
                </Grid>
                <Grid container sx={{ pb: reviewShow && reviews.length > 0 ? { sm: 2, xs: 0 } : 0 }}>
                    <Grid item sm={6} xs={12}>
                        {reviewShow ? (
                            reviews.length > 0 ? (
                                <Typography
                                    sx={{
                                        ...ReviewHeadDesc
                                    }}
                                >
                                    Rating more than 5 out of 5 on <StarRateIcon sx={{ pt: 1 }} /> trustpilot.com
                                </Typography>
                            ) : (
                                ''
                            )
                        ) : (
                            <Skelton
                                width={259}
                                height={24}
                                style={{
                                    ...skeltonBg,
                                    mt: 1
                                }}
                            />
                        )}
                    </Grid>
                    <Grid
                        item
                        sm={6}
                        xs={12}
                        sx={{
                            display: 'flex',
                            justifyContent: { sm: 'end', xs: 'start' },
                            py: { sm: 0, xs: 1 }
                        }}
                    >
                        {reviewShow ? (
                            reviews.length > 0 ? (
                                <>
                                    <Rating
                                        sx={{ color: '#3CCA5B', fontSize: 'auto' }}
                                        name="simple-controlled"
                                        value={value}
                                        onChange={(event, newValue) => {
                                            setValue(newValue);
                                        }}
                                    />
                                    <Typography
                                        sx={{
                                            ...ReviewHeadStarTxt
                                        }}
                                    >
                                        &nbsp;
                                        {value} (102)
                                    </Typography>
                                </>
                            ) : (
                                ''
                            )
                        ) : (
                            <Skelton
                                width={259}
                                height={24}
                                style={{
                                    ...skeltonBg,
                                    mr: { lg: 1.6, xs: 0 }
                                }}
                            />
                        )}
                    </Grid>
                </Grid>
                <CrousalSlider slideToshow={4} firstbp={3.1} secondbp={3.1} thirdbp={1.2} title=" " haveBtn={false}>
                    {reviewShow
                        ? reviews.length > 0
                            ? reviews.map((data, index) => (
                                  <Grid sx={{ pl: index !== 0 ? { md: 1.5, xs: 0.7 } : '' }} key={index}>
                                      <Card
                                          sx={{
                                              ...reviewCardSx
                                          }}
                                      >
                                          <Grid>
                                              <Grid
                                                  sx={{
                                                      display: 'flex',
                                                      justifyContent: 'space-between'
                                                  }}
                                              >
                                                  <Typography sx={{ ...reviewCardTitle }}>{data.userName}</Typography>
                                                  <Typography
                                                      sx={{
                                                          ...reviewCardStarTxt
                                                      }}
                                                  >
                                                      <StarRateIcon sx={{ fontSize: 31, pb: 1 }} />
                                                      {data.rating}
                                                  </Typography>
                                              </Grid>
                                              <Typography
                                                  sx={{
                                                      ...reviewCardVerfied
                                                  }}
                                              >
                                                  {data.isVarified ? <VerifiedIcon /> : ''}
                                                  <div>
                                                      <Box
                                                          sx={{
                                                              ...reviewCardVerfiedTxt
                                                          }}
                                                      >
                                                          Varified User
                                                      </Box>
                                                  </div>
                                              </Typography>
                                              <Typography
                                                  sx={{
                                                      ...reviewCardDesc
                                                  }}
                                              >
                                                  {data.message}
                                              </Typography>
                                          </Grid>
                                          <Grid>
                                              <Typography
                                                  sx={{
                                                      ...reviewCardDate
                                                  }}
                                              >
                                                  {data.updatedAt}
                                              </Typography>
                                          </Grid>
                                      </Card>
                                  </Grid>
                              ))
                            : ''
                        : [1, 2, 3, 4].map((data, index) => (
                              <Grid key={index} sx={{ pr: 2 }}>
                                  <Skelton
                                      height={256}
                                      style={{
                                          ...skeltonBg,
                                          width: { sm: '309px', xs: '248px' }
                                      }}
                                  />
                              </Grid>
                          ))}

                    {}
                </CrousalSlider>
            </Grid>
            {/* </LeftAnimation> */}
        </Container>
    );
}

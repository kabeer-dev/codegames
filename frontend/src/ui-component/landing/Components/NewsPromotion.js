import Skeleton from '@mui/material/Skeleton';
import { Typography, CardMedia, Grid, Card, Container } from '@mui/material';
import CrousalSlider from './Slider';
import Skelton from './Skelton';
import { useNavigate } from 'react-router-dom';
import { containerSpace, skeltonColor } from '../constants/style';
import { newsPromoTitle, newsPromoTxt, newsPromoDate, newsPromoDesc, newsPromoCard, newsPromoImg } from '../constants/style';
import { useEffect, useState } from 'react';
import myAxios from '../../../axios';
//Animation
// import FadeInWhenVisible from 'views/pages/landing/homePages/Animation/Animation';
// import { motion } from 'framer-motion';
export default function NewsPromotion() {
    const navigate = useNavigate();
    const [news, setNews] = useState([]);
    const [newShow, setNewShow] = useState(false);
    useEffect(() => {
        const getNews = async () => {
            const response = await myAxios.get('/nonAuth/news');
            if (response.status === 200) {
                const updatedReviews = response.data.data.results.map((review) => {
                    // Convert updatedAt field to desired format
                    const date = new Date(review.updatedAt);
                    const formattedDate = `${date.getDate()} ${date.toLocaleString('en-US', { month: 'long' })}, ${date.getFullYear()}`;
                    return { ...review, updatedAt: formattedDate };
                });
                setNews(updatedReviews);
                setNewShow(true);
            }
        };
        getNews();
    }, []);
    return (
        <Container
            maxWidth="xl"
            sx={{
                mt: { sm: 0.1, xs: 2 },
                ...containerSpace
            }}
        >
            {/* <FadeInWhenVisible> */}
            <Grid sx={{ pt: 0, pb: { sm: 3, xs: 1.5 } }}>
                <Grid container>
                    {newShow ? (
                        <Typography
                            sx={{
                                ...newsPromoTitle
                            }}
                        >
                            {news.length > 0 ? 'News and promotions' : ''}
                        </Typography>
                    ) : (
                        <Skeleton width="50%" height={70} sx={{ ...skeltonColor }} />
                    )}
                </Grid>
                <CrousalSlider slideToshow={4} firstbp={3.2} secondbp={2.3} thirdbp={1.2} title="Popular services" haveBtn={false}>
                    {newShow
                        ? news.length > 0
                            ? news.map((card, index) => (
                                  <Grid
                                      key={index}
                                      container
                                      sx={{
                                          display: 'flex',
                                          pt: { sm: 3, xs: 1 }
                                      }}
                                  >
                                      <Grid sx={{ pl: index === 0 ? 0 : { sm: 1.5, xs: 1.5 } }}>
                                          {/* <motion.div
                                                initial={{ x: -1000 }}
                                                animate={{ x: 0 }}
                                                transition={{
                                                    duration: 0.93,
                                                    delay: 0
                                                }}
                                                whileHover={{ scale: 0.97, opacity: 0.8 }}
                                            > */}
                                          <Card
                                              onClick={() => navigate('/news-promotion')}
                                              sx={{
                                                  ...newsPromoCard
                                              }}
                                              className="newsCard"
                                          >
                                              <CardMedia
                                                  component="img"
                                                  sx={{
                                                      ...newsPromoImg
                                                  }}
                                                  image={card.coverImage}
                                                  alt="Paella dish"
                                              />
                                              <Grid sx={{ width: { sm: '90%', xs: '95%' } }}>
                                                  <Typography
                                                      sx={{
                                                          ...newsPromoTxt
                                                      }}
                                                  >
                                                      {card.title}
                                                  </Typography>
                                                  <Typography
                                                      sx={{
                                                          ...newsPromoDesc
                                                      }}
                                                  >
                                                      {card.description}
                                                  </Typography>
                                                  <Typography
                                                      sx={{
                                                          ...newsPromoDate
                                                      }}
                                                  >
                                                      {card.updatedAt}
                                                  </Typography>
                                              </Grid>
                                          </Card>
                                          {/* </motion.div> */}
                                      </Grid>
                                  </Grid>
                              ))
                            : ''
                        : [1, 2, 3, 4].map((data, index) => (
                              <Grid key={index} sx={{ pr: 2, pt: 1 }}>
                                  <Skelton
                                      style={{
                                          height: 206,
                                          width: { sm: '305px', xs: '286px' }
                                      }}
                                  />
                                  <Skeleton
                                      style={{
                                          ...skeltonColor,
                                          height: 56,
                                          pt: 1,
                                          width: { sm: '305px', xs: '286px' }
                                      }}
                                  />
                                  <Skeleton
                                      style={{
                                          ...skeltonColor,
                                          height: 26,
                                          width: { sm: '305px', xs: '286px' }
                                      }}
                                  />
                              </Grid>
                          ))}
                </CrousalSlider>
            </Grid>
            {/* </FadeInWhenVisible> */}
        </Container>
    );
}

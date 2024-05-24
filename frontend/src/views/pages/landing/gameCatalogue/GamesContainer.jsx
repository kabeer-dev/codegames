import { useState } from 'react';
import { useSelector } from 'react-redux';
import CancelIcon from '@mui/icons-material/Cancel';
import { containerSpace } from '../../../../ui-component/landing/constants/style';
import { Container, Typography, CardMedia, Grid, Button, Box } from '@mui/material';
import Card from '@mui/material/Card';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Skelton from '../../../../ui-component/landing/Components/Skelton';
import GameSelectionDropDown from '../../../../ui-component/landing/Components/GameSelectionDropDown';
import GameOrderDropDown from '../../../../ui-component/landing/Components/GameOrderDropDown';
import { useDispatch } from 'react-redux';
import { paymentComponent } from '../../../../store/slices/landing/paymentMethod';
import BottomModal from './BottomModal';
import { useNavigate } from 'react-router-dom';
import { SearchBtn, orderPattern, CatalogGames } from '../../../../ui-component/landing/Data/gameCatalog';
import {
    searchResultSx,
    searchBtnsWrap,
    searchBtnsSx,
    moreBtn,
    moreBtnWrap,
    catelogCard,
    catelogCardShadow,
    catelogCardImg,
    catelogCardPrice,
    catelogCardDisPrice,
    catelogCardTxt,
    catelogSearchRest,
    catelogSearchRestTxt,
    catelogSearchResultShow
} from '../../../../ui-component/landing/constants/GameCatSx';

export default function GamesContainer() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [gameOrder, setGameOrder] = useState('Ascending Order');
    const [select, setSelect] = useState([]);
    const [displayedImages, setDisplayedImages] = useState(18);
    const [modalBottom, setModalBottom] = useState(false);
    const openDrawer = () => {
        dispatch(paymentComponent('filter_method'));
        setModalBottom(true);
    };
    const closeDrawer = () => {
        dispatch(paymentComponent(''));
        setModalBottom(false);
    };
    const loadMoreImages = () => {
        setDisplayedImages(displayedImages + 6);
    };
    return (
        <Container
            maxWidth="xl"
            sx={{
                pt: { md: 15.5, sm: 23, xs: 10.4 },
                ...containerSpace
            }}
        >
            <Grid sx={{ pt: { sm: 2, xs: 0 } }}>
                <Grid item>
                    {true ? (
                        <Typography
                            sx={{
                                ...searchResultSx
                            }}
                        >
                            Search result
                        </Typography>
                    ) : (
                        <Skelton
                            style={{
                                height: '40px',
                                width: { sm: '290px', xs: '200px' },
                                mb: 1
                            }}
                        />
                    )}
                </Grid>
                <Grid container>
                    <Grid order={{ md: 1, xs: 2 }} item xs={12} md={9} sm={12}>
                        {true ? (
                            <Box
                                sx={{
                                    display: { sm: 'flex', xs: 'none' }
                                }}
                            >
                                <GameSelectionDropDown title={'Games'} left={'-60px'} setSelect={setSelect} />
                                <GameSelectionDropDown title={'Categories'} left={'-65px'} setSelect={setSelect} />
                                <GameSelectionDropDown title={'Currencies'} left={'-65px'} setSelect={setSelect} />
                                <GameSelectionDropDown title={'Regions'} left={'-60px'} setSelect={setSelect} />
                                <GameSelectionDropDown title={'Platform'} left={'-60px'} setSelect={setSelect} />
                            </Box>
                        ) : (
                            <Grid sx={{ display: { sm: 'flex', xs: 'none' } }}>
                                {[1, 2, 3, 4, 5].map((data) => (
                                    <Skelton
                                        style={{
                                            height: '40px',
                                            width: '200px',
                                            mr: 1
                                        }}
                                    />
                                ))}
                            </Grid>
                        )}
                        <Box
                            sx={{
                                ...searchBtnsWrap
                            }}
                        >
                            {true
                                ? SearchBtn.map((data, index) => (
                                      <Button
                                          onClick={() => openDrawer()}
                                          sx={{
                                              ...searchBtnsSx
                                          }}
                                      >
                                          {data}
                                          <ExpandMoreIcon
                                              sx={{
                                                  marginLeft: '14px',
                                                  color: '#FFFF',
                                                  fontSize: 22
                                              }}
                                          />
                                      </Button>
                                  ))
                                : [1, 2, 3].map((data) => (
                                      <Skelton
                                          style={{
                                              height: '40px',
                                              width: '370px',
                                              mr: 1
                                          }}
                                      />
                                  ))}
                        </Box>
                    </Grid>
                    <Grid>
                        {modalBottom && <BottomModal open={openDrawer} close={closeDrawer} setSelect={setSelect} select={select} />}
                    </Grid>
                    <Grid
                        item
                        md={3}
                        sm={12}
                        xs={12}
                        order={{ md: 2, xs: 1 }}
                        sx={{
                            display: 'flex',
                            justifyContent: 'end',
                            pb: { md: 0, xs: 2 }
                        }}
                    >
                        {true ? (
                            <GameOrderDropDown title={gameOrder} right={'-80px'} selectOrder={setGameOrder} orderPattern={orderPattern} />
                        ) : (
                            <Skelton
                                style={{
                                    height: '40px',
                                    width: { sm: '200px', xs: '170px' },
                                    mb: { sm: 1, xs: 0 }
                                }}
                            />
                        )}
                    </Grid>
                </Grid>
                {select.length > 0 && (
                    <Box
                        sx={{
                            maxHeight: '200px',
                            overflowY: 'auto',
                            scrollbarWidth: 'none'
                        }}
                    >
                        <Grid sx={{ pt: 2, display: 'flex', justifyContent: 'space-between' }}>
                            <Grid
                                sx={{
                                    display: 'flex'
                                }}
                            >
                                {select.map((item, index) => {
                                    return (
                                        <Grid
                                            key={index}
                                            sx={{
                                                ...catelogSearchResultShow
                                            }}
                                            onClick={() => {
                                                const updateArray = select.filter((itm) => itm != item);
                                                return setSelect(updateArray);
                                            }}
                                        >
                                            <Typography
                                                sx={{
                                                    color: '#FFFF',
                                                    ...catelogSearchRestTxt
                                                }}
                                            >
                                                {item}
                                            </Typography>
                                            <CancelIcon sx={{ color: '#146F30', ml: 0.7, cursor: 'pointer' }} />
                                        </Grid>
                                    );
                                })}
                            </Grid>
                            <Grid
                                sx={{
                                    ...catelogSearchRest
                                }}
                                onClick={() => setSelect([])}
                            >
                                <Typography
                                    sx={{
                                        ...catelogSearchRestTxt
                                    }}
                                >
                                    Reset All
                                </Typography>
                            </Grid>
                        </Grid>
                    </Box>
                )}
                <Grid container spacing={{ sm: 1.7, xs: 1 }} sx={{ pt: 2.5 }}>
                    {true
                        ? CatalogGames.slice(0, displayedImages).map((data, index) => (
                              <Grid item lg={2} md={2.4} sm={4} xs={4} key={index}>
                                  <Card
                                      onClick={() => navigate('/game-purchase')}
                                      sx={{
                                          ...catelogCard
                                      }}
                                  >
                                      <Box
                                          sx={{
                                              ...catelogCardShadow
                                          }}
                                          className="CatalogImage"
                                      >
                                          <CardMedia
                                              component="img"
                                              image={data.imageSrc}
                                              title="green iguana"
                                              sx={{
                                                  ...catelogCardImg
                                              }}
                                              className="CatalogImage"
                                          />
                                      </Box>
                                      <Grid
                                          sx={{
                                              display: { sm: 'flex', xs: 'block' },
                                              justifyContent: 'space-between',
                                              px: { sm: 0.5, xs: 0 },
                                              pt: { sm: 2, xs: 1 }
                                          }}
                                      >
                                          <Typography
                                              sx={{
                                                  ...catelogCardPrice
                                              }}
                                          >
                                              20 990 KZT
                                          </Typography>
                                          <Typography
                                              sx={{
                                                  ...catelogCardDisPrice
                                              }}
                                          >
                                              25 990 KZT
                                          </Typography>
                                      </Grid>
                                      <Typography
                                          sx={{
                                              ...catelogCardTxt
                                          }}
                                      >
                                          {data.name}
                                      </Typography>
                                  </Card>
                              </Grid>
                          ))
                        : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18].map((data, index) => (
                              <Grid item lg={2} md={3} sm={4} xs={4} sx={{ p: 1 }}>
                                  <Skelton
                                      style={{
                                          height: { sm: '278px', xs: '133px' }
                                      }}
                                  />
                                  <Skelton
                                      style={{
                                          height: 21,
                                          mt: 1,
                                          borderRadius: 1
                                      }}
                                  />
                                  <Skelton
                                      style={{
                                          height: 31,
                                          mt: 1,
                                          borderRadius: 1,
                                          width: '70%'
                                      }}
                                  />
                              </Grid>
                          ))}
                </Grid>
            </Grid>
            <Grid sx={{ ...moreBtnWrap }}>
                {true ? (
                    <Button
                        onClick={() => loadMoreImages()}
                        sx={{
                            ...moreBtn
                        }}
                    >
                        Load more
                    </Button>
                ) : (
                    ''
                )}
            </Grid>
        </Container>
    );
}

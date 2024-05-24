import { useEffect, useState } from 'react';
import Skeleton from '@mui/material/Skeleton';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import { Container, Typography, Grid, Button, Box, Tabs, Tab } from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSteam, faXbox, faPlaystation } from '@fortawesome/free-brands-svg-icons';
import { faDesktop } from '@fortawesome/free-solid-svg-icons';
import Skelton from 'ui-component/landing/Components/Skelton';
import GameSlider from './GameSlider';
import { useNavigate } from 'react-router-dom';
import { containerSpace, skeltonColor } from 'ui-component/landing/constants/style';
import {
    GamCattabSx,
    GamTitle,
    GamCatXsBtn,
    GamCatBecBtn,
    GamCatScrolBtn,
    GamCatBecBtnTxt,
    GamCatMoreBtn,
    GamCatbtnSx,
    GamCattabWrap
} from 'ui-component/landing/constants/homepageSx';
// import pls4 from 'assets/images/landing/Play4.svg';
import pls5 from 'assets/images/landing/ps5.svg';
import xbox from 'assets/images/landing/xbo.svg';
import steam from 'assets/images/landing/steamHead.svg';
import nin from 'assets/images/landing/Nintendo.svg';
import myAxios from '../../../../axios';

const icon = {
    fontSize: 20,
    paddingRight: '10px'
};

const tabArray = [
    { name: 'PlayStation', smName: 'PS', kinguinSearchName: 'PlayStation', icon: faPlaystation, headImage: pls5 },
    { name: 'Xbox', smName: 'Xbox', kinguinSearchName: 'XBOX ONE', icon: faXbox, headImage: xbox },
    { name: 'Steam', smName: 'Steam', kinguinSearchName: 'Steam', icon: faSteam, headImage: steam },
    { name: 'PC', smName: 'PC', kinguinSearchName: 'PC', icon: faDesktop, headImage: nin }
    // { name: 'Others', smName: 'Others', kinguinSearchName: 'Other', icon: faDesktop, headImage: nin }
];

export default function GamesCatelog() {
    const [sliderRef, setSliderRef] = useState(null);
    const [arrayShow, setArrayShow] = useState([]);
    const [newArray, setNewArray] = useState([]);
    const [headImagesAarray, setHeadImagesArray] = useState([]);
    const [value, setValue] = useState(0);
    const [check, setCheck] = useState(false);
    const [ply4And5, setPlay4And5] = useState([]);
    const [xbox, setXbox] = useState([]);
    const [steam, setSteam] = useState([]);
    const [pc, setPc] = useState([]);
    // const [nintendo, setNintendo] = useState([]);
    // const [other, setOther] = useState([]);
    const [gameCatalogLoading, setGameCatalogLoading] = useState(false);
    const navigate = useNavigate();
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    function a11yProps(index) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`
        };
    }
    useEffect(() => {
        const getGameCatalogProducts = async () => {
            const response = await myAxios.get('/nonAuth/game-catalog-products');
            if (response && response.status === 200) {
                setPlay4And5(response.data.data.play4and5_results);
                setXbox(response.data.data.xbox_results);
                setSteam(response.data.data.steam_results);
                setPc(response.data.data.pc_results);
                // setNintendo(response.data.data.nintendo_results);
                // setOther(response.data.data.other_results);
                setGameCatalogLoading(true);
            }
        };
        getGameCatalogProducts();
    }, []);
    const arrayChanged = (Datas) => {
        const GamesCatalog = [];
        const chunkSize = 2;
        for (let i = 0; i < Datas.length; i += chunkSize) {
            const slicedArray = Datas.slice(i, i + chunkSize);
            GamesCatalog.push({ games: slicedArray });
        }
        setArrayShow((prev) => [...prev, GamesCatalog]);
    };
    useEffect(() => {
        const getTabArray = (platformName, image) => {
            // let platformArray = [];
            // if (platformName === 'Other') {
            //     playStation4Array = allProducts.filter(
            //         (product) =>
            //             product.platform !== 'PlayStation 4' &&
            //             product.platform !== 'PlayStation 5' &&
            //             product.platform !== 'XBOX ONE' &&
            //             product.platform !== 'Steam' &&
            //             product.platform !== 'Nintendo'
            //     );
            // } else {
            //     playStation4Array = allProducts.filter((product) => product.platform == platformName);
            // }
            // if(platformName === 'PlayStation 4'){
            //   setNewArray((prev) => [...prev, pl4]);
            // }else if(platformName === 'PlayStation 5'){
            if (platformName === 'PlayStation') {
                setNewArray((prev) => [...prev, ply4And5]);
            } else if (platformName === 'XBOX ONE') {
                setNewArray((prev) => [...prev, xbox]);
            } else if (platformName === 'Steam') {
                setNewArray((prev) => [...prev, steam]);
            } else {
                setNewArray((prev) => [...prev, pc]);
            }
            // else {
            //     setNewArray((prev) => [...prev, other]);
            // }
            setHeadImagesArray((prev) => [...prev, image]);
        };
        if (gameCatalogLoading) {
            tabArray.map((tabArr) => {
                return getTabArray(tabArr.kinguinSearchName, tabArr.headImage);
            });
            setCheck(true);
        }
    }, [gameCatalogLoading]);

    useEffect(() => {
        if (check) {
            newArray.forEach((item) => arrayChanged(item));
        }
    }, [check, newArray]);
    return (
        <Container maxWidth="xl" sx={{ ...containerSpace }}>
            <Grid sx={{ pt: { md: 2, xs: 0 } }}>
                {/* <ZoomInAnimation> */}
                <Grid>
                    <Grid sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        {gameCatalogLoading ? (
                            <Typography
                                sx={{
                                    ...GamTitle
                                }}
                            >
                                Game catalog
                            </Typography>
                        ) : (
                            <Skelton width="30%" height={40} style={{ marginBottom: '24px' }} />
                        )}
                        {gameCatalogLoading ? (
                            <Button
                                sx={{
                                    ...GamCatXsBtn
                                }}
                            >
                                <ChevronRightIcon />
                            </Button>
                        ) : (
                            <Skelton width="30%" height={40} style={{ marginBottom: '24px' }} />
                        )}
                    </Grid>
                    <Grid
                        container
                        sx={{
                            ...GamCattabWrap
                        }}
                    >
                        <Grid
                            sx={{
                                maxWidth: { xl: '100%', lg: '78.5%', md: '75%', xs: '100%' },
                                display: 'flex'
                            }}
                        >
                            {gameCatalogLoading ? (
                                <Tabs
                                    TabIndicatorProps={{
                                        sx: {
                                            display: 'none'
                                        }
                                    }}
                                    value={value}
                                    onChange={handleChange}
                                    variant="scrollable"
                                    scrollButtons={false}
                                    aria-label="basic tabs example"
                                >
                                    {tabArray.map((tabArr, index) => (
                                        <Tab
                                            key={index}
                                            sx={{
                                                ...GamCattabSx,
                                                minHeight: '39px !important'
                                            }}
                                            label={
                                                <Grid
                                                    sx={{
                                                        ...GamCatbtnSx,
                                                        background: value === index ? 'rgba(0, 238, 52, 0.15)' : 'rgba(131, 151, 195, 0.1)',
                                                        color: value === index ? '#00EE34' : '#8C95AD'
                                                    }}
                                                >
                                                    <FontAwesomeIcon icon={tabArr.icon} style={{ ...icon }} />
                                                    <Box sx={{ display: { sm: 'flex', xs: 'none' } }}>{tabArr.name}</Box>
                                                    <Box sx={{ display: { sm: 'none', xs: 'flex' } }}>{tabArr.smName}</Box>
                                                </Grid>
                                            }
                                            {...a11yProps(index)}
                                        />
                                    ))}
                                </Tabs>
                            ) : (
                                <>
                                    {tabArray.map((index) => (
                                        <Skelton
                                            key={index}
                                            width={index === 1 || index === 3 ? '146px' : '100px'}
                                            height={40}
                                            style={{
                                                borderRadius: 10,
                                                marginRight: '12px'
                                            }}
                                        />
                                    ))}
                                </>
                            )}
                        </Grid>
                        <Grid
                            sx={{
                                display: { md: 'flex', xs: 'none' },
                                justifyContent: 'end',
                                alignItems: 'center'
                            }}
                        >
                            {gameCatalogLoading ? (
                                <>
                                    <Grid sx={{ pr: 2 }}>
                                        <Button
                                            sx={{
                                                ...GamCatBecBtn
                                            }}
                                        >
                                            <Typography
                                                sx={{
                                                    ...GamCatBecBtnTxt
                                                }}
                                            >
                                                All
                                            </Typography>{' '}
                                            <ChevronRightIcon />
                                        </Button>
                                    </Grid>

                                    {arrayShow ? (
                                        <>
                                            <Grid>
                                                <Button
                                                    onClick={sliderRef?.slickPrev}
                                                    type="button"
                                                    sx={{
                                                        ...GamCatScrolBtn,
                                                        marginRight: '15px',
                                                        justifyContent: 'end !important'
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
                                            <Grid>
                                                <Button
                                                    onClick={sliderRef?.slickNext}
                                                    type="button"
                                                    sx={{
                                                        ...GamCatScrolBtn,
                                                        marginRight: '6px'
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
                                    ) : (
                                        ' '
                                    )}
                                </>
                            ) : (
                                <>
                                    <Skelton
                                        width={'100px'}
                                        height={30}
                                        style={{
                                            borderRadius: 10,
                                            marginRight: '12px'
                                        }}
                                    />
                                    <Skeleton variant="circular" width={40} height={40} sx={{ ...skeltonColor, mr: 1 }} />
                                    <Skeleton variant="circular" width={40} height={40} sx={{ ...skeltonColor }} />
                                </>
                            )}
                        </Grid>
                    </Grid>

                    {arrayShow.length > 0 && check ? (
                        arrayShow[value].length > 0 ? (
                            <GameSlider setSliderRef={setSliderRef} arrayShow={arrayShow[value]} headImage={headImagesAarray[value]} />
                        ) : (
                            <Typography sx={{ color: 'white', textAlign: 'center', mb: 2 }}>There is no any product.</Typography>
                        )
                    ) : (
                        <GameSlider setSliderRef={setSliderRef} arrayShow={[]} headImage={null} />
                    )}

                    <Grid
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            pt: 1
                        }}
                    >
                        {gameCatalogLoading ? (
                            <Button
                                onClick={() => navigate('/game-catalog')}
                                sx={{
                                    ...GamCatMoreBtn
                                }}
                            >
                                Load more
                            </Button>
                        ) : (
                            ' '
                        )}
                    </Grid>
                </Grid>
                {/* </ZoomInAnimation> */}
            </Grid>
        </Container>
    );
}

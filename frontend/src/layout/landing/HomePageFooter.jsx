import { Button, CardMedia, Container, Divider, Grid, Link, Typography, useMediaQuery } from '@mui/material';
import React from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import logo from '../../assets/images/landing/Greenlogo.svg';
import Wlogo from '../../assets/images/landing/WhiteLogo.svg';
import whiteTele from '../../assets/images/landing/telegram1.svg';
import { containerSpace } from '../../ui-component/landing/constants/style';
import { useSelector, useDispatch } from 'react-redux';
import Skelton from '../../ui-component/landing/Components/Skelton';
import { changeMobileDropDownView } from '../../store/slices/landing/showMobileDropDown';
import HomeDropDown from '../../ui-component/landing/Components/HomeDropDown';
import { Social_Media, PaymentMethods, footerGames, nameCurrency, nameCountry } from '../../ui-component/landing/Data/LayoutData';
import {
    footer_text_sx,
    socialMediaSx,
    footerPaymentSx,
    footerPaymentImg,
    footerCopySx,
    footerTeleWrap,
    footerTeleTxt,
    footerTeleTitle,
    footerTeleImg,
    footerTeleBtn,
    footerBtnTitle,
    footerBtn1,
    FooterDropDownTxt
} from '../../ui-component/landing/constants/LayoutSx';
import { useNavigate } from 'react-router-dom';
import myAxios from '../../axios';
import appleImage from '../../assets/images/landing/AppStore.svg';
import playStoreImage from '../../assets/images/landing/PlayStore.svg';

const paddRgt = {
    pr: { md: 0, xs: 2.5 }
};
export const SocialMeadia = () => {
    return Social_Media.map((data, index) => (
        <Grid
            key={index}
            item
            lg={1.1}
            md={1.3}
            xs={1.5}
            sx={{
                ...socialMediaSx
            }}
        >
            <CardMedia component="img" image={data.image} alt="not" sx={{ objectFit: 'fill' }} />
        </Grid>
    ));
};

export const Support = () => {
    return true ? (
        <>
            <Typography
                sx={{
                    ...footer_text_sx
                    // display: { sm: 'block', xs: 'none' }
                }}
            >
                For cooperation issues and proposals
            </Typography>
            <Link
                sx={{
                    fontSize: 16,
                    fontWeight: 500,
                    pb: 0.4
                    // display: { sm: 'block', xs: 'none' }
                }}
            >
                info@codegame.gg
            </Link>
        </>
    ) : (
        <>
            <Skelton
                width="90%"
                height={17}
                style={{
                    backgroundColor: 'rgba(131, 151, 195, 0.1)',
                    marginTop: '12px'
                }}
            />
            <Skelton
                width="60%"
                height={17}
                style={{
                    backgroundColor: 'rgba(131, 151, 195, 0.1)',
                    marginTop: '12px'
                }}
            />
            <Skelton
                width="75%"
                height={17}
                style={{
                    backgroundColor: 'rgba(131, 151, 195, 0.1)',
                    marginTop: '12px'
                }}
            />
        </>
    );
};

export const Payment = () => {
    return PaymentMethods.map((data, index) => (
        <Button
            key={index}
            sx={{
                ...footerPaymentSx
            }}
        >
            <CardMedia component="img" image={data.image} alt="not" sx={{ ...footerPaymentImg }} />
        </Button>
    ));
};

const Footer = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { selectedCountryName, selectCurrency } = useSelector((state) => state.mobileDropDown);
    const isSmallScreen = useMediaQuery('(max-width:600px)');
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [anchorE2, setAnchorE2] = React.useState(null);
    const [getCountries, setGetCountries] = React.useState([]);
    const [getCurrencies, setGetCurrencies] = React.useState([]);
    React.useEffect(() => {
        const getRegionsAndCurrencies = async () => {
            const response = await myAxios.get('/nonAuth/get-region-currencies');
            setGetCountries(response.data.data.regions);
            setGetCurrencies(response.data.data.currencies);
        };
        getRegionsAndCurrencies();
    }, []);
    return (
        <>
            <Container
                maxWidth="xl"
                sx={{
                    ...containerSpace
                }}
            >
                <Grid container sx={{ pt: 3, pb: { md: 8, sm: 3 } }}>
                    <Grid
                        item
                        md={4}
                        sm={12}
                        xs={12}
                        sx={{
                            display: { sm: 'block', xs: 'grid' },
                            justifyContent: 'center'
                        }}
                    >
                        {/* {skeltonStatus ? ( */}
                        <>
                            <img src={isSmallScreen ? Wlogo : logo} alt="not" style={{ cursor: 'pointer' }} onClick={() => navigate('/')} />
                            <Typography
                                sx={{
                                    ...footerCopySx
                                }}
                            >
                                © 2023 codegames.gg. All right reserved
                            </Typography>
                            <Grid container sx={{ pt: 3, display: { md: 'flex', xs: 'none' } }}>
                                <SocialMeadia />
                            </Grid>
                        </>
                        {/* ) : (
                            <>
                                <Skelton
                                    width="65%"
                                    height={30}
                                    style={{
                                        backgroundColor: 'rgba(131, 151, 195, 0.1)',
                                        borderRadius: '5px'
                                    }}
                                />
                                <Skelton
                                    width="80%"
                                    height={17}
                                    style={{
                                        backgroundColor: 'rgba(131, 151, 195, 0.1)',
                                        marginTop: '12px'
                                    }}
                                />
                            </>
                        )} */}
                    </Grid>
                    <Grid container sx={{ py: 1.5, display: { sm: 'none', xs: 'flex' } }}>
                        {/* {skeltonStatus ? ( */}
                        <>
                            <Payment />
                        </>
                        {/* ) : (
                            <>
                                {[1, 2, 3, 4, 5].map((data, index) => (
                                    <Skelton
                                        key={index}
                                        height={36}
                                        style={{
                                            backgroundColor: 'rgba(131, 151, 195, 0.1)',
                                            marginRight: '5px',
                                            borderRadius: '8px',
                                            width: '44px'
                                        }}
                                    />
                                ))}
                            </>
                        )} */}
                    </Grid>
                    <Grid item md={4} sm={12} xs={12}>
                        {selectedCountryName.name ? (
                            <Grid container spacing={2} sx={{ pt: { md: 0, sm: 1.8, xs: 0 } }}>
                                <Grid item md={12} sm={6} xs={12}>
                                    <Typography
                                        sx={{
                                            ...footerBtnTitle
                                        }}
                                    >
                                        Region
                                    </Typography>
                                    <Grid container justifyContent={{ md: 'flex-start', xs: 'space-between' }} pt={1}>
                                        <Grid item md={6.5} xs={7.3}>
                                            <Grid
                                                sx={{
                                                    ...footerBtn1
                                                }}
                                                onClick={(e) => {
                                                    if (isSmallScreen) {
                                                        dispatch(
                                                            changeMobileDropDownView({
                                                                status: true,
                                                                title: 'Your Region',
                                                                data: {
                                                                    array: nameCountry
                                                                },
                                                                dropDownType: 'country'
                                                            })
                                                        );
                                                    } else {
                                                        setAnchorE2(e.currentTarget);
                                                    }
                                                }}
                                            >
                                                <Grid
                                                    sx={{
                                                        display: 'flex',
                                                        alignItems: 'center'
                                                    }}
                                                >
                                                    <img
                                                        src={selectedCountryName.flg}
                                                        alt="not"
                                                        style={{ height: '24px', width: '24px' }}
                                                    />
                                                    <Typography sx={{ ...FooterDropDownTxt }}>{selectedCountryName.name}</Typography>
                                                </Grid>
                                                <ExpandMoreIcon />
                                            </Grid>
                                            <HomeDropDown
                                                open={anchorE2}
                                                close={() => {
                                                    setAnchorE2(null);
                                                }}
                                                arr={getCountries}
                                                width={280}
                                                title={'Your Region'}
                                            />
                                        </Grid>
                                        <Grid item md={4.5} xs={4.4} px={{ md: 1, xs: 0 }}>
                                            <Grid
                                                onClick={(e) => {
                                                    if (isSmallScreen) {
                                                        dispatch(
                                                            changeMobileDropDownView({
                                                                status: true,
                                                                title: 'Валюта',
                                                                data: {
                                                                    array: nameCurrency
                                                                },
                                                                dropDownType: 'currency'
                                                            })
                                                        );
                                                    } else {
                                                        setAnchorEl(e.currentTarget);
                                                    }
                                                }}
                                                sx={{
                                                    ...footerBtn1
                                                }}
                                            >
                                                <Typography variant="overline" sx={{ ...FooterDropDownTxt }}>
                                                    {selectCurrency.name}
                                                </Typography>
                                                <ExpandMoreIcon />
                                            </Grid>
                                            <HomeDropDown
                                                open={anchorEl}
                                                close={() => {
                                                    setAnchorEl(null);
                                                }}
                                                arr={getCurrencies}
                                                width={169}
                                                title={''}
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item md={12} sm={6}>
                                    <Typography
                                        sx={{
                                            ...footerTeleTitle
                                        }}
                                    >
                                        Support
                                    </Typography>
                                    <Grid>
                                        <Button
                                            style={{
                                                ...footerTeleBtn
                                            }}
                                        >
                                            <Grid
                                                sx={{
                                                    ...footerTeleWrap
                                                }}
                                            >
                                                <CardMedia
                                                    component="img"
                                                    image={whiteTele}
                                                    alt="not"
                                                    sx={{
                                                        ...footerTeleImg
                                                    }}
                                                />
                                            </Grid>
                                            <Typography
                                                variant="overline"
                                                sx={{
                                                    ...footerTeleTxt
                                                }}
                                            >
                                                Official Telegram
                                            </Typography>
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        ) : (
                            <>
                                <Skelton
                                    width="30%"
                                    height={13}
                                    style={{
                                        backgroundColor: 'rgba(131, 151, 195, 0.1)',
                                        mt: { md: 0, sm: 2, xs: 0 }
                                    }}
                                />
                                <Skelton
                                    width="60%"
                                    height={40}
                                    style={{
                                        backgroundColor: 'rgba(131, 151, 195, 0.1)',
                                        marginTop: '12px'
                                    }}
                                />
                                <Skelton
                                    width="60%"
                                    height={40}
                                    style={{
                                        backgroundColor: 'rgba(131, 151, 195, 0.1)',
                                        marginTop: '12px',
                                        display: { md: 'flex', sm: 'none', xs: 'flex' }
                                    }}
                                />
                            </>
                        )}
                    </Grid>
                    <Grid item md={4} xs={12} sx={{}}>
                        <Grid spacing={2} container sx={{ pt: { md: 3, sm: 2, xs: 1 } }}>
                            <Grid item sm={12} sx={{}}>
                                <Grid item md={6} sm={3.5} xs={12} sx={{ display: { sm: 'none', xs: 'block' }, pt: 2, pb: 1 }}>
                                    <Support />
                                </Grid>

                                <Grid container sx={{ display: 'flex', pt: { md: 0, xs: 1 } }}>
                                    <Grid item xl={5.4} md={6} sm={3.3} xs={6} sx={{ pr: { sm: 0, xs: 0.5 } }}>
                                        <CardMedia
                                            component="img"
                                            image={appleImage}
                                            alt="not"
                                            sx={{
                                                height: '48px',
                                                width: { lg: '174px', md: '140px', sm: '174px', xs: '100%' },
                                                objectFit: 'fill'
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xl={5} md={6} sm={3} xs={6}>
                                        <CardMedia
                                            component="img"
                                            image={playStoreImage}
                                            alt="not"
                                            sx={{
                                                height: '48px',
                                                width: { lg: '174px', md: '140px', sm: '174px', xs: '100%' },
                                                objectFit: 'fill'
                                            }}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item sm={6} sx={{ display: { md: 'none', sm: 'block', xs: 'none' } }}>
                                <Grid container sx={{ display: { sm: 'flex', xs: 'none' }, pt: 1 }}>
                                    {/* {skeltonStatus ?  */}
                                    <SocialMeadia />
                                    {/* : ' '} */}
                                </Grid>
                            </Grid>
                            <Grid
                                item
                                md={5}
                                sm={2.5}
                                xs={12}
                                sx={{
                                    display: { sm: 'block', xs: 'flex' },
                                    justifyContent: 'space-between',
                                    pt: { md: '16px !important', xs: '24px !important' }
                                }}
                            >
                                {/* {skeltonStatus ? ( */}
                                <>
                                    {footerGames.map((data, index) => (
                                        <Typography
                                            onClick={() => navigate(data.url)}
                                            key={index}
                                            sx={{
                                                ...footer_text_sx,
                                                display: 'flex',
                                                pb: { sm: 0.4, xs: 0.1 }
                                            }}
                                        >
                                            {data.name}
                                        </Typography>
                                    ))}
                                </>
                                {/* ) : (
                                    footerGames.map((data, index) => (
                                        <Skelton
                                            key={index}
                                            width="80%"
                                            height={19}
                                            style={{
                                                backgroundColor: 'rgba(131, 151, 195, 0.1)',
                                                borderRadius: '6px',
                                                marginTop: '12px'
                                            }}
                                        />
                                    ))
                                )} */}
                            </Grid>
                            <Grid
                                item
                                md={5}
                                sm={3.5}
                                xs={12}
                                sx={{ display: { sm: 'block', xs: 'none' }, pt: { md: '16px !important', xs: '24px !important' } }}
                            >
                                <Support />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
            <Divider
                sx={{
                    borderColor: 'rgba(255, 255, 255, 0.05)',
                    borderWidth: { sm: '1px', xs: 0 }
                }}
            />
            <Container maxWidth="xl" sx={{ ...containerSpace, py: { sm: 1.4, xs: 0 } }}>
                <Grid container>
                    <Grid item md={6} sm={12} sx={{ display: { sm: 'flex', xs: 'none' }, pt: { md: 0, xs: 1 } }}>
                        {/* {skeltonStatus ? ( */}
                        <>
                            <Payment />
                        </>
                        {/* ) : (
                            <>
                                {[1, 2, 3, 4, 5].map((data, index) => (
                                    <Skelton
                                        width="54px"
                                        key={index}
                                        height={36}
                                        style={{
                                            backgroundColor: 'rgba(131, 151, 195, 0.1)',
                                            marginRight: '8px',
                                            borderRadius: '8px'
                                        }}
                                    />
                                ))}
                            </>
                        )} */}
                    </Grid>
                    <Grid
                        item
                        md={6}
                        sm={12}
                        sx={{
                            pt: { md: 1, sm: 3 },
                            display: { sm: 'flex', xs: 'none' },
                            justifyContent: { md: 'space-around', xs: 'none' }
                        }}
                    >
                        {/* {skeltonStatus ? ( */}
                        <Typography sx={{ ...footer_text_sx, ...paddRgt }} onClick={() => navigate('/faqs')}>
                            FAQ
                        </Typography>
                        {/* ) : (
                            <Skelton
                                width="14%"
                                height={20}
                                style={{
                                    backgroundColor: 'rgba(131, 151, 195, 0.1)',
                                    borderRadius: '3px'
                                }}
                            />
                        )} */}
                        {/* {skeltonStatus ? ( */}
                        <Typography sx={{ ...footer_text_sx, ...paddRgt }} onClick={() => navigate('/privacy-policy')}>
                            Privacy Policy
                        </Typography>
                        {/* ) : (
                            <Skelton
                                width="44%"
                                height={20}
                                style={{
                                    backgroundColor: 'rgba(131, 151, 195, 0.1)',
                                    borderRadius: '3px'
                                }}
                            />
                        )} */}

                        {/* {skeltonStatus ? ( */}
                        <Typography sx={{ ...footer_text_sx, ...paddRgt }} onClick={() => navigate('/user-agreement')}>
                            Contract offer
                        </Typography>
                        {/* ) : (
                            <Skelton
                                width="24%"
                                height={20}
                                style={{
                                    backgroundColor: 'rgba(131, 151, 195, 0.1)',
                                    borderRadius: '3px'
                                }}
                            />
                        )} */}
                    </Grid>
                </Grid>
            </Container>
        </>
    );
};

export default Footer;

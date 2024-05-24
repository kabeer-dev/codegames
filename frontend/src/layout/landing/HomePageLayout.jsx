import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import { RiMenuFill } from 'react-icons/ri';
import logo from '../../assets/images/landing/WhiteLogo.svg';
import { useNavigate } from 'react-router-dom';
import Autocomplete from '@mui/material/Autocomplete';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { CardMedia, Container, Grid, useMediaQuery } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TextField from '@mui/material/TextField';
import HomeDropDown from '../../ui-component/landing/Components/HomeDropDown';
import { useDispatch, useSelector } from 'react-redux';
import { changeMobile } from '../../store/slices/landing/showMobileScreen';
import HomePageGameMenu from '../../ui-component/landing/Components/HomePageGameMenu';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import './layout.css';
import { containerSpace, skeltonColor } from '../../ui-component/landing/constants/style';
import { HeadernavItems, headergamesArray, Headertop100Films } from '../../ui-component/landing/Data/LayoutData';
import {
    HeadernavItemSx,
    HeadernavItemWrap,
    HeaderLogoWrap,
    HeaderLogoImg,
    HeaderCatBtn,
    HeaderCatBtnTxt,
    HeaderCatBtnXs,
    HeaderInputSx,
    HeaderSecrchIcon,
    HeaderSecrchIconXs,
    HeaderDropDown,
    HeaderDropDownTxt
} from '../../ui-component/landing/constants/LayoutSx';
import Skeleton from '@mui/material/Skeleton';
import myAxios from '../../axios';
import { AddProductDetail } from '../../store/slices/landing/productDetail';
import { AddProductGameDetail } from '../../store/slices/landing/productDetail';
import { AddProductCustomPrice } from '../../store/slices/landing/productDetail';

// const CssTextField = withStyles({
//     root: {
//         '& .MuiOutlinedInput-root': {
//             '& fieldset': {
//                 borderWidth: 0
//             },
//             '&.Mui-focused fieldset': {
//                 borderColor: '#3CCA5B',
//                 borderRadius: 16
//             }
//         }
//     }
// })(TextField);
// const CssTextField1 = withStyles({
//     root: {
//         '& .MuiOutlinedInput-root': {
//             '& fieldset': {
//                 borderWidth: 0
//             },
//             '&.Mui-focused fieldset': {
//                 borderColor: '#3CCA5B',
//                 borderRadius: 8
//             }
//         }
//     }
// })(TextField);

const theme = createTheme();
function DrawerAppBar({ children }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isMediumScreen = useMediaQuery('(min-width: 600px) and (max-width: 900px)');
    const [showOverlay, setShowOverlay] = React.useState(false);
    const { status } = useSelector((state) => state.changeMobileScreen);
    const { modalStatus } = useSelector((state) => state.gallery);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [gameMenu, setGameMenu] = React.useState(null);
    const [anchorE2, setAnchorE2] = React.useState(null);
    const [inputFocused, setInputFocused] = React.useState(false);
    const [getCountries, setGetCountries] = React.useState([]);
    const [getCurrencies, setGetCurrencies] = React.useState([]);
    const { selectedCountryName, selectCurrency } = useSelector((state) => state.mobileDropDown);
    const isSmallScreen = useMediaQuery('(max-width:600px)');
    React.useEffect(() => {
        if (gameMenu && isSmallScreen) {
            setGameMenu(null);
        }
    }, [isSmallScreen]);
    const showOverlayHandler = () => {
        setShowOverlay(true);
    };
    const hideOverlayHandler = () => {
        setShowOverlay(false);
    };
    React.useEffect(() => {
        // Apply or remove blur to the body when showOverlay changes
        // document.body.style.filter = showOverlay ? "blur(5px)" : "none";
    }, [showOverlay]);
    const display = modalStatus;
    const handleFocus = () => {
        setInputFocused(true);
    };
    const handleBlur = () => {
        setInputFocused(false);
    };
    React.useEffect(() => {
        const getRegionsAndCurrencies = async () => {
            const response = await myAxios.get('/nonAuth/get-region-currencies');
            setGetCountries(response.data.data.regions);
            setGetCurrencies(response.data.data.currencies);
        };
        getRegionsAndCurrencies();
    }, []);

    return selectedCountryName.name ? (
        <Box sx={{ display: display }}>
            <CssBaseline />
            <AppBar component="nav" sx={{ background: '#1C2138 !important' }}>
                <Container
                    maxWidth="xl"
                    sx={{
                        ...containerSpace,
                        pt: 0.5
                    }}
                >
                    <Grid
                        item
                        xs={12}
                        sx={{
                            ...HeadernavItemWrap
                        }}
                    >
                        {HeadernavItems.map((item, index) => (
                            <Button
                                onClick={() => {
                                    dispatch(AddProductDetail(null));
                                    dispatch(AddProductGameDetail(null));
                                    dispatch(AddProductCustomPrice(''));
                                    navigate(item.url);
                                }}
                                key={index}
                                sx={{
                                    ...HeadernavItemSx,
                                    mr: index === HeadernavItems.length - 1 ? 0 : 1,
                                    pr: index === HeadernavItems.length - 1 ? 0 : 'auto'
                                }}
                            >
                                {item.name}
                            </Button>
                        ))}
                    </Grid>
                    <Grid container sx={{ pb: 1.5, pt: { sm: 0, xs: 1.5 } }}>
                        <Grid
                            item
                            xl={2.5}
                            lg={3}
                            md={3}
                            sm={12}
                            sx={{
                                ...HeaderLogoWrap
                            }}
                        >
                            <CardMedia
                                onClick={() => navigate('/')}
                                component="img"
                                image={logo}
                                alt="not"
                                sx={{
                                    ...HeaderLogoImg
                                }}
                            />
                        </Grid>
                        <Grid
                            item
                            xl={1.5}
                            lg={1.5}
                            md={1.5}
                            sm={1.8}
                            xs={2}
                            sx={{
                                display: { xs: 'flex' },
                                justifyContent: { md: 'end', xs: 'start' }
                            }}
                        >
                            <Button
                                sx={{
                                    ...HeaderCatBtn
                                }}
                                onClick={(e) => {
                                    setGameMenu(e.currentTarget);
                                }}
                            >
                                <RiMenuFill style={{ width: '24px', height: '24px' }} />
                                <Typography
                                    sx={{
                                        ...HeaderCatBtnTxt
                                    }}
                                >
                                    MENU
                                </Typography>
                            </Button>
                            <Grid
                                sx={{
                                    ...HeaderCatBtnXs
                                }}
                                onClick={() => {
                                    dispatch(changeMobile(!status));
                                }}
                            >
                                {!status ? (
                                    <RiMenuFill style={{ width: '20px', height: '20px' }} />
                                ) : (
                                    <CloseIcon
                                        sx={{
                                            fontSize: { xl: 37, md: 30 },
                                            pr: { sm: 0.7, xs: 0 }
                                        }}
                                    />
                                )}
                            </Grid>
                        </Grid>
                        <HomePageGameMenu
                            open={gameMenu}
                            close={() => {
                                setGameMenu(null);
                            }}
                            arr={headergamesArray}
                            title={'Категории'}
                        />
                        <Grid
                            item
                            xs={8}
                            sx={{
                                display: { sm: 'none', xs: 'flex' },
                                justifyContent: { md: 'start', xs: 'center' }
                            }}
                        >
                            <CardMedia
                                onClick={() => navigate('/')}
                                className="custom_image_size"
                                component="img"
                                image={logo}
                                alt="not"
                                sx={{
                                    ...HeaderLogoImg
                                }}
                            />
                        </Grid>
                        <Grid
                            item
                            xl={5}
                            lg={4.5}
                            md={4.1}
                            sm={6.5}
                            xs={2}
                            sx={{
                                pl: { xl: 1, md: 1.5, sm: 1, xs: 0 }
                            }}
                        >
                            <Grid
                                sx={{
                                    display: { sm: 'flex', xs: 'none' },
                                    alignItems: 'center'
                                }}
                            >
                                <ThemeProvider theme={theme}>
                                    <Autocomplete
                                        disablePortal
                                        id="combo-box-demo"
                                        options={Headertop100Films}
                                        openOnFocus={true}
                                        sx={{
                                            ...HeaderInputSx,
                                            borderRadius: !inputFocused ? 2 : 4
                                        }}
                                        renderInput={(params) => {
                                            return (
                                                <TextField
                                                    {...params}
                                                    variant="outlined"
                                                    placeholder="Search service or game"
                                                    className="Customer_Feild"
                                                    onFocus={handleFocus}
                                                    onBlur={handleBlur}
                                                    InputProps={{
                                                        ...params.InputProps,
                                                        style: {
                                                            color: '#ffffff',
                                                            height: 45,
                                                            paddingRight: 2,
                                                            paddingTop: 2,
                                                            fontSize: 16
                                                        },
                                                        startAdornment: null,
                                                        endAdornment: null
                                                    }}
                                                
                                                    sx={{
                                                        '&.MuiOutlinedInput-root': {
                                                            '& fieldset': {
                                                                borderWidth: 1
                                                            },
                                                            '&.Mui-focused fieldset': {
                                                                borderColor: '#3CCA5B !important',
                                                                borderRadius: 8
                                                            }
                                                        }
                                                    }}
                                                />
                                            );
                                        }}
                                        PaperComponent={({ children }) => (
                                            <List
                                                style={{
                                                    backgroundColor: '#2F3654'
                                                }}
                                            >
                                                {children}
                                            </List>
                                        )}
                                        renderOption={(props, option) => {
                                            return (
                                                <>
                                                    <ListItem
                                                        {...props}
                                                        sx={{
                                                            '&:hover': {
                                                                backgroundColor: '#8397C31A',
                                                                borderRadius: 2
                                                            }
                                                        }}
                                                    >
                                                        <Grid container>
                                                            <Grid item>
                                                                <img src={option.icon} alt="icon" />
                                                            </Grid>
                                                            <Grid
                                                                item
                                                                sx={{
                                                                    fontSize: { md: 16, sm: 14 },
                                                                    fontWeight: '400',
                                                                    ml: 1
                                                                }}
                                                            >
                                                                <Typography>{option.label}</Typography>
                                                            </Grid>
                                                        </Grid>
                                                    </ListItem>
                                                </>
                                            );
                                        }}
                                    />
                                </ThemeProvider>
                                <Grid
                                    style={{
                                        backgroundColor: inputFocused ? ' ' : '  rgba(255, 255, 255, 0.14)',
                                        color: '#fff'
                                    }}
                                    sx={{
                                        ...HeaderSecrchIcon
                                    }}
                                >
                                    <SearchIcon style={{}} />
                                </Grid>
                            </Grid>
                            <Grid
                                sx={{
                                    display: {
                                        sm: 'none',
                                        xs: 'flex'
                                    },
                                    justifyContent: 'end'
                                }}
                            >
                                <Grid
                                    sx={{
                                        ...HeaderSecrchIconXs
                                    }}
                                    onClick={showOverlayHandler}
                                >
                                    <SearchIcon style={{}} />
                                </Grid>
                            </Grid>
                            {showOverlay && (
                                <>
                                    <Grid className="overlay" onClick={hideOverlayHandler}>
                                        <Grid className="modal" onClick={(e) => e.stopPropagation()}>
                                            <Grid
                                                sx={{
                                                    display: 'flex',
                                                    justifyContent: 'space-between'
                                                }}
                                            >
                                                <Autocomplete
                                                    disablePortal
                                                    id="combo-box-demo"
                                                    options={Headertop100Films}
                                                    openOnFocus={true}
                                                    sx={{
                                                        ...HeaderInputSx,
                                                        borderRadius: 2
                                                    }}
                                                    renderInput={(params) => {
                                                        return (
                                                            <TextField
                                                                {...params}
                                                                variant="outlined"
                                                                placeholder="Search service or game"
                                                                className="Customer_Feild"
                                                                onFocus={handleFocus}
                                                                onBlur={handleBlur}
                                                                InputProps={{
                                                                    ...params.InputProps,
                                                                    style: {
                                                                        color: '#ffffff',
                                                                        height: 45,
                                                                        paddingRight: 2,
                                                                        paddingTop: 2,
                                                                        fontSize: 16
                                                                    },
                                                                    startAdornment: null,
                                                                    endAdornment: null
                                                                }}
                                                                sx={{
                                                                    '& .MuiOutlinedInput-root': {
                                                                        '& fieldset': {
                                                                            borderWidth: 0
                                                                        },
                                                                        '&.Mui-focused fieldset': {
                                                                            borderColor: '#3CCA5B',
                                                                            borderRadius: 8
                                                                        }
                                                                    }
                                                                }}
                                                            />
                                                        );
                                                    }}
                                                    PaperComponent={({ children }) => (
                                                        <List
                                                            style={{
                                                                backgroundColor: '#2F3654',
                                                                borderRadius: 4
                                                            }}
                                                        >
                                                            {children}
                                                        </List>
                                                    )}
                                                    renderOption={(props, option) => {
                                                        return (
                                                            <>
                                                                <ListItem
                                                                    {...props}
                                                                    sx={{
                                                                        '&:hover': {
                                                                            backgroundColor: '#8397C31A',
                                                                            borderRadius: 2
                                                                        }
                                                                    }}
                                                                >
                                                                    <Grid container>
                                                                        <Grid item>
                                                                            <img src={option.icon} alt="icon" />
                                                                        </Grid>
                                                                        <Grid
                                                                            item
                                                                            sx={{
                                                                                width: {
                                                                                    md: '85%',
                                                                                    sm: '70%',
                                                                                    xs: '60%'
                                                                                }
                                                                            }}
                                                                        >
                                                                            <Typography
                                                                                sx={{
                                                                                    fontSize: { md: 16, sm: 14 },
                                                                                    fontWeight: '400',
                                                                                    ml: 1
                                                                                }}
                                                                            >
                                                                                {option.label}
                                                                            </Typography>
                                                                        </Grid>
                                                                    </Grid>
                                                                </ListItem>
                                                            </>
                                                        );
                                                    }}
                                                />
                                                <Grid
                                                    style={{
                                                        backgroundColor: inputFocused ? ' ' : '  rgba(255, 255, 255, 0.14)',
                                                        color: '#fff'
                                                    }}
                                                    sx={{
                                                        ...HeaderSecrchIcon
                                                    }}
                                                >
                                                    <SearchIcon style={{}} />
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </>
                            )}
                        </Grid>

                        <Grid
                            item
                            xl={3}
                            lg={3}
                            md={3.4}
                            sm={3.7}
                            xs={4}
                            sx={{
                                display: { sm: 'flex', xs: 'none' },
                                justifyContent: 'end'
                            }}
                        >
                            <Grid
                                item
                                sx={{
                                    justifyContent: 'end',
                                    marginRight: 0.5
                                }}
                            >
                                <Grid
                                    sx={{
                                        ...HeaderDropDown,
                                        border: Boolean(anchorE2) ? '0.5px solid #00EE34' : '0.5px solid #2F3654'
                                    }}
                                    onClick={(e) => {
                                        setAnchorE2(e.currentTarget);
                                    }}
                                >
                                    <img src={selectedCountryName.flg} alt="not" />
                                    <Typography
                                        sx={{
                                            px: 1,
                                            ...HeaderDropDownTxt
                                        }}
                                    >
                                        {isMediumScreen ? selectedCountryName.name.substring(0, 3) : selectedCountryName.name}
                                    </Typography>
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
                            <Grid
                                item
                                sx={{
                                    justifyContent: 'end'
                                }}
                            >
                                <Grid
                                    sx={{
                                        border: Boolean(anchorEl) ? '0.5px solid #00EE34' : '0.5px solid #2F3654',
                                        ...HeaderDropDown
                                    }}
                                    onClick={(e) => {
                                        setAnchorEl(e.currentTarget);
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            px: 0.5,
                                            ...HeaderDropDownTxt
                                        }}
                                    >
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
                </Container>
            </AppBar>
            {children}
        </Box>
    ) : (
        <Grid sx={{ mb: 1 }}>
            <Skeleton
                variant="rectangular"
                sx={{
                    ...skeltonColor,
                    height: { sm: '120px', xs: '73px' },
                    width: '100%'
                }}
            />
        </Grid>
    );
}

DrawerAppBar.propTypes = {
    children: PropTypes.node,
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func
};

export default DrawerAppBar;

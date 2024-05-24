import {
    Card,
    Container,
    Grid,
    Typography,
    FormControl,
    Checkbox,
    OutlinedInput,
    FormControlLabel,
    Button,
    Snackbar,
    Box
} from '@mui/material';
import { boxStyle } from '../../../../../ui-component/landing/constants/style';
import React, { useState } from 'react';
import PaymentMethod from '../../../../../ui-component/landing/Components/PaymentMethod';
import InstructionTabs from './InstructionTabs';
import SteamPaymentDetail from '../../../../../ui-component/landing/Components/SteamPaymentDetail';
import HomeDropDown from '../../../../../ui-component/landing/Components/HomeDropDown';
import { useSelector } from 'react-redux';
import Skelton from '../../../../../ui-component/landing/Components/Skelton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { containerSpace } from '../../../../../ui-component/landing/constants/style';
import { SteamNameCode, SteambuttonData } from '../../../../../ui-component/landing/Data/SteamPurchaseData';
import {
    steamLogintitle,
    steamFindLogin,
    steamFindLoginTxt,
    steamLoginInput,
    steamPriceInput,
    checkText,
    promoBtnCard,
    promoBtn,
    steamPriceBtn
} from '../../../../../ui-component/landing/constants/SteamSx';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const SteamDetail = () => {
    const [stock, setstock] = useState(true);
    const { skeltonStatus } = useSelector((state) => state.changeSkelton);
    const { selectCurrency } = useSelector((state) => state.mobileDropDown);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [select, setSelect] = useState(0);
    const [open, setOpen] = React.useState(false);
    const [countryCode, setCountryCode] = React.useState({
        name: 'knz',
        flag: ' '
    });
    const handleClick = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    return (
        <Container
            maxWidth="xl"
            sx={{
                mt: { sm: 3, xs: 1 },
                ...containerSpace
            }}
        >
            <Grid container spacing={1}>
                <Grid item lg={7.6} md={7.5} xs={12}>
                    {skeltonStatus ? (
                        <Card
                            sx={{
                                ...boxStyle
                            }}
                        >
                            <Typography sx={{ ...steamLogintitle }}>1. Enter your Steam login</Typography>
                            <Grid container spacing={2} sx={{ pt: { sm: 4, xs: 2 } }}>
                                <Grid
                                    item
                                    sm={6}
                                    xs={12}
                                    sx={{
                                        position: 'relative'
                                    }}
                                >
                                    <FormControl fullWidth>
                                        <OutlinedInput
                                            id="outlined-steam-login"
                                            type="text"
                                            placeholder="Steam login"
                                            name="Slogin"
                                            sx={{
                                                ...steamLoginInput,
                                                background: stock ? '#1C2138' : 'rgba(131, 151, 195, 0.2)',
                                                '& #outlined-steam-login': {
                                                    background: 'none !important',
                                                    color: '#727374 !important'
                                                }
                                            }}
                                            inputProps={{}}
                                        />
                                        <Grid
                                            className="login_button"
                                            onClick={handleClick}
                                            sx={{
                                                ...steamFindLogin
                                            }}
                                        >
                                            <Typography
                                                sx={{
                                                    ...steamFindLoginTxt
                                                }}
                                            >
                                                How to find out your login?
                                            </Typography>
                                        </Grid>
                                    </FormControl>
                                    <Snackbar
                                        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                                        open={open}
                                        autoHideDuration={5000}
                                        onClose={handleClose}
                                        message={
                                            <Box sx={{ display: 'flex' }}>
                                                <ErrorOutlineIcon sx={{ color: '#FF2063' }} />
                                                <Typography sx={{ pl: 1 }}>No login found with this name</Typography>
                                            </Box>
                                        }
                                    />
                                </Grid>
                                <Grid item sm={6} xs={12}>
                                    <FormControl fullWidth>
                                        <OutlinedInput
                                            id="outlined-curruncy-balance"
                                            type="text"
                                            placeholder="100"
                                            name="balance"
                                            value="1000 ₽"
                                            sx={{
                                                ...steamLoginInput,
                                                background: stock ? '#1C2138' : 'rgba(131, 151, 195, 0.2)',
                                                '& #outlined-curruncy-balance': {
                                                    background: 'none !important',
                                                    color: '#727374 !important'
                                                }
                                            }}
                                            inputProps={{}}
                                            endAdornment={
                                                <Grid
                                                    item
                                                    sx={{
                                                        justifyContent: 'end'
                                                    }}
                                                >
                                                    <Grid
                                                        sx={{
                                                            ...steamPriceInput,
                                                            border: Boolean(anchorEl) ? '0.5px solid #00EE34' : '0.5px solid #2F3654'
                                                        }}
                                                        onClick={(e) => {
                                                            setAnchorEl(e.currentTarget);
                                                        }}
                                                    >
                                                        <Typography
                                                            sx={{
                                                                px: 0.5,
                                                                fontSize: '16px',
                                                                fontWeight: 500,
                                                                lineHeight: '22px',
                                                                paddingTop: '7px',
                                                                paddingBottom: '4px'
                                                            }}
                                                        >
                                                            {selectCurrency.name}
                                                        </Typography>
                                                        <ExpandMoreIcon sx={{ ml: 5.2 }} />
                                                    </Grid>
                                                    <HomeDropDown
                                                        open={anchorEl}
                                                        close={() => {
                                                            setAnchorEl(null);
                                                        }}
                                                        arr={SteamNameCode}
                                                        setItemname={setCountryCode}
                                                        width={169}
                                                        title={''}
                                                        selected={countryCode.name}
                                                    />
                                                </Grid>
                                            }
                                        />
                                    </FormControl>
                                </Grid>
                            </Grid>

                            <Grid container spacing={1} sx={{ pt: 2 }}>
                                {SteambuttonData.map((data, index) => (
                                    <Grid key={index} item sm={2} xs={4}>
                                        <Button
                                            fullWidth
                                            onClick={() => setSelect(index)}
                                            style={{
                                                color: index === select ? '#D9D9D9' : '#848CA1',
                                                background: index === select ? 'rgba(0, 238, 52, 0.1)' : '',
                                                border: index === select ? '1px solid rgba(56, 253, 99, 0.3)' : '1px solid #5B6479',
                                                fontWeight: index === select ? 500 : 400
                                            }}
                                            sx={{
                                                ...steamPriceBtn
                                            }}
                                        >
                                            {data.title}
                                        </Button>
                                    </Grid>
                                ))}
                            </Grid>
                            <Grid item lg={5} sm={6} xs={12} sx={{ pt: 2 }}>
                                <Card
                                    sx={{
                                        ...promoBtnCard
                                    }}
                                >
                                    <Typography sx={{ alignSelf: 'center' }}>Promo code</Typography>
                                    <Button
                                        style={{}}
                                        sx={{
                                            ...promoBtn
                                        }}
                                    >
                                        Apply
                                    </Button>
                                </Card>
                            </Grid>

                            <FormControlLabel
                                sx={{ pt: 2 }}
                                control={
                                    <Checkbox
                                        defaultChecked
                                        sx={{
                                            color: '#00EE34',
                                            '&.Mui-checked': {
                                                color: stock ? '#00EE34' : 'rgba(131, 151, 195, 0.2)'
                                            }
                                        }}
                                        disabled={stock ? false : true}
                                    />
                                }
                                label={
                                    <Typography sx={{ ...checkText, color: stock ? '#BEBEBE' : '#5B6479' }}>
                                        I confirm that I specified a Steam login and not a nickname
                                    </Typography>
                                }
                            />
                        </Card>
                    ) : (
                        <Skelton
                            style={{
                                width: '100%',
                                height: { lg: '350px', md: '349px', sm: '350px', xs: '448px' }
                            }}
                        />
                    )}

                    <Grid sx={{ pt: { sm: 3, xs: 2 } }}>
                        <PaymentMethod title="2. Payment Method" stock={stock} screen="steam_purchase" />
                    </Grid>
                    <Grid sx={{ pt: { sm: 3, xs: 2 } }}>
                        {skeltonStatus ? (
                            <InstructionTabs />
                        ) : (
                            <Skelton
                                style={{
                                    width: '100%',
                                    height: {
                                        lg: '551px',
                                        md: '542px',
                                        sm: '539px',
                                        xs: '541px'
                                    }
                                }}
                            />
                        )}
                    </Grid>
                </Grid>
                <Grid item lg={0.5} md={0.2} xs={12} />
                <Grid item lg={3.9} md={4.3} xs={12} sx={{ display: { md: 'block', xs: 'none' } }}>
                    <SteamPaymentDetail title="Topping up your Steam account" />
                    <Grid sx={{ pt: 2 }}>
                        <Card sx={{ ...boxStyle, py: '370px !important', textAlign: 'center' }}>ADS Frame</Card>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
};

export default SteamDetail;

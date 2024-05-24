import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Typography, Grid, CardMedia, Fade } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import CheckIcon from '@mui/icons-material/Check';
import { changeMobileDropDownView, selectCountry, selectCurrencyData } from '../../../../store/slices/landing/showMobileDropDown';
import { CheckclorWrap, Checkclor, MobileWrap, MobileTitleSx, LeftIconColor } from '../../../../ui-component/landing/constants/homepageSx';

export default function MobileDropDown() {
    const dispatch = useDispatch();
    const { dropDownStatus, title, data, selectedCountryName, selectCurrency, dropDownType } = useSelector((state) => state.mobileDropDown);

    return (
        <Fade in={dropDownStatus} timeout={1000}>
            <Grid
                sx={{
                    ...MobileWrap,
                    display: dropDownStatus ? 'block' : 'none'
                }}
                py={3}
            >
                <Grid container alignItems={'center'} px={2}>
                    <Grid
                        item
                        xs={1.5}
                        onClick={() => {
                            dispatch(
                                changeMobileDropDownView({
                                    status: false,
                                    title: '',
                                    data: {}
                                })
                            );
                        }}
                        sx={{
                            display: 'flex',
                            alignItems: 'center'
                        }}
                    >
                        <ChevronLeftIcon
                            sx={{
                                ...LeftIconColor
                            }}
                        />
                    </Grid>
                    <Grid
                        item
                        xs={10.5}
                        sx={{
                            display: 'flex',
                            alignItems: 'center'
                        }}
                    >
                        <Typography sx={{ ...MobileTitleSx }}>{title}</Typography>
                    </Grid>
                </Grid>
                <Grid py={2} px={2}>
                    {data?.array?.map((item, index) => {
                        return (
                            <Grid
                                key={index}
                                container
                                justifyContent="space-between"
                                py={1.5}
                                my={0.8}
                                px={1}
                                onClick={() => {
                                    if (dropDownType === 'country') {
                                        dispatch(
                                            selectCountry({
                                                name: item.name,
                                                flg: item.flg
                                            })
                                        );
                                        dispatch(
                                            changeMobileDropDownView({
                                                status: false,
                                                title: '',
                                                data: {}
                                            })
                                        );
                                    } else if (dropDownType === 'currency') {
                                        dispatch(
                                            selectCurrencyData({
                                                name: item.name
                                            })
                                        );
                                        dispatch(
                                            changeMobileDropDownView({
                                                status: false,
                                                title: '',
                                                data: {}
                                            })
                                        );
                                    } else {
                                    }
                                }}
                                sx={{
                                    backgroundColor: '#1C2138',
                                    borderRadius: 4
                                }}
                            >
                                <Grid
                                    item
                                    xs={dropDownType === 'game_category' ? 12 : 9}
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center'
                                    }}
                                >
                                    {item.flg && item.flg !== '' && (
                                        <CardMedia
                                            component="img"
                                            image={item.flg}
                                            alt="not"
                                            sx={{ width: 30, height: 30, marginRight: 1.5 }}
                                        />
                                    )}
                                    <Grid
                                        item
                                        sx={{
                                            display: 'flex'
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                color: '#fff',
                                                textAlign: 'center'
                                            }}
                                        >
                                            {item.name}
                                        </Typography>
                                    </Grid>
                                </Grid>
                                {dropDownType !== 'game_category' && (
                                    <Grid
                                        item
                                        xs={3}
                                        sx={{
                                            ...CheckclorWrap
                                        }}
                                    >
                                        {selectedCountryName.name === item.name && (
                                            <CheckIcon
                                                sx={{
                                                    ...Checkclor
                                                }}
                                            />
                                        )}
                                        {selectCurrency.name === item.name && (
                                            <CheckIcon
                                                sx={{
                                                    ...Checkclor
                                                }}
                                            />
                                        )}
                                    </Grid>
                                )}
                            </Grid>
                        );
                    })}
                </Grid>
            </Grid>
        </Fade>
    );
}

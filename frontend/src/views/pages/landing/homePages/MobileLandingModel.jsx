import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Typography, Grid, CardMedia, Fade } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { changeMobileDropDownView } from '../../../../store/slices/landing/showMobileDropDown';
import { nameCurrency, nameCountry, headergamesArray } from '../../../../ui-component/landing/Data/LayoutData';
import { MobilelandinggamesArray } from '../../../../ui-component/landing/Data/HomePageData';
import { containerSpace } from '../../../../ui-component/landing/constants/style';
import {
    mobileLandWrap,
    mobileLandCurrWrap,
    mobileLandGameArrWrap,
    mobileLandGameArrImgWrap,
    mobileLandGameArrTxtWrap,
    mobileLandGameArrTxt,
    mobileLandGameArrImg,
    mobileLandText
} from '../../../../ui-component/landing/constants/homepageSx';

export default function MobileLanding() {
    const { status } = useSelector((state) => state.changeMobileScreen);
    const { selectedCountryName, selectCurrency } = useSelector((state) => state.mobileDropDown);
    const dispatch = useDispatch();

    return (
        <>
            <Container
                maxWidth="xl"
                sx={{
                    ...containerSpace,
                    display: status ? 'block' : 'none',
                    pt: 10
                }}
            >
                <Fade in={status} timeout={1000}>
                    <Grid py={1}>
                        <Grid container justifyContent={'space-between'}>
                            <Grid item xs={7.2}>
                                <Grid
                                    sx={{
                                        ...mobileLandWrap
                                    }}
                                    onClick={() => {
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
                                    }}
                                >
                                    <Grid
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center'
                                        }}
                                    >
                                        <img src={selectedCountryName.flg} alt="not" style={{ height: '24px', width: '24px' }} />
                                        <Typography
                                            variant="overline"
                                            sx={{
                                                ...mobileLandText
                                            }}
                                        >
                                            {selectedCountryName.name}
                                        </Typography>
                                    </Grid>
                                    <ExpandMoreIcon />
                                </Grid>
                            </Grid>
                            <Grid item xs={4.4}>
                                <Grid
                                    onClick={() => {
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
                                    }}
                                    sx={{
                                        ...mobileLandCurrWrap
                                    }}
                                >
                                    <Typography
                                        variant="overline"
                                        sx={{
                                            ...mobileLandText,
                                            lineHeight: '23px'
                                        }}
                                    >
                                        {selectCurrency.name}
                                    </Typography>
                                    <ExpandMoreIcon />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid my={2} container justifyContent={'space-between'}>
                            {MobilelandinggamesArray.map((item, index) => {
                                return (
                                    <Grid
                                        key={index}
                                        sx={{
                                            ...mobileLandGameArrWrap
                                        }}
                                        my={0.8}
                                        onClick={() => {
                                            dispatch(
                                                changeMobileDropDownView({
                                                    status: true,
                                                    title: item.title,
                                                    data: {
                                                        array: headergamesArray
                                                    },
                                                    dropDownType: 'game_category'
                                                })
                                            );
                                        }}
                                    >
                                        <Grid
                                            item
                                            sx={{
                                                ...mobileLandGameArrImgWrap
                                            }}
                                        >
                                            <Grid
                                                sx={{
                                                    ...mobileLandGameArrImg
                                                }}
                                            >
                                                {item.image !== '' && <CardMedia component="img" image={item.image} alt="game category" />}
                                            </Grid>
                                            <Grid
                                                sx={{
                                                    ...mobileLandGameArrTxtWrap
                                                }}
                                            >
                                                <Typography
                                                    sx={{
                                                        ...mobileLandGameArrTxt
                                                    }}
                                                >
                                                    {item.title}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                );
                            })}
                        </Grid>
                    </Grid>
                </Fade>
            </Container>
        </>
    );
}

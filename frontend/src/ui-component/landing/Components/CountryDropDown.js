import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import CheckIcon from '@mui/icons-material/Check';
import { CardMedia, Grid, Menu, MenuItem, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { selectCountry, selectCurrencyData } from '../../../store/slices/landing/showMobileDropDown';
const Wrapper = styled.div`
    overflow: auto;
    white-space: normal;
    width: 100%;
    height: ${(props) => (props.height ? '50vh' : '')};
    &::-webkit-scrollbar {
        -webkit-appearance: none;
        width: 6.26px;
        background: #00000038;
        border-radius: 4px;
    }
    &::-webkit-scrollbar-thumb {
        border-radius: 4px;
        background-color: rgba(131, 151, 195, 0.2);
        height: 150px;
    }
`;
const CountryDropDown = ({ open, close, arr, width, selectedCountry, setSelectedCountry }) => {
    const domRef = useRef(null);
   
    return (
        <Menu
            anchorEl={open}
            open={Boolean(open)}
            onClose={close}
            sx={{
                '& .MuiPaper-root': {
                    borderRadius: 3,
                    // marginTop: '7px',
                    minWidth: width,
                    px: 0.5,
                    // py: 0.5,
                    color: '#FFFF',
                    backgroundColor: '#2F3654',
                    overflow: 'unset',
                    '& .MuiMenu-list': {
                        padding: '4px 0'
                    },
                    '& .MuiMenuItem-root': {
                        '& .MuiSvgIcon-root': {
                            fontSize: 18,
                            color: 'black',
                            marginRight: '12px'
                        },
                        '&:active': {
                            backgroundColor: 'rgba(131, 151, 195, 0.2)'
                        }
                    }
                }
            }}
        >
            <Wrapper ref={domRef}>
                {arr.map((data, index) => (
                    <MenuItem key={index} onClick={() => { setSelectedCountry(data); close(); }} sx={{ py: 1.2, px: 2 }}>
                        <Grid
                            sx={{
                                display: 'flex',
                                width: '100%',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }}
                        >
                            <Grid
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                }}
                            >
                                {data.flg && (
                                    <CardMedia
                                        component="img"
                                        image={data.flg}
                                        alt="not"
                                        sx={{ width: 30, height: 30, marginRight: 1.5 }}
                                    />
                                )}
                                <Typography sx={{ font: 'Nunito,Sans' }}>{data.name}</Typography>
                            </Grid>
                            {(selectedCountry.name == data.name) && (
                                <CheckIcon
                                    sx={{
                                        color: '#00EE34 !important'
                                    }}
                                />
                            )}
                        </Grid>
                    </MenuItem>
                ))}
            </Wrapper>
        </Menu>
    );
};

export default CountryDropDown;

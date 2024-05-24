import React, { useState } from 'react';
import styled from 'styled-components';
import { Grid, Menu, Typography } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
const Wrapper = styled.div`
    overflow: auto;
    white-space: normal;
    width: 50%;
    height: 400;
`;
const HomePageGameMenu = ({ open, close, arr, title }) => {
    const [isHovered, setHovered] = useState(0);
    const scrollerSx = {
        overflowY: 'scroll',
        height: 400,
        '&::-webkit-scrollbar': {
            '-webkit-appearance': 'none',
            width: '6.26px',
            background: '#00000038',
            borderRadius: '4px'
        },
        '&::-webkit-scrollbar-thumb': {
            borderRadius: '4px',
            backgroundColor: 'rgba(131, 151, 195, 0.2)',
            height: '150px'
        }
    };
    function addDotsAfterCharacters(inputString, numCharacters) {
        if (inputString.length > numCharacters) {
            const dots = '...';
            return inputString.substring(0, numCharacters) + dots;
        }
        return inputString;
    }
    return (
        <Menu
            anchorEl={open}
            open={Boolean(open)}
            onClose={close}
            sx={{
                '& .MuiPaper-root': {
                    borderRadius: 3,
                    minWidth: arr[isHovered].methods.length > 0 ? '40%' : '20%',
                    marginTop: 3,
                    p: 2,
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
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center'
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'center'
            }}
        >
            <Grid
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between'
                }}
            >
                <Grid
                    sx={{
                        width: arr[isHovered].methods.length > 0 ? '60%' : '100%'
                    }}
                >
                    {title !== '' && (
                        <Typography
                            sx={{
                                fontSize: 18,
                                fontWeight: 800
                            }}
                        >
                            {title}
                        </Typography>
                    )}
                    {arr.map((data, index) => (
                        <Grid
                            key={index}
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between'
                            }}
                        >
                            <Grid
                                sx={{
                                    display: 'flex',
                                    width: '100%',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    p: 1.5,
                                    mr: 0.5,
                                    borderRadius: 4,
                                    backgroundColor: isHovered == index ? '#00EE34' : ''
                                }}
                                onMouseEnter={() => {
                                    setHovered(index);
                                }}
                                onMouseLeave={() => {
                                    setHovered(index);
                                }}
                            >
                                <Typography
                                    sx={{
                                        font: 'Nunito Sans',
                                        fontSize: 16,
                                        fontWeight: 500,
                                        color: isHovered == index ? '#000000' : '#ffffff'
                                    }}
                                >
                                    {addDotsAfterCharacters(data.name, 25)}
                                </Typography>
                                {data.methods.length > 0 && (
                                    <ArrowForwardIosIcon
                                        sx={{
                                            fontSize: 18,
                                            color: isHovered == index ? '#000000' : '#ffffff'
                                        }}
                                    />
                                )}
                            </Grid>
                        </Grid>
                    ))}
                </Grid>
                {arr[isHovered].methods.length > 0 && (
                    <Wrapper>
                        <Grid
                            sx={{
                                borderLeft: 1,
                                borderLeftColor: '#ffffff1A',
                                paddingLeft: 4,
                                ...scrollerSx
                            }}
                        >
                            {arr[isHovered].methods.map((item, index) => {
                                return (
                                    <Grid
                                        sx={{
                                            p: 1.5
                                        }}
                                        key={index}
                                    >
                                        <Typography sx={{ font: 'Nunito,Sans' }}>{item}</Typography>
                                    </Grid>
                                );
                            })}
                        </Grid>
                    </Wrapper>
                )}
            </Grid>
        </Menu>
    );
};

export default HomePageGameMenu;

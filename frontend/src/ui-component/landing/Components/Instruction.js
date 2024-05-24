import React from 'react';
import { boxStyle } from '../constants/style';
import { Card, Box, Grid, Typography, CardMedia } from '@mui/material';
import { useSelector } from 'react-redux';
import Skelton from './Skelton';
import { replacement } from '../Data/Data';
import {
    instructionTitle,
    instructionImg,
    instructionTxt,
    instructionNo,
    instructionSectionWrap,
    instructionImgWrap
} from '../constants/style';
const skelton = {
    width: '100%',
    height: { lg: '1741px', md: '1601px', sm: '1598px', xs: '1502px' }
};
const Instruction = () => {
    const { skeltonStatus } = useSelector((state) => state.changeSkelton);
    return skeltonStatus ? (
        <Card
            sx={{
                ...boxStyle
            }}
        >
            <Grid>
                <Typography
                    sx={{
                        ...instructionTitle
                    }}
                >
                    4. Instructions for activating Xbox
                </Typography>
            </Grid>
            <Grid sx={{ pt: { sm: 2, xs: 1 } }}>
                {replacement.map((data, index) => (
                    <>
                        <Grid sx={{ display: 'flex' }}>
                            <Grid>
                                <Typography
                                    sx={{
                                        ...instructionNo
                                    }}
                                >
                                    {data.id}
                                </Typography>
                            </Grid>
                            <Grid
                                sx={{
                                    ...instructionSectionWrap
                                }}
                            >
                                <Typography
                                    sx={{
                                        ...instructionTxt
                                    }}
                                >
                                    {data.title}
                                </Typography>
                                <Box sx={{ color: '#00EE34' }}>{data.link ? data.link : ' '}</Box>
                            </Grid>
                        </Grid>
                        <Grid
                            sx={{
                                borderLeft: index + 1 === replacement.length ? '' : '1px solid #5B647B',
                                ...instructionImgWrap
                            }}
                        >
                            <CardMedia
                                component="img"
                                image={data.image}
                                alt="not"
                                sx={{
                                    ...instructionImg
                                }}
                            />
                        </Grid>
                    </>
                ))}
            </Grid>
        </Card>
    ) : (
        <Skelton
            style={{
                ...skelton
            }}
        />
    );
};

export default Instruction;

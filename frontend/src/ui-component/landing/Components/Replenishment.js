import { Divider, Grid, Typography } from '@mui/material';
import React from 'react';
import { replenishmentTitle, replenishmentNo, replenishmentTxt, replenishmentDivider } from '../constants/style';
import { useSelector } from 'react-redux';
const Replenishment = ({ title }) => {
    const { productGameDetail } = useSelector((state) => state.productDetail);
    const dataArray = productGameDetail.activationDetails.split(/\r?\n/).filter((line) => line.trim() !== '');
    return (
        <>
            <Typography
                sx={{
                    ...replenishmentTitle
                }}
            >
                {title}
            </Typography>
            <Grid sx={{ pt: { sm: 2, xs: 1 } }}>
                {dataArray.map((data, index) => (
                    <Grid key={index} sx={{ display: 'flex' }}>
                        <Grid>
                            <Typography
                                sx={{
                                    ...replenishmentNo
                                }}
                            >
                                {index + 1}
                            </Typography>
                            {index + 1 === dataArray.length ? (
                                ''
                            ) : (
                                <Divider
                                    orientation="vertical"
                                    flexItem
                                    sx={{
                                        ...replenishmentDivider
                                    }}
                                />
                            )}
                        </Grid>
                        <Grid sx={{ display: { sm: 'flex', xs: 'block' }, pt: 1.2, pl: 1.5 }}>
                            <Typography
                                sx={{
                                    ...replenishmentTxt
                                }}
                            >
                                {data}
                            </Typography>
                        </Grid>
                    </Grid>
                ))}
            </Grid>
        </>
    );
};

export default Replenishment;

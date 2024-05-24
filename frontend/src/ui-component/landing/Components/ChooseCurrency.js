import { Button, Card, CardMedia, Grid, Typography } from '@mui/material';
import React, { useState } from 'react';
import { boxStyle } from '../constants/style';
import { useDispatch, useSelector } from 'react-redux';
import Skelton from './Skelton';
import { chooseCurrBtn, chooseCurrBtnImg, chooseCurrBtnCode, chooseCurrBtnPay, chooseCurrTxt, chooseCurrSubTxt } from '../constants/style';
import { AddProductGameDetail } from '../../../store/slices/landing/productDetail';
import { AddProductCustomPrice } from '../../../store/slices/landing/productDetail';

const ChooseCurrency = ({ mName, subtitle, bg }) => {
    const dispatch = useDispatch();
    const { productDetail } = useSelector((state) => state.productDetail);
    const { productGameDetail } = useSelector((state) => state.productDetail);
    const [select, setSelect] = useState(0);
    return productDetail && productGameDetail ? (
        !productDetail.singleProduct ? (
            <Grid sx={{ pt: { sm: 3, xs: 2 } }}>
                <Card
                    sx={{
                        ...boxStyle
                    }}
                >
                    <Grid sx={{ pl: 1 }}>
                        <Typography
                            sx={{
                                ...chooseCurrTxt
                            }}
                        >
                            {mName}
                        </Typography>
                        {subtitle ? (
                            <Typography
                                sx={{
                                    ...chooseCurrSubTxt
                                }}
                            >
                                {subtitle}
                            </Typography>
                        ) : (
                            ''
                        )}
                    </Grid>
                    <Grid container spacing={2} sx={{ pt: { sm: 1.5, xs: 1 } }}>
                        {productDetail.products.map((data, index) => (
                            <Grid
                                key={index}
                                item
                                sm={6}
                                xs={12}
                                onClick={() => {
                                    const twoDPrice = data.customPrice.toFixed(2);
                                    dispatch(AddProductGameDetail(data.product));
                                    dispatch(AddProductCustomPrice(twoDPrice));
                                    setSelect(index);
                                }}
                            >
                                <Button
                                    fullWidth
                                    style={{
                                        background: index === select ? 'rgba(0, 238, 52, 0.1)' : '',
                                        color: '#FFFF',
                                        border: index === select ? '1px solid rgba(0, 238, 52, 0.3)' : '1px solid #5B6479'
                                    }}
                                    sx={{
                                        ...chooseCurrBtn
                                    }}
                                >
                                    <Grid container>
                                        <Grid item xs={9} sx={{ display: 'flex', alignItems: 'center' }}>
                                            <CardMedia
                                                component="img"
                                                image={productDetail.thumnailImage}
                                                alt="not"
                                                sx={{
                                                    ...chooseCurrBtnImg
                                                }}
                                            />
                                            <Typography
                                                sx={{
                                                    ...chooseCurrBtnCode
                                                }}
                                            >
                                                {data.product.originalName ? data.product.originalName : data.product.name}
                                            </Typography>
                                        </Grid>
                                        <Grid
                                            item
                                            xs={3}
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'right'
                                            }}
                                        >
                                            <Typography
                                                sx={{
                                                    ...chooseCurrBtnPay
                                                }}
                                            >
                                                {data.customPrice.toFixed(2)} €
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Button>
                            </Grid>
                        ))}
                    </Grid>
                </Card>
            </Grid>
        ) : (
            ''
        )
    ) : (
        <Skelton
            style={{
                width: '100%',
                height: { lg: '396px', md: '399px', sm: '396px', xs: '411px' }
            }}
        />
    );
};

export default ChooseCurrency;

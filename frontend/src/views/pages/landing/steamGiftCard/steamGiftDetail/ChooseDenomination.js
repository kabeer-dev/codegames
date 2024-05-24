import { Button, Card, CardMedia, Grid, Typography } from '@mui/material';
import React, { useState } from 'react';
import { boxStyle } from '../../../../../ui-component/landing/constants/style';
import { useSelector } from 'react-redux';
import Skelton from '../../../../../ui-component/landing/Components/Skelton';
import { ChooseDemopayment } from '../../../../../ui-component/landing/Data/SteamPurchaseData';
import {
    chooseDenoTitle,
    chooseDenoBtnImg,
    chooseDenoBtnTxt,
    chooseDenoBtnPrice,
    chooseDenoBtn
} from '../../../../../ui-component/landing/constants/SteamSx';

const ChooseDenomination = () => {
    const { skeltonStatus } = useSelector((state) => state.changeSkelton);

    const [select, setSelect] = useState(0);

    return skeltonStatus ? (
        <Card
            sx={{
                ...boxStyle
            }}
        >
            <Grid>
                <Typography
                    sx={{
                        ...chooseDenoTitle
                    }}
                >
                    2. Choose a denomination
                </Typography>
            </Grid>
            <Grid container spacing={2}>
                {ChooseDemopayment.map((data, index) => (
                    <Grid key={index} item sm={6} xs={12} onClick={() => setSelect(index)}>
                        <Button
                            fullWidth
                            style={{
                                background: index === select ? 'rgba(0, 238, 52, 0.1)' : '',
                                color: '#FFFF',
                                border: index === select ? '1px solid rgba(0, 238, 52, 0.3)' : '1px solid #5B6479'
                            }}
                            sx={{
                                ...chooseDenoBtn
                            }}
                        >
                            <Grid sx={{ display: 'flex', alignItems: 'center' }}>
                                <CardMedia component="img" image={data.image} alt="not" sx={{ ...chooseDenoBtnImg }} />
                                <Typography
                                    sx={{
                                        ...chooseDenoBtnTxt
                                    }}
                                >
                                    {data.pay}
                                </Typography>
                            </Grid>
                            <Typography
                                sx={{
                                    ...chooseDenoBtnPrice
                                }}
                            >
                                1200.50 kzt
                            </Typography>
                        </Button>
                    </Grid>
                ))}
            </Grid>
        </Card>
    ) : (
        <Skelton
            style={{
                width: '100%',
                height: { lg: '252px', md: '278px', sm: '162px', xs: '146px' }
            }}
        />
    );
};

export default ChooseDenomination;

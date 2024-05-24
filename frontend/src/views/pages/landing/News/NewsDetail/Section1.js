import { Button, Card, CardMedia, Grid, Typography } from '@mui/material';
import React from 'react';
import img1 from '../../../../../assets/images/landing/NewsAndPermotion/img1.png';
import MainImage from '../../../../../assets/images/landing/NewsAndPermotion/Mainimage1.png';
import { boxStyle } from '../../../../../ui-component/landing/constants/style';
import { useSelector } from 'react-redux';
import Skelton from '../../../../../ui-component/landing/Components/Skelton';
import {
    newsSectiontext1,
    newsSectiontext2,
    newsSectiontext2btn,
    newsSectionFeatureTxt,
    newsSectionpad,
    newsSectionendCard,
    newsSectionCardImg,
    newsSectionmainImg,
    newsSectioncardBtn,
    newsSectioncardWrap,
    newsSectioncardTxt,
    newsSectioncardPrice,
    newsSectioncardDisPrice
} from '../../../../../ui-component/landing/constants/NewsSx';

const Section1 = () => {
    const { skeltonStatus } = useSelector((state) => state.changeSkelton);
    return skeltonStatus ? (
        <Card
            sx={{
                ...boxStyle,
                pl: { lg: 4, md: 2, sm: 6, xs: 2 },
                pr: { lg: 7, md: 3, sm: 10, xs: 2 },
                pt: { sm: 4, xs: 3 },
                pb: { sm: 4, xs: 3 }
            }}
        >
            <Typography sx={{ ...newsSectiontext1 }}>
                December is around the corner again. As usual, you probably just heard song Wham! "Last Christmas" and other staples that
                are against you already know your will by heart. All those chocolate Santa Clauses Christmas wreaths and other Christmas
                decorations probably too everywhere.
            </Typography>
            <Typography sx={{ ...newsSectiontext2 }}>
                You know what that means: the gits shopping craze! However do not be afraid. We are here to help you choose the best gifts
                that, as we know you are already looking. Select a few new products that will bring your gaming hardware to the limit, or a
                few old games that and remain amazing to this day. Looking for a last minute gift? No problem: instant delivery of digital
                products is guaranteed.
            </Typography>
            <Grid sx={{ pt: 4 }}>
                <Button fullWidth sx={{ ...newsSectiontext2btn }}>
                    Upgrade your gaming library with discounted video games
                </Button>
            </Grid>
            <Grid sx={{ pt: 3.4 }}>
                <CardMedia
                    component="img"
                    image={MainImage}
                    alt="not"
                    sx={{
                        ...newsSectionmainImg
                    }}
                />
            </Grid>
            <Typography sx={{ ...newsSectiontext2 }}>
                You know what that means: the gits shopping craze! However do not be afraid. We are here to help you choose the best gifts
                that, as we know you are already looking. Select a few new products that will bring your gaming hardware to the limit, or a
                few old games that and remain amazing to this day. Looking for a last minute gift? No problem: instant delivery of digital
                products is guaranteed.
            </Typography>
            <Typography sx={{ ...newsSectionFeatureTxt }}>Key features</Typography>
            <ul style={{ padding: '0px 18px' }}>
                <li style={{ ...newsSectionpad }}>Various gameplay updates that make the sequel even better more fun than the original</li>
                <li style={{ ...newsSectionpad, paddingTop: 17 }}>Star Wars Jedi: Revenant</li>
                <li style={{ ...newsSectionpad, paddingTop: 17 }}>More details</li>
                <li style={{ ...newsSectionpad, paddingTop: 17 }}>God of War</li>
            </ul>
            <Card sx={{ ...newsSectionendCard }}>
                <CardMedia
                    component="img"
                    image={img1}
                    alt="not"
                    sx={{
                        ...newsSectionCardImg
                    }}
                />
                <Grid
                    sx={{
                        ...newsSectioncardWrap
                    }}
                >
                    <Grid>
                        <Typography
                            sx={{
                                ...newsSectioncardTxt
                            }}
                        >
                            Star Wars Jedi: Survivor
                        </Typography>
                        <Typography
                            sx={{
                                ...newsSectioncardPrice
                            }}
                        >
                            10 990 KZT
                        </Typography>
                        <Typography
                            sx={{
                                ...newsSectioncardDisPrice
                            }}
                        >
                            25 990 KZT
                        </Typography>
                    </Grid>
                    <Button sx={{ ...newsSectioncardBtn }}>More details</Button>
                </Grid>
            </Card>
        </Card>
    ) : (
        <Skelton
            style={{
                width: '100%',
                height: { lg: '1477px', md: '1580px', sm: '1552px', xs: '1680px' }
            }}
        />
    );
};

export default Section1;

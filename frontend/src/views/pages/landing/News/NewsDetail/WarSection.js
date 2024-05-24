import { Button, Card, CardMedia, Grid, Typography } from '@mui/material';
import React from 'react';
import img1 from '../../../../../assets/images/landing/NewsAndPermotion/img1.png';
import MainImage from '../../../../../assets/images/landing/NewsAndPermotion/MainImage2.png';
import { boxStyle } from '../../../../../ui-component/landing/constants/style';
import { useSelector } from 'react-redux';
import Skelton from '../../../../../ui-component/landing/Components/Skelton';
import {
    warSectiontext1,
    warSectiontext2,
    warSectionfeatureTxt,
    warSectionpad,
    warSectionendCard,
    warSectionCardImg,
    warSectionMainImg,
    warSectioncardBtn,
    warSectioncardTxt1,
    warSectioncardTxt2,
    warSectioncardTxt3,
    warSectioncardTxt4,
    warSectioncardWrap,
    warSectionSinglecard
} from '../../../../../ui-component/landing/constants/NewsSx';

const WarSection = () => {
    const { skeltonStatus } = useSelector((state) => state.changeSkelton);
    return skeltonStatus ? (
        <Card
            sx={{
                ...boxStyle,
                pl: { lg: 4, md: 2, sm: 6, xs: 2 },
                pr: { lg: 7, md: 5, sm: 10, xs: 2 },
                pt: { sm: 4, xs: 3 },
                pb: { sm: 4, xs: 3 }
            }}
        >
            <Typography sx={{ ...warSectionfeatureTxt, pt: 0 }}>God of War</Typography>
            <Typography sx={{ ...warSectiontext2, pt: 2 }}>
                You know what that means: the gits shopping craze! However do not be afraid. We are here to help you choose the best gifts
                that, as we know you are already looking. Select a few new products that will bring your gaming hardware to the limit, or a
                few old games that and remain amazing to this day. Looking for a last minute gift? No problem: instant delivery of digital
                products is guaranteed.
            </Typography>
            <Grid sx={{ pt: 4 }}>
                <CardMedia
                    component="img"
                    image={MainImage}
                    alt="not"
                    sx={{
                        ...warSectionMainImg
                    }}
                />
            </Grid>
            <Typography
                sx={{
                    ...warSectioncardTxt4
                }}
            >
                Starfield lets you customize your character and then explore the galaxy, land on planets, moons, and space stations, build
                bases, recruit crew members, pilot your own spaceship, complete with space battles. There’s so much to do in there. So, if
                you feel like playing a science fiction RPG, Starfield is one of the best picks right now.
            </Typography>
            <Typography sx={{ ...warSectionfeatureTxt }}>Key features</Typography>
            <ul style={{ padding: '0px 18px' }}>
                <li style={{ ...warSectionpad }}>Various gameplay updates that make the sequel even better more fun than the original</li>
                <li style={{ ...warSectionpad, paddingTop: 17 }}>Star Wars Jedi: Revenant</li>
                <li style={{ ...warSectionpad, paddingTop: 17 }}>More details</li>
                <li style={{ ...warSectionpad, paddingTop: 17 }}>God of War</li>
            </ul>
            <Grid container sx={{ ...warSectionendCard }}>
                {[1, 2].map((data, index) => (
                    <Grid
                        key={index}
                        item
                        sm={6}
                        xs={12}
                        sx={{
                            ...warSectioncardWrap
                        }}
                    >
                        <CardMedia
                            component="img"
                            image={img1}
                            alt="not"
                            sx={{
                                ...warSectionCardImg
                            }}
                        />
                        <Grid
                            sx={{
                                ...warSectionSinglecard
                            }}
                        >
                            <Grid>
                                <Typography sx={{ ...warSectioncardTxt1 }}>Star Wars Jedi: Survivor</Typography>
                                <Typography sx={{ ...warSectioncardTxt2 }}>10 990 KZT</Typography>
                                <Typography sx={{ ...warSectioncardTxt3 }}>25 990 KZT</Typography>
                            </Grid>
                            <Button sx={{ ...warSectioncardBtn }}>More details</Button>
                        </Grid>
                    </Grid>
                ))}
            </Grid>
            <Typography sx={{ ...warSectiontext1, pt: 4 }}>
                Sounds like a reboot, doesn't it? God of War continues the story Kratos, but changes ancient Greece to no less ancient
                Scandinavia and its myths. It's time to kill some Norse gods.
            </Typography>
            <Typography sx={{ ...warSectiontext2 }}>
                However, the changes don't stop there. The developers are completely rethought the series and rebuilt the gameplay,
                introducing many new elements for the franchise. One of them is Kratos' son, Atreus, who helps you during the quest with his
                abilities. Blades with double chain? Forget about them, a mighty battle ax with magical powers is where He!
            </Typography>
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

export default WarSection;

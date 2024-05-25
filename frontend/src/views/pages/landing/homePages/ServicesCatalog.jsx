import React, { useEffect, useState } from 'react';
import NorthEastIcon from '@mui/icons-material/NorthEast';
import { Container, Grid, Typography, Box, Skeleton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import HotChip from '../../../../ui-component/landing/Components/HotChip';
import { containerSpace, skeltonColor } from '../../../../ui-component/landing/constants/style';
import { SreviceimgSx, ServicetextSx, ServiceHeadTxt, ServicedisplayImg } from '../../../../ui-component/landing/constants/homepageSx';
import Skelton from 'ui-component/landing/Components/Skelton';
const img2 = 'https://codegame-test.s3.eu-north-1.amazonaws.com/uploads/CatlogStream.svg';
const img4 = 'https://codegame-test.s3.eu-north-1.amazonaws.com/uploads/Catalog4.svg';
const img5 = 'https://codegame-test.s3.eu-north-1.amazonaws.com/uploads/Catalog5.svg';
const img6 = 'https://codegame-test.s3.eu-north-1.amazonaws.com/uploads/Catalog6.svg';
const img7 = 'https://codegame-test.s3.eu-north-1.amazonaws.com/uploads/Catalog7.svg';
const img8 = 'https://codegame-test.s3.eu-north-1.amazonaws.com/uploads/Catalog8.svg';
const img9 = 'https://codegame-test.s3.eu-north-1.amazonaws.com/uploads/Catalog7.svg';
const images = [img2, img4, img5, img6, img7, img8, img9];
const IconSx = {
    color: '#FFFF',
    fontSize: 19
};
const ServicesCatalog = () => {
    const navigate = useNavigate();
    const [isLoaded, setIsLoaded] = useState(Array(7).fill(false));
    useEffect(() => {
        images.map((image, index) => {
            const imageUrl = image;
            const img = new Image();
            img.src = imageUrl;
            img.addEventListener('load', () => {
                setIsLoaded((prev) => {
                    const updatedState = [...prev];
                    updatedState[index] = true;
                    return updatedState;
                });
            });
        });
    }, []);
    return (
        <Container
            maxWidth="xl"
            sx={{
                mt: { lg: 4.5, sm: 3, xs: 2 },
                ...containerSpace
            }}
        >
            {isLoaded.some((loaded) => loaded) ? (
                <Typography
                    sx={{
                        ...ServiceHeadTxt
                    }}
                >
                    Services catalog
                </Typography>
            ) : (
                <Skeleton width="50%" height={60} sx={{ ...skeltonColor, marginBottom: '20px' }} />
            )}
            <>
                <Grid container spacing={{ sm: 1.4, xs: 1 }} sx={{ display: { sm: 'flex', xs: 'none' } }}>
                    <Grid
                        item
                        xs={3.6}
                        sx={{
                            ...ServicedisplayImg
                        }}
                    >
                        {isLoaded[0] ? (
                            <Grid
                                onClick={() => navigate('/steam-gift-card-purchase')}
                                sx={{
                                    background: `url(${img2})`,
                                    height: { xl: '660px', lg: '660px', md: '482px', sm: '365px', xs: '105px' },
                                    ...SreviceimgSx
                                }}
                                className="serviceCat"
                            >
                                <Grid sx={{ display: 'flex' }}>
                                    <HotChip />
                                </Grid>
                                <Grid>
                                    <NorthEastIcon sx={{ color: '#FFFF' }} />
                                    <Typography
                                        sx={{
                                            width: { sm: '75%', xs: '96%' },
                                            ...ServicetextSx
                                        }}
                                    >
                                        Replenishment
                                        <Box
                                            sx={{
                                                fontWeight: {
                                                    sm: 700,
                                                    xs: 400
                                                },
                                                fontSize: { md: '48px', sm: '22px', xs: '9px' },
                                                lineHeight: { md: '43px', sm: '24px', xs: '14px' }
                                            }}
                                        >
                                            Steam
                                        </Box>
                                    </Typography>
                                </Grid>
                            </Grid>
                        ) : (
                            <Skelton
                                style={{
                                    height: { xl: '660px', lg: '660px', md: '482px', sm: '365px', xs: '105px' }
                                }}
                            />
                        )}
                    </Grid>
                    <Grid
                        item
                        xs={5.4}
                        sx={{
                            ...ServicedisplayImg
                        }}
                    >
                        {isLoaded[1] ? (
                            <Grid
                                sx={{
                                    border: '1px solid #39FD64',
                                    background: `url(${img4})`,
                                    height: { xl: '261px', lg: '261px', md: '196px', sm: '149px', xs: '105px' },
                                    ...SreviceimgSx
                                }}
                                className="serviceCat"
                            >
                                <Grid sx={{ display: 'flex' }}>
                                    <HotChip />
                                </Grid>
                                <Grid>
                                    <NorthEastIcon sx={{ color: '#FFFF' }} />
                                    <Typography
                                        sx={{
                                            width: { sm: '75%', xs: '96%' },
                                            ...ServicetextSx,
                                            fontWeight: { sm: 700, xs: 400 }
                                        }}
                                    >
                                        Mobile games
                                    </Typography>
                                </Grid>
                            </Grid>
                        ) : (
                            <Skelton
                                style={{
                                    height: { xl: '261px', lg: '261px', md: '196px', sm: '149px', xs: '105px' }
                                }}
                            />
                        )}
                        <Grid container spacing={{ sm: 2, xs: 1 }}>
                            <Grid item xs={6}>
                                {isLoaded[2] ? (
                                    <Grid
                                        sx={{
                                            background: `url(${img5})`,
                                            height: { xl: '383px', lg: '383px', md: '264px', sm: '205px', xs: '108px' },
                                            ...SreviceimgSx
                                        }}
                                        className="serviceCat"
                                    >
                                        <Grid sx={{ display: 'flex' }}>
                                            <HotChip />
                                        </Grid>
                                        <Grid>
                                            <NorthEastIcon sx={{ color: '#000000' }} />
                                            <Typography
                                                sx={{
                                                    width: { sm: '75%', xs: '96%' },
                                                    ...ServicetextSx,
                                                    color: '#000000'
                                                }}
                                            >
                                                Subscriptions
                                                <Box
                                                    sx={{
                                                        fontWeight: {
                                                            sm: 700,
                                                            xs: 400
                                                        },
                                                        fontSize: { md: '24px', sm: '18px', xs: '9px' },
                                                        lineHeight: { md: '24px', sm: '18px', xs: '14px' }
                                                    }}
                                                >
                                                    box, Playstation
                                                </Box>
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                ) : (
                                    <Skelton
                                        style={{
                                            height: { xl: '383px', lg: '383px', md: '264px', sm: '205px', xs: '108px' }
                                        }}
                                    />
                                )}
                            </Grid>
                            <Grid item xs={6}>
                                {isLoaded[3] ? (
                                    <Grid
                                        onClick={() => navigate('/pubg-purchase')}
                                        sx={{
                                            border: '1px solid #39FD64',
                                            background: `url(${img6})`,
                                            height: { xl: '383px', lg: '383px', md: '264px', sm: '205px', xs: '108px' },
                                            ...SreviceimgSx
                                        }}
                                        className="serviceCat"
                                    >
                                        <Grid sx={{ display: 'flex' }}>
                                            <HotChip />
                                        </Grid>
                                        <Grid>
                                            <NorthEastIcon sx={{ color: '#000000' }} />
                                            <Typography
                                                sx={{
                                                    width: { sm: '75%', xs: '96%' },
                                                    ...ServicetextSx,
                                                    color: '#000000',
                                                    fontWeight: { sm: 700, xs: 400 }
                                                }}
                                            >
                                                Game catalog
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                ) : (
                                    <Skelton
                                        style={{
                                            height: { xl: '383px', lg: '383px', md: '264px', sm: '205px', xs: '108px' }
                                        }}
                                    />
                                )}
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid
                        item
                        xs={3}
                        sx={{
                            ...ServicedisplayImg
                        }}
                    >
                        {isLoaded[4] ? (
                            <Grid
                                sx={{
                                    background: `url(${img7})`,
                                    height: { xl: '261px', lg: '261px', md: '195px', sm: '147px', xs: '105px' },
                                    ...SreviceimgSx
                                }}
                                className="serviceCat"
                            >
                                <Grid sx={{ display: 'flex' }}>
                                    <HotChip />
                                </Grid>
                                <Grid>
                                    <NorthEastIcon sx={{ color: '#000000' }} />
                                    <Typography
                                        sx={{
                                            width: { sm: '75%', xs: '96%' },
                                            ...ServicetextSx,
                                            color: '#000000',
                                            fontWeight: { sm: 700, xs: 400 }
                                        }}
                                    >
                                        Gift cards
                                    </Typography>
                                </Grid>
                            </Grid>
                        ) : (
                            <Skelton
                                style={{
                                    height: { xl: '261px', lg: '261px', md: '195px', sm: '147px', xs: '105px' }
                                }}
                            />
                        )}

                        {isLoaded[5] ? (
                            <Grid
                                onClick={() => navigate('/steam-gift-card-purchase')}
                                sx={{
                                    background: `url(${img8})`,
                                    height: { xl: '229px', lg: '229px', md: '171px', sm: '128px', xs: '108px' },
                                    ...SreviceimgSx
                                }}
                                className="serviceCat"
                            >
                                <Grid sx={{ display: 'flex' }}>
                                    <HotChip />
                                </Grid>
                                <Grid>
                                    <NorthEastIcon sx={{ color: '#FFFF' }} />
                                    <Typography
                                        sx={{
                                            width: { sm: '75%', xs: '96%' },
                                            ...ServicetextSx,
                                            fontWeight: { sm: 700, xs: 400 }
                                        }}
                                    >
                                        Game accounts
                                    </Typography>
                                </Grid>
                            </Grid>
                        ) : (
                            <Skelton
                                style={{
                                    height: { xl: '229px', lg: '229px', md: '171px', sm: '128px', xs: '108px' }
                                }}
                            />
                        )}
                        {isLoaded[6] ? (
                            <Grid
                                onClick={() => navigate('/steam-gift-card-purchase')}
                                sx={{
                                    border: '1px solid #39FD64',
                                    background: `url(${img9})`,
                                    height: { xl: '138px', lg: '138px', md: '104px', sm: '78px', xs: '108px' },
                                    ...SreviceimgSx,
                                    justifyContent: 'end',
                                    py: { md: 2.2, sm: 1, xs: 0.4 }
                                }}
                                className="serviceCat"
                            >
                                <Grid>
                                    <NorthEastIcon sx={{ color: '#FFFF' }} />
                                    <Typography
                                        sx={{
                                            width: { sm: '75%', xs: '96%' },
                                            ...ServicetextSx,
                                            fontWeight: { sm: 700, xs: 400 }
                                        }}
                                    >
                                        Support
                                    </Typography>
                                </Grid>
                            </Grid>
                        ) : (
                            <Skelton
                                style={{
                                    height: { xl: '138px', lg: '138px', md: '104px', sm: '78px', xs: '108px' }
                                }}
                            />
                        )}
                    </Grid>
                </Grid>
                <Grid sx={{ display: { sm: 'none', xs: 'block' } }}>
                    <Grid container spacing={1} sx={{ pb: 1 }}>
                        <Grid
                            item
                            xs={6.3}
                            sx={{
                                ...ServicedisplayImg
                            }}
                        >
                            {isLoaded[0] ? (
                                <Grid
                                    onClick={() => navigate('/xbox')}
                                    sx={{
                                        background: `url(${img2})`,
                                        height: '297px',
                                        ...SreviceimgSx
                                    }}
                                    className="serviceCat1"
                                >
                                    <Grid sx={{ display: 'flex' }}>
                                        <HotChip />
                                    </Grid>
                                    <Grid>
                                        <NorthEastIcon sx={{ ...IconSx }} />
                                        <Typography
                                            sx={{
                                                width: { sm: '75%', xs: '96%' },
                                                ...ServicetextSx
                                            }}
                                        >
                                            Replenishment
                                            <Box
                                                sx={{
                                                    fontWeight: {
                                                        sm: 700,
                                                        xs: 400
                                                    },
                                                    fontSize: { md: '48px', sm: '22px', xs: '24px' },
                                                    lineHeight: { md: '43px', sm: '24px', xs: '28px' }
                                                }}
                                            >
                                                Steam
                                            </Box>
                                        </Typography>
                                    </Grid>
                                </Grid>
                            ) : (
                                <Skelton
                                    style={{
                                        height: '297px'
                                    }}
                                    className="serviceCat1"
                                />
                            )}
                        </Grid>
                        <Grid
                            item
                            xs={5.7}
                            sx={{
                                ...ServicedisplayImg
                            }}
                        >
                            {isLoaded[1] ? (
                                <Grid
                                    sx={{
                                        border: '1px solid #39FD64',
                                        background: `url(${img4})`,
                                        height: '162px',
                                        ...SreviceimgSx
                                    }}
                                    className="serviceCat"
                                >
                                    <Grid sx={{ display: 'flex' }}>
                                        <HotChip />
                                    </Grid>
                                    <Grid>
                                        <NorthEastIcon sx={{ ...IconSx }} />
                                        <Typography
                                            sx={{
                                                width: { sm: '75%', xs: '96%' },
                                                ...ServicetextSx,
                                                fontWeight: { sm: 700, xs: 400 }
                                            }}
                                        >
                                            Mobile games
                                        </Typography>
                                    </Grid>
                                </Grid>
                            ) : (
                                <Skelton
                                    style={{
                                        height: '162px'
                                    }}
                                    className="serviceCat"
                                />
                            )}
                            {isLoaded[2] ? (
                                <Grid
                                    onClick={() => navigate('/steam-gift-card-purchase')}
                                    sx={{
                                        background: `url(${img5})`,
                                        height: '127px',
                                        ...SreviceimgSx
                                    }}
                                    className="serviceCat"
                                >
                                    <Grid sx={{ display: 'flex' }}>
                                        <HotChip />
                                    </Grid>
                                    <Grid>
                                        <NorthEastIcon sx={{ ...IconSx, color: '#000000' }} />
                                        <Typography
                                            sx={{
                                                width: { sm: '75%', xs: '96%' },
                                                ...ServicetextSx,
                                                color: '#000000'
                                            }}
                                        >
                                            Subscriptions
                                            <Box
                                                sx={{
                                                    fontWeight: {
                                                        sm: 700,
                                                        xs: 400
                                                    },
                                                    fontSize: { md: '24px', sm: '18px', xs: '10px' },
                                                    lineHeight: { md: '24px', sm: '18px', xs: '18px' }
                                                }}
                                            >
                                                box, Playstation
                                            </Box>
                                        </Typography>
                                    </Grid>
                                </Grid>
                            ) : (
                                <Skelton
                                    style={{
                                        height: '127px'
                                    }}
                                    className="serviceCat"
                                />
                            )}
                        </Grid>
                    </Grid>
                    <Grid container spacing={1}>
                        <Grid
                            item
                            xs={5.2}
                            sx={{
                                ...ServicedisplayImg
                            }}
                        >
                            {isLoaded[3] ? (
                                <Grid
                                    sx={{
                                        border: '1px solid #39FD64',
                                        background: `url(${img6})`,
                                        height: '108px',
                                        mb: 1,
                                        ...SreviceimgSx
                                    }}
                                    className="serviceCat2"
                                >
                                    <Grid sx={{ display: 'flex' }}>
                                        <HotChip />
                                    </Grid>
                                    <Grid>
                                        <NorthEastIcon sx={{ ...IconSx, color: '#000000' }} />
                                        <Typography
                                            sx={{
                                                width: { sm: '75%', xs: '96%' },
                                                ...ServicetextSx,
                                                color: '#000000',
                                                fontWeight: { sm: 700, xs: 400 }
                                            }}
                                        >
                                            Game catalog
                                        </Typography>
                                    </Grid>
                                </Grid>
                            ) : (
                                <Skelton
                                    style={{
                                        height: '108px',
                                        mb: 1
                                    }}
                                    className="serviceCat2"
                                />
                            )}
                            {isLoaded[6] ? (
                                <Grid
                                    onClick={() => navigate('/steam-gift-card-purchase')}
                                    sx={{
                                        border: '1px solid #39FD64',
                                        background: `url(${img9})`,
                                        height: '63px',
                                        ...SreviceimgSx,
                                        justifyContent: 'end',
                                        py: { md: 2.2, sm: 1, xs: 1 }
                                    }}
                                    className="serviceCat3"
                                >
                                    <Grid>
                                        <NorthEastIcon sx={{ ...IconSx }} />
                                        <Typography
                                            sx={{
                                                width: { sm: '75%', xs: '96%' },
                                                ...ServicetextSx,
                                                fontWeight: { sm: 700, xs: 400 }
                                            }}
                                        >
                                            Support
                                        </Typography>
                                    </Grid>
                                </Grid>
                            ) : (
                                <Skelton
                                    style={{
                                        height: '63px'
                                    }}
                                    className="serviceCat3"
                                />
                            )}
                        </Grid>
                        <Grid
                            item
                            xs={6.8}
                            sx={{
                                ...ServicedisplayImg
                            }}
                        >
                            {isLoaded[4] ? (
                                <Grid
                                    sx={{
                                        background: `url(${img7})`,
                                        height: '87px',
                                        ...SreviceimgSx
                                    }}
                                    className="serviceCat"
                                >
                                    {' '}
                                    <Grid sx={{ display: 'flex' }}>
                                        <HotChip />
                                    </Grid>
                                    <Grid>
                                        <NorthEastIcon sx={{ ...IconSx, color: '#000000' }} />
                                        <Typography
                                            sx={{
                                                width: { sm: '75%', xs: '96%' },
                                                ...ServicetextSx,
                                                color: '#000000',
                                                fontWeight: { sm: 700, xs: 400 }
                                            }}
                                        >
                                            Gift cards
                                        </Typography>
                                    </Grid>
                                </Grid>
                            ) : (
                                <Skelton
                                    style={{
                                        height: '87px'
                                    }}
                                    className="serviceCat"
                                />
                            )}
                            {isLoaded[5] ? (
                                <Grid
                                    onClick={() => navigate('/steam-gift-card-purchase')}
                                    sx={{
                                        background: `url(${img8})`,
                                        height: '84px',
                                        ...SreviceimgSx
                                    }}
                                    className="serviceCat"
                                >
                                    {' '}
                                    <Grid sx={{ display: 'flex' }}>
                                        <HotChip />
                                    </Grid>
                                    <Grid>
                                        <NorthEastIcon sx={{ ...IconSx }} />
                                        <Typography
                                            sx={{
                                                width: { sm: '75%', xs: '96%' },
                                                ...ServicetextSx,
                                                fontWeight: { sm: 700, xs: 400 }
                                            }}
                                        >
                                            Game accounts
                                        </Typography>
                                    </Grid>
                                </Grid>
                            ) : (
                                <Skelton
                                    style={{
                                        height: '84px'
                                    }}
                                    className="serviceCat"
                                />
                            )}
                        </Grid>
                    </Grid>
                </Grid>
                <Grid sx={{ display: { sm: 'none', xs: 'block' } }}>
                    <Grid container spacing={1} sx={{ pb: 1 }}>
                        <Grid
                            item
                            xs={6.3}
                            sx={{
                                ...ServicedisplayImg
                            }}
                        ></Grid>
                        <Grid
                            item
                            xs={5.7}
                            sx={{
                                ...ServicedisplayImg
                            }}
                        ></Grid>
                    </Grid>
                    <Grid container spacing={1} sx={{ mb: 1 }}>
                        <Grid
                            item
                            xs={5.2}
                            sx={{
                                ...ServicedisplayImg
                            }}
                        ></Grid>
                        <Grid
                            item
                            xs={6.8}
                            sx={{
                                ...ServicedisplayImg
                            }}
                        ></Grid>
                    </Grid>
                </Grid>
            </>
        </Container>
    );
};
export default ServicesCatalog;

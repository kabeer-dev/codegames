import React, { useEffect, useRef, useState } from 'react';
import { Grid, Typography, CardMedia, Card } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { showGameStatus } from '../../../../../store/slices/landing/showStatus';
import { useDispatch, useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow } from 'swiper/modules';
import Avatar from '../../../../../assets/images/landing/homePageStatus/Avatar.png';
import 'swiper/css';
import './style.css';
import { Colors } from '../../../../../ui-component/landing/constants/Color';
import LongPress from './LongPressHandler';

const generateInitialStatus = (statusesData, length) => {
    if (statusesData.length > 0) {
        const initialStatus = [];
        for (let i = 0; i < length; i++) {
            initialStatus.push({
                statusSlide: i,
                statusNo: 0,
                animation: Array(statusesData[i].imageSrc.length).fill(0),
                statusLoaded: Array(statusesData[i].imageSrc.length).fill(false)
            });
        }
        return initialStatus;
    }
};

const StatusScreen = () => {
    const { statuses } = useSelector((state) => state.showStatus);
    const [statusesData] = useState(
        statuses.map((status) => ({
            imageSrc: status.storyImages.map((image) => ({ media: image }))
        }))
    );
    const duration = 5;
    const initialLength = statusesData.length;
    const [currentStatusScreen, setCurrentStatusScreen] = useState(generateInitialStatus(statusesData, initialLength));
    const [activeIndex, setActiveIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [current, setCurrent] = useState(0);
    const swiperRef = useRef(null);
    const statusAutoPlayRef = useRef(0);
    const dispatch = useDispatch();
    useEffect(() => {
        const seen = {
            statusSlide: currentStatusScreen[activeIndex].statusSlide,
            statusNo: currentStatusScreen[activeIndex].statusNo
        };
        // Retrieve the existing array from localStorage
        const existingStatusSeen = JSON.parse(localStorage.getItem('stauts_seen')) || [];
        // Check if the seen object already exists in the array
        const isDuplicate = existingStatusSeen.some((item) => item.statusSlide === seen.statusSlide && item.statusNo === seen.statusNo);
        if (!isDuplicate) {
            // If not a duplicate, add the seen object to the array
            existingStatusSeen.push(seen);
            localStorage.setItem('stauts_seen', JSON.stringify(existingStatusSeen));
        }
    }, [currentStatusScreen, activeIndex]);

    useEffect(() => {
        if (statusesData.length > 0) {
            if (!isPaused && current < duration) {
                statusAutoPlayRef.current = setInterval(() => {
                    setCurrent((prevSeconds) => prevSeconds + 1);
                }, 1000);
            } else if (current === duration) {
                setCurrent(0);
                setCurrentStatusScreen((prevStatusScreen) => {
                    if (prevStatusScreen[activeIndex].statusNo === statusesData[activeIndex].imageSrc.length - 1) {
                        clearInterval(statusAutoPlayRef.current);
                        if (swiperRef.current.isEnd) {
                            dispatch(showGameStatus(false));
                        } else {
                            swiperRef.current.slideNext();
                        }
                        return prevStatusScreen;
                    } else {
                        const newArray = [...prevStatusScreen];
                        newArray[activeIndex].statusNo = newArray[activeIndex].statusNo + 1;
                        newArray[activeIndex].animation[newArray[activeIndex].statusNo] = newArray[activeIndex].statusNo;
                        return newArray;
                    }
                });
            }
        }
        return () => {
            clearInterval(statusAutoPlayRef.current);
        };
    }, [
        activeIndex,
        // currentStatusScreen[activeIndex].statusNo,
        current,
        isPaused,
        statusesData,
        dispatch
    ]);

    const moveToDesiredIndex = (index) => {
        if (swiperRef.current && swiperRef.current.slideTo) {
            swiperRef.current.slideTo(index);
        }
    };

    const handleSlideChange = (swiper) => {
        setActiveIndex(swiper.activeIndex);
    };

    const handleActiveCurrentStatus = (swiper, index) => {
        if (statusesData.length > 0) {
            let clickX;
            if (swiper.clientX) {
                clickX = swiper.clientX;
            } else {
                clickX = swiper.changedTouches[0].clientX;
            }
            const slideRect = swiper.currentTarget.getBoundingClientRect();
            const middlePoint = slideRect.left + slideRect.width / 2;

            if (clickX > middlePoint && currentStatusScreen[index].statusNo === statusesData[index].imageSrc.length - 1) {
                if (swiperRef.current.isEnd) {
                    dispatch(showGameStatus(false));
                } else {
                    swiperRef.current.slideNext();
                }
            } else if (clickX > middlePoint && currentStatusScreen[index].statusNo < statusesData[index].imageSrc.length) {
                setCurrentStatusScreen((prevArray) => {
                    const newArray = [...prevArray];
                    newArray[index].statusNo = newArray[index].statusNo + 1;
                    newArray[index].animation[newArray[index].statusNo] = newArray[index].statusNo;
                    return newArray;
                });
            } else if (clickX < middlePoint && currentStatusScreen[index].statusNo === 0) {
                swiperRef.current.slidePrev();
            } else {
                setCurrentStatusScreen((prevArray) => {
                    const newArray = [...prevArray];
                    newArray[index].animation[newArray[index].statusNo] = 0;
                    newArray[index].statusNo = newArray[index].statusNo - 1;
                    return newArray;
                });
            }
        }
    };

    const onLongPress = () => {
        // alert("asdadsds");
    };

    const onClick = (event, index) => {
        setCurrent(0);
        clearInterval(statusAutoPlayRef.current);
        if (activeIndex === index) {
            handleActiveCurrentStatus(event, activeIndex);
        } else {
            moveToDesiredIndex(index);
        }
    };


    const defaultOptions = {
        shouldPreventDefault: true,
        delay: 500
    };


    const longPressEvents = (index) => {
        return LongPress(onLongPress, onClick, defaultOptions, setIsPaused, isPaused, index);
    };

    

    return (
        <Grid
            style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                backgroundColor: '#101328',
                top: '0',
                left: '0',
                right: '0',
                bottom: '0',
                zIndex: 999999
                // display: gameStatus ? "block" : "none",
            }}
        >
            <Grid
                sx={{
                    m: 3,
                    display: { sm: 'flex', xs: 'none' },
                    justifyContent: 'end'
                }}
            >
                <Grid
                    sx={{
                        background: 'rgba(131, 151, 195, 0.2)',
                        p: 1,
                        borderRadius: 2,
                        color: '#FFFF',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center'
                    }}
                    onClick={() => {
                        dispatch(showGameStatus(false));
                    }}
                >
                    <Typography sx={{ fontSize: { lg: 18, xs: 16 }, pr: 1, fontFamily: '"Times New Roman", Times, serif' }}>
                        Close
                    </Typography>
                    <ClearIcon sx={{ fontSize: { lg: 21, xs: 20 } }} />
                </Grid>
            </Grid>
            <Swiper
                slidesPerView={3.5}
                effect={'coverflow'}
                spaceBetween={125}
                centeredSlides={true}
                className="mySwiper"
                modules={[EffectCoverflow]}
                onSlideChange={handleSlideChange}
                breakpoints={{
                    320: {
                        slidesPerView: 1,
                        spaceBetween: 20
                    },
                    425: {
                        slidesPerView: 1,
                        spaceBetween: 20
                    },
                    768: {
                        slidesPerView: 2.5,
                        spaceBetween: 50
                    },
                    1024: {
                        slidesPerView: 3,
                        spaceBetween: 80
                    },
                    1400: {
                        slidesPerView: 4,
                        spaceBetween: 70
                    },
                    2000: {
                        slidesPerView: 4.5,
                        spaceBetween: 120
                    }
                }}
                a11y
                navigation
                coverflowEffect={{
                    rotate: 0,
                    stretch: -60,
                    depth: 120,
                    modifier: 1,
                    slideShadows: false
                }}
                allowTouchMove={false}
                onSwiper={(swiper) => {
                    swiperRef.current = swiper;
                }}
            >
                {statusesData &&
                    statusesData.map((statusData, index) => {
                        return (
                            <SwiperSlide key={index}>
                                <Card
                                    sx={{
                                        position: 'relative',
                                        width: '100%',
                                        height: '100%',
                                        backgroundColor: '#000'
                                    }}
                                >
                                    <Grid
                                        sx={{
                                            position: 'absolute',
                                            zIndex: 1,
                                            left: 0,
                                            right: 0
                                        }}
                                    >
                                        <Grid container sx={{ px: 0.9, py: 0.8 }}>
                                            {activeIndex === index &&
                                                statusData.imageSrc.map((cur, i) => (
                                                    <Grid key={i} item xs={12 / statusData.imageSrc.length} sx={{ px: '3px !important' }}>
                                                        <Grid
                                                            sx={{
                                                                height: 2,

                                                                backgroundColor: '#ffffff33'
                                                            }}
                                                        >
                                                            <Grid
                                                                className={`progress_container   ${
                                                                    currentStatusScreen[index].statusNo === i
                                                                        ? 'animation_executing'
                                                                        : currentStatusScreen[index].animation.includes(i)
                                                                        ? 'animated'
                                                                        : 'wait_to_animate'
                                                                }  ${isPaused ? 'paused' : ''}`}
                                                                style={{
                                                                    height: '100%',
                                                                    width: '100%'
                                                                }}
                                                            ></Grid>
                                                        </Grid>
                                                    </Grid>
                                                ))}
                                        </Grid>
                                        <Grid container m={1} alignItems={'center'} justifyContent={'space-between'}>
                                            <Grid
                                                item
                                                sx={{
                                                    display: 'flex',
                                                    alignItems: 'center'
                                                }}
                                            >
                                                <CardMedia
                                                    item
                                                    component="img"
                                                    image={Avatar}
                                                    alt="Avatar"
                                                    sx={{
                                                        height: 50,
                                                        width: 50
                                                    }}
                                                />
                                                <Grid item mx={1}>
                                                    <Typography
                                                        sx={{
                                                            color: Colors.whiteColor,
                                                            fontSize: 14
                                                        }}
                                                    >
                                                        Title
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                            <Grid
                                                sx={{
                                                    mr: 1,
                                                    display: { sm: 'none', xs: 'flex' },
                                                    justifyContent: 'end'
                                                }}
                                            >
                                                <Grid
                                                    sx={{
                                                        padding: 1.5,
                                                        borderRadius: 2
                                                    }}
                                                    onClick={() => {
                                                        dispatch(showGameStatus(false));
                                                    }}
                                                >
                                                    <ClearIcon sx={{ color: '#FFFF' }} />
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <div
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            display: 'flex',
                                            alignItems: 'center'
                                        }}
                                        {...longPressEvents(index)}
                                    >
                                        <img
                                            src={statusData.imageSrc[currentStatusScreen[index].statusNo].media}
                                            alt="story"
                                            style={{
                                                width: '100%',
                                                height: 'auto'
                                            }}
                                        />
                                    </div>
                                </Card>
                            </SwiperSlide>
                        );
                    })}
            </Swiper>
        </Grid>
    );
};
export default StatusScreen;

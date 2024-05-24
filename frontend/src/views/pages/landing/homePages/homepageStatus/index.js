import { CardMedia, Container, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CrousalSlider from '../../../../../ui-component/landing/Components/Slider';
import { showGameStatus } from '../../../../../store/slices/landing/showStatus';
import { containerSpace, skeltonColor } from '../../../../../ui-component/landing/constants/style';
import Skeleton from '@mui/material/Skeleton';
// import ZoomInAnimation from '../Animation/ZoomInAnimation';
const statusImg = {
    objectFit: 'cover',
    height: { sm: '104px', xs: '64px' },
    width: { sm: '104px', xs: '64px' },
    borderRadius: { sm: 4, xs: 3 },
    p: { sm: 0.5, xs: 0.4 },
    cursor: 'pointer'
};
const HomeStatus = () => {
    const dispatch = useDispatch();
    const [statusCoverImage, setStatusCoverImage] = useState([]);
    const { statuses } = useSelector((state) => state.showStatus);
    useEffect(() => {
        const existingStatusSeen = JSON.parse(localStorage.getItem('stauts_seen')) || [];
        setStatusCoverImage(
            statuses?.map((story, index) => ({
                story,
                status: !story.storyImages.every((_, statusNo) => {
                    return existingStatusSeen.some((seenStatus) => {
                        return (
                            seenStatus.statusSlide === index && // Check if statusSlide matches index
                            seenStatus.statusNo === statusNo // Check if statusNo matches statusNo
                        );
                    });
                })
            }))
        );
    }, [statuses]);

    return (
        <Container
            maxWidth="xl"
            sx={{
                pt: statuses ? { md: 15.5, sm: 21.5, xs: 10.4 } : '20px',
                ...containerSpace
            }}
        >
            {statuses ? (
                /* <ZoomInAnimation> */
                <CrousalSlider
                    slideToshow={9.2}
                    bp={8.2}
                    firstbp={7.1}
                    secondbp={6.2}
                    thirdbp={4.5}
                    title="Popular services"
                    haveBtn={false}
                >
                    {statusCoverImage?.map((data, index) => (
                        <Grid key={index} sx={{ pr: { sm: 3.1, xs: 0.9 } }}>
                            <CardMedia
                                onClick={() => {
                                    dispatch(showGameStatus(true));
                                }}
                                component="img"
                                image={data.story.storyImages[0]}
                                alt="Story Thumbnail"
                                className="statusImg"
                                sx={{
                                    ...statusImg,
                                    border: data.status ? { sm: '2px solid #3CCA5B', xs: '2px solid #3CCA5B' } : ''
                                }}
                            />
                        </Grid>
                    ))}
                </CrousalSlider>
            ) : (
                /* </ZoomInAnimation> */
                <Grid sx={{ mb: 1 }}>
                    <Skeleton
                        variant="rectangular"
                        sx={{
                            ...skeltonColor,
                            height: { sm: '120px', xs: '73px' },
                            width: '100%'
                        }}
                    />
                </Grid>
            )}
        </Container>
    );
};

export default HomeStatus;

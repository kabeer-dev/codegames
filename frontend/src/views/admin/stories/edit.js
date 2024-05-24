import MainCard from 'ui-component/cards/MainCard';
import React, { useState } from 'react';
import { Button, Grid, FormControl, useTheme, CircularProgress, Typography, Box, Icon, Tooltip } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import myAxios from 'utils/myAxios';
import { useNavigate, useLocation } from 'react-router-dom';
import DeleteBtn from 'ui-component/adminCustomButton/DeleteBtn';
import CloseIcon from '@mui/icons-material/Close';
import AWS from '../../../aws-config';
import { CloseBtn } from 'ui-component/landing/constants/style';

const EditStory = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const location = useLocation();
    const { story } = location.state;

    const [storyFiles, setStoryFiles] = useState([]);
    const [formData, setFormData] = useState({ storyImages: story.storyImages });
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState([]);

    const handleStoryChange = (event) => {
        setErrors([]);
        const files = event.target.files;
        if (files) {
            const webpFiles = Array.from(files).filter((file) => file.type === 'image/webp');
            setStoryFiles(webpFiles);
        }
    };

    const handleDeleteImage = (indexToDelete) => {
        setLoading(true);
        const filterImages = formData.storyImages.filter((_, index) => index !== indexToDelete);
        setFormData({ storyImages: filterImages });
        setLoading(false);
    };

    const handleNewDeleteImage = (indexToDelete) => {
        setLoading(true);
        const filterImages = storyFiles.filter((_, index) => index !== indexToDelete);
        setStoryFiles(filterImages);
        setLoading(false);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        if (!storyFiles.length > 0) {
            if (formData.storyImages.length <= 0) {
                setErrors([{ storyImages: 'No Image Selected' }]);
                setLoading(false);
                return;
            }
            const data = {
                _id: story._id,
                storyImages: formData.storyImages
            };
            const response = await myAxios.post('/admin/update-story', data).catch((error) => {
                if (error.response) {
                    console.error('Error Response:', error.response);
                    setLoading(false);
                    if (error.response.status === 422) {
                        const newValidationErrors = error.response.data.validationErrors.map((validationError) => ({
                            [validationError.field]: validationError.message
                        }));

                        setErrors(newValidationErrors);
                        setLoading(false);
                    }
                } else {
                    console.error('Error:', error.message);
                    setLoading(false);
                }
            });
            if (response.status === 200) {
                setLoading(false);
                navigate('/admin/stories');
            }
        } else {
            if (storyFiles.length <= 0) {
                setErrors([{ storyImages: 'No Image Selected' }]);
                setLoading(false);
                return;
            }
            const s3 = new AWS.S3();
            const promises = storyFiles.map(async (file) => {
                const timestamp = Date.now(); // Get a unique timestamp
                const uniqueFileName = `${timestamp}_${file.name}`; // Append timestamp to the file name
                const params = {
                    Bucket: 'codegame-test',
                    Key: `uploads/${uniqueFileName}`,
                    Body: file
                };

                try {
                    const data = await s3.upload(params).promise();
                    return data.Location;
                } catch (err) {
                    console.error('Error uploading to S3', err);
                    setLoading(false);
                    throw err;
                }
            });
            try {
                const uploadResults = await Promise.all(promises);
                setFormData({ storyImages: uploadResults });
                const data = {
                    _id: story._id,
                    storyImages: uploadResults
                };
                const response = await myAxios.post('/admin/update-story', data).catch((error) => {
                    if (error.response) {
                        console.error('Error Response:', error.response);
                        setLoading(false);
                        if (error.response.status === 422) {
                            const newValidationErrors = error.response.data.validationErrors.map((validationError) => ({
                                [validationError.field]: validationError.message
                            }));

                            setErrors(newValidationErrors);
                            setLoading(false);
                        }
                    } else {
                        console.error('Error:', error.message);
                        setLoading(false);
                    }
                });
                if (response.status === 200) {
                    setLoading(false);
                    navigate('/admin/stories');
                }
            } catch (err) {
                console.error('Error uploading multiple files', err);
                throw err; // Handle error as needed
            }
        }
    };

    return (
        <MainCard title="Update Story">
            <Grid container>
                <Grid item xs={12}>
                    {!storyFiles.length > 0
                        ? formData.storyImages.length > 0 && (
                            <Grid container spacing={2}>
                                {formData.storyImages.map((file, index) => (
                                    <Grid item sm={3} xs={6} key={index}>
                                        <Box
                                            sx={{
                                                width: '100%',
                                                height: '150px',
                                                backgroundImage: `url(${file})`, // Set background image
                                                backgroundSize: 'cover',
                                                backgroundPosition: 'center'
                                            }}
                                        >
                                            <Tooltip title="Remove" placement="top">
                                                <Icon
                                                    onClick={() => {
                                                        handleDeleteImage(index);
                                                    }}
                                                    component={CloseIcon}
                                                    sx={{
                                                        ...CloseBtn,
                                                        color: theme.palette.error
                                                    }}
                                                />
                                            </Tooltip>
                                        </Box>
                                    </Grid>
                                ))}
                            </Grid>
                        )
                        : storyFiles.length > 0 && (
                            <Grid container spacing={2}>
                                {storyFiles.map((file, index) => (
                                    <Grid item sm={3} xs={6} key={index}>
                                        <Box
                                            sx={{
                                                width: '100%',
                                                height: '150px',
                                                backgroundImage: `url(${URL.createObjectURL(file)})`, // Set background image
                                                backgroundSize: 'cover',
                                                backgroundPosition: 'center'
                                            }}
                                        >
                                            <Icon
                                                onClick={() => {
                                                    handleNewDeleteImage(index);
                                                }}
                                                component={CloseIcon}
                                                sx={{
                                                    ...CloseBtn,
                                                    color: theme.palette.error
                                                }}
                                            />
                                        </Box>
                                    </Grid>
                                ))}
                            </Grid>
                        )}
                </Grid>
            </Grid>

            <Grid container>
                <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                    <Grid container sx={{ pt: 2, display: 'flex', justifyContent: 'space-between' }}>
                        <Grid item sm={6} xs={12}>
                            {!formData.storyImages.length > 0 && !storyFiles.length > 0 ? (
                                <FormControl fullWidth>
                                    <Grid sx={{ mb: '5px', display: 'flex', justifyContent: { sm: 'start', xs: 'center' } }}>
                                        <input
                                            type="file"
                                            accept="image/webp"
                                            disabled={loading}
                                            onChange={handleStoryChange}
                                            style={{ display: 'none' }}
                                            id="story-files"
                                            multiple
                                        />
                                        <label htmlFor="story-files">
                                            <Button
                                                variant="outlined"
                                                component="span"
                                                startIcon={<CloudUploadIcon />}
                                                disabled={loading}
                                                style={{
                                                    color: !loading ? theme.palette.success.main : 'gray',
                                                    border: '1px solid',
                                                    borderColor: !loading ? theme.palette.success.main : 'gray'
                                                }}
                                            >
                                                Upload Story Images (WebP only)
                                            </Button>
                                        </label>
                                    </Grid>
                                </FormControl>
                            ) : (
                                ''
                            )}

                            {errors && errors.map((err) => <Typography sx={{ color: 'red', mt: 0.5 }}>{err.storyImages}</Typography>)}
                        </Grid>
                        <Grid item sm={6} xs={12} sx={{ pt: { sm: 0, xs: 1 } }}>
                            <Grid container>
                                <Grid item xs={12} sx={{ display: 'flex', justifyContent: { sm: 'end', xs: 'center' } }}>
                                    <DeleteBtn />
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        disabled={loading}
                                        style={{ background: !loading ? theme.palette.success.main : 'lightgray' }}
                                        sx={{ width: '150px', p: { sm: '6px 16px', xs: '0px' } }}
                                    >
                                        {!loading ? 'Update Story' : <CircularProgress sx={{ color: 'white' }} size={24} />}
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </form>
            </Grid>
        </MainCard>
    );
};

export default EditStory;

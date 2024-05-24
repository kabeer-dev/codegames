import MainCard from 'ui-component/cards/MainCard';
import React, { useState, useEffect } from 'react';
import {
    Button,
    Grid,
    TextField,
    FormControl,
    CircularProgress,
    useTheme,
    Typography,
    Box,
    Icon,
    Tooltip,
    Autocomplete,
    Checkbox
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import myAxios from 'utils/myAxios';
import { useNavigate, useLocation } from 'react-router-dom';
import DeleteBtn from 'ui-component/adminCustomButton/DeleteBtn';
import CloseIcon from '@mui/icons-material/Close';
import { CloseBtn } from 'ui-component/landing/constants/style';
import AWS from '../../../aws-config';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

const EditBanner = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const location = useLocation();
    const banners = location.state;
    const banner = location.state;

    const editBanner = {
        _id: banner.banner._id,
        title: banner.banner.title,
        regions: banner.banner.regions,
        // sort: banner.banner.sort,
        bannerImage: banner.banner.bannerImage,
        smallScreenBannerImage: banner.banner.smallScreenBannerImage
    };

    const [bannerImage, setBannerImage] = useState('');
    const [smallScreenBannerImage, setSmallScreenBannerImage] = useState('');
    const [fullRegions, setFullRegions] = useState([]);
    const [selectedIds, setSelectedIds] = useState([]);
    const [formData, setFormData] = useState({
        title: editBanner.title,
        regions: editBanner.regions,
        sort: editBanner.sort,
        bannerImage: editBanner.bannerImage,
        smallScreenBannerImage: editBanner.smallScreenBannerImage
    });
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(false);

    // let indexArray = [];
    // let currentSort = editBanner.sort;
    // if (banners) {
    //     if (formData.region) {
    //         const filteredBannerLength = banners.banners.filter((banner) => banner.region._id === formData.region);
    //         indexArray = Array.from({ length: filteredBannerLength.length }, (_, i) => i + 1);
    //     } else {
    //         indexArray = [];
    //     }
    // } else {
    //     indexArray = [1];
    // }

    useEffect(() => {
        const getRegions = async () => {
            const response = await myAxios('/admin/get-regions');
            if (response.status === 200) {
                const sIds = formData.regions.map((item) => item._id);
                setSelectedIds(sIds);
                setFullRegions(response.data.data.regions);
            }
        };
        getRegions();
    }, []);

    useEffect(() => {
        const sIds = formData.regions.map((item) => item._id);
        setSelectedIds(sIds);
    }, [formData.regions]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        const indexToRemove = errors.findIndex((element) => e.target.name in element);
        if (indexToRemove !== -1) {
            errors.splice(indexToRemove, 1);
        }
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleAutocompleteChange = (e, value) => {
        const indexToRemove = errors.findIndex((element) => e.target.name in element);
        if (indexToRemove !== -1) {
            errors.splice(indexToRemove, 1);
        }
        const arr2Ids = new Set(formData.regions.map((item) => item._id));
        const duplicateIds = [];
        const idCountMap = {};
        value.forEach((item) => {
            const id = item._id;
            if (arr2Ids.has(id)) {
                if (idCountMap[id]) {
                    duplicateIds.push(id); // Found a duplicate _id that exists in arr2
                } else {
                    idCountMap[id] = true; // Mark the _id as encountered
                }
            }
        });
        if (duplicateIds.length > 0) {
            const filterIds = selectedIds.filter((item) => item._id === duplicateIds[0]);
            const filterformData = formData.regions.filter((item) => item._id !== duplicateIds[0]);
            setSelectedIds([...selectedIds, filterIds]);
            setFormData({
                ...formData,
                regions: filterformData
            });
        } else {
            setFormData({
                ...formData,
                regions: value
            });
        }
    };
    const handleBannerChange = (event) => {
        setErrors([]);
        const files = event.target.files;
        if (files) {
            const webpFiles = Array.from(files).filter(
                (file) => file.type === 'image/webp' || file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png'
            );
            setBannerImage(webpFiles[0]);
        }
    };

    const handleSmallScreenBannerChange = (event) => {
        setErrors([]);
        const files = event.target.files;
        if (files) {
            const webpFiles = Array.from(files).filter(
                (file) => file.type === 'image/webp' || file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png'
            );
            setSmallScreenBannerImage(webpFiles[0]);
        }
    };

    const handleDeleteImage = () => {
        setLoading(true);
        setFormData({
            ...formData,
            bannerImage: ''
        });
        setLoading(false);
    };
    const handleNewDeleteImage = () => {
        setLoading(true);
        setBannerImage('');
        setLoading(false);
    };

    const handleSmallScreenDeleteImage = () => {
        setLoading(true);
        setFormData({
            ...formData,
            smallScreenBannerImage: ''
        });
        setLoading(false);
    };
    const handleNewSmallScreenDeleteImage = () => {
        setLoading(true);
        setSmallScreenBannerImage('');
        setLoading(false);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        // let swapId = '';
        // let swapSort = '';
        // if (formData.sort != currentSort) {
        //     const changeableId = banners.banners.filter((item) => item.sort === formData.sort);
        //     swapId = changeableId[0]._id;
        //     swapSort = currentSort;
        // }
        if (!bannerImage && !smallScreenBannerImage) {
            // if (!formData.bannerImage) {
            //     setErrors([{ bannerImage: 'No Image Selected' }]);
            //     setLoading(false);
            //     return;
            // }
            const idArray = formData.regions.map((obj) => obj._id);
            const data = {
                _id: editBanner._id,
                title: formData.title,
                regions: idArray,
                // sort: formData.sort,
                bannerImage: formData.bannerImage,
                smallScreenBannerImage: formData.smallScreenBannerImage
                // swapId: swapId,
                // swapSort: swapSort
            };
            const response = await myAxios.post('/admin/update-banner', data).catch((error) => {
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
                navigate('/admin/banners');
                setLoading(false);
            }
        } else if (bannerImage && !smallScreenBannerImage) {
            if (!bannerImage) {
                setErrors([{ bannerImage: 'No Image Selected' }]);
                setLoading(false);
                return;
            }
            //s3
            const s3 = new AWS.S3();
            const params = {
                Bucket: 'codegame-test',
                Key: `uploads/${bannerImage.name}`,
                Body: bannerImage
            };
            s3.upload(params, async (err, imageData) => {
                if (err) {
                    setLoading(false);
                    console.error('Error uploading to S3', err);
                } else {
                    const idArray = formData.regions.map((obj) => obj._id);
                    const data = {
                        _id: editBanner._id,
                        title: formData.title,
                        regions: idArray,
                        // sort: formData.sort,
                        bannerImage: imageData.Location,
                        smallScreenBannerImage: formData.smallScreenBannerImage
                        // swapId: swapId,
                        // swapSort: swapSort
                    };
                    const response = await myAxios.post('/admin/update-banner', data).catch((error) => {
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
                        navigate('/admin/banners');
                        setLoading(false);
                    }
                }
            });
        } else if (!bannerImage && smallScreenBannerImage) {
            if (!smallScreenBannerImage) {
                setErrors([{ smallScreenBannerImage: 'No Image Selected' }]);
                setLoading(false);
                return;
            }
            //s3
            const s3 = new AWS.S3();
            const params = {
                Bucket: 'codegame-test',
                Key: `uploads/${smallScreenBannerImage.name}`,
                Body: smallScreenBannerImage
            };
            s3.upload(params, async (err, smallImageData) => {
                if (err) {
                    setLoading(false);
                    console.error('Error uploading to S3', err);
                } else {
                    const idArray = formData.regions.map((obj) => obj._id);
                    const data = {
                        _id: editBanner._id,
                        title: formData.title,
                        regions: idArray,
                        // sort: formData.sort,
                        bannerImage: formData.bannerImage,
                        smallScreenBannerImage: smallImageData.Location
                        // swapId: swapId,
                        // swapSort: swapSort
                    };
                    const response = await myAxios.post('/admin/update-banner', data).catch((error) => {
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
                        navigate('/admin/banners');
                        setLoading(false);
                    }
                }
            });
        } else {
            if (!bannerImage) {
                setErrors([{ bannerImage: 'No Image Selected' }]);
                setLoading(false);
                return;
            }
            if (!smallScreenBannerImage) {
                setErrors([{ smallScreenBannerImage: 'No Image Selected' }]);
                setLoading(false);
                return;
            }
            //s3
            const s3 = new AWS.S3();
            const params = {
                Bucket: 'codegame-test',
                Key: `uploads/${bannerImage.name}`,
                Body: bannerImage
            };
            s3.upload(params, async (err, imageData) => {
                if (err) {
                    setLoading(false);
                    console.error('Error uploading to S3', err);
                } else {
                    const params = {
                        Bucket: 'codegame-test',
                        Key: `uploads/${smallScreenBannerImage.name}`,
                        Body: smallScreenBannerImage
                    };
                    s3.upload(params, async (err, smallImageData) => {
                        if (err) {
                            setLoading(false);
                            console.error('Error uploading to S3', err);
                        } else {
                            const idArray = formData.regions.map((obj) => obj._id);
                            const data = {
                                _id: editBanner._id,
                                title: formData.title,
                                regions: idArray,
                                // sort: formData.sort,
                                bannerImage: imageData.Location,
                                smallScreenBannerImage: smallImageData.Location
                                // swapId: swapId,
                                // swapSort: swapSort
                            };
                            const response = await myAxios.post('/admin/update-banner', data).catch((error) => {
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
                                navigate('/admin/banners');
                                setLoading(false);
                            }
                        }
                    });
                }
            });
        }
    };

    const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
    const checkedIcon = <CheckBoxIcon fontSize="small" />;

    return (
        <MainCard title="Update Banner">
            <Grid container>
                <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                    <Grid container spacing={2}>
                        <Grid item sm={6} xs={12}>
                            <FormControl fullWidth>
                                <TextField
                                    id="outlined-basic"
                                    label="Title"
                                    value={formData.title}
                                    variant="outlined"
                                    name="title"
                                    onChange={handleChange}
                                />
                            </FormControl>
                            {errors && errors.map((err) => <Typography sx={{ color: 'red', mt: 0.5 }}>{err.title}</Typography>)}
                        </Grid>
                        <Grid item sm={6} xs={12}>
                            <FormControl fullWidth>
                                <Autocomplete
                                    multiple
                                    id="dropdown-list"
                                    options={fullRegions}
                                    disableCloseOnSelect
                                    getOptionLabel={(option) => option.name}
                                    renderOption={(props, option) => (
                                        <li {...props} key={option._id}>
                                            <Checkbox
                                                name="regions"
                                                icon={icon}
                                                checkedIcon={checkedIcon}
                                                style={{ marginRight: 8 }}
                                                checked={selectedIds.includes(option._id)}
                                            />
                                            {option.name}
                                        </li>
                                    )}
                                    renderInput={(params) => <TextField {...params} label="Select Regions" placeholder="Regions" />}
                                    onChange={handleAutocompleteChange}
                                    value={formData.regions}
                                />
                            </FormControl>
                            {errors && errors.map((err) => <Typography sx={{ color: 'red', mt: 0.5 }}>{err.regions}</Typography>)}
                        </Grid>
                        {/* <Grid item sm={4} xs={12}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label2">Sort</InputLabel>
                                <Select
                                    disabled={formData.region ? false : true}
                                    value={formData.sort}
                                    id="sort"
                                    label="Sort"
                                    name="sort"
                                    onChange={handleChange}
                                >
                                    {indexArray.map((index) => (
                                        <MenuItem value={index}>{index}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            {errors && errors.map((err) => <Typography sx={{ color: 'red', mt: 0.5 }}>{err.sort}</Typography>)}
                        </Grid> */}
                    </Grid>

                    <Grid container spacing={2} sx={{ mt: 1 }}>
                        <Grid item sm={6} xs={12}>
                            {formData.bannerImage || bannerImage ? (
                                <Box
                                    sx={{
                                        width: '100%',
                                        height: '200px',
                                        backgroundImage: `url(${formData.bannerImage ? formData.bannerImage : URL.createObjectURL(bannerImage)
                                            })`, // Set background image
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center'
                                    }}
                                >
                                    <Tooltip title="Remove" placement="top">
                                        <Icon
                                            onClick={() => {
                                                formData.bannerImage ? handleDeleteImage() : handleNewDeleteImage();
                                            }}
                                            component={CloseIcon}
                                            sx={{
                                                ...CloseBtn,
                                                color: theme.palette.error
                                            }}
                                        />
                                    </Tooltip>
                                </Box>
                            ) : (
                                ''
                            )}
                        </Grid>

                        <Grid item sm={6} xs={12}>
                            {formData.smallScreenBannerImage || smallScreenBannerImage ? (
                                <Box
                                    sx={{
                                        width: '100%',
                                        height: '200px',
                                        backgroundImage: `url(${formData.smallScreenBannerImage
                                                ? formData.smallScreenBannerImage
                                                : URL.createObjectURL(smallScreenBannerImage)
                                            })`, // Set background image
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center'
                                    }}
                                >
                                    <Tooltip title="Remove" placement="top">
                                        <Icon
                                            onClick={() => {
                                                formData.smallScreenBannerImage
                                                    ? handleSmallScreenDeleteImage()
                                                    : handleNewSmallScreenDeleteImage();
                                            }}
                                            component={CloseIcon}
                                            sx={{
                                                ...CloseBtn,
                                                color: theme.palette.error
                                            }}
                                        />
                                    </Tooltip>
                                </Box>
                            ) : (
                                ''
                            )}
                        </Grid>
                    </Grid>

                    <Grid container sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
                        <Grid item sm={6} xs={12}>
                            {!formData.bannerImage && !bannerImage ? (
                                <FormControl fullWidth>
                                    <Grid sx={{ mb: '5px', display: 'flex', justifyContent: { sm: 'start', xs: 'center' } }}>
                                        <input
                                            type="file"
                                            accept="image/jpeg, image/jpg, image/png, image/webp"
                                            onChange={handleBannerChange}
                                            disabled={loading}
                                            style={{ display: 'none' }}
                                            id="story-files"
                                        // multiple
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
                                                sx={{ fontSize: { sm: 16, xs: 13 } }}
                                            >
                                                Upload Banner Image
                                            </Button>
                                        </label>
                                    </Grid>
                                </FormControl>
                            ) : (
                                ''
                            )}

                            {errors && errors.map((err) => <Typography sx={{ color: 'red', mt: 0.5 }}>{err.bannerImage}</Typography>)}
                        </Grid>

                        <Grid item sm={6} xs={12} sx={{ pt: { sm: 0, xs: 1 } }}>
                            <Grid container>
                                <Grid item xs={6}>
                                    {!formData.smallScreenBannerImage && !smallScreenBannerImage ? (
                                        <FormControl fullWidth>
                                            <Grid sx={{ mb: '5px', display: 'flex', justifyContent: { sm: 'start', xs: 'center' } }}>
                                                <input
                                                    type="file"
                                                    accept="image/jpeg, image/jpg, image/png, image/webp"
                                                    onChange={handleSmallScreenBannerChange}
                                                    disabled={loading}
                                                    style={{ display: 'none' }}
                                                    id="small-screen"
                                                // multiple
                                                />
                                                <label htmlFor="small-screen">
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
                                                        sx={{ fontSize: { sm: 16, xs: 13 } }}
                                                    >
                                                        Upload Small Banner Image
                                                    </Button>
                                                </label>
                                            </Grid>
                                        </FormControl>
                                    ) : (
                                        ''
                                    )}
                                    {errors &&
                                        errors.map((err) => (
                                            <Typography sx={{ color: 'red', mt: 0.5 }}>{err.smallScreenBannerImage}</Typography>
                                        ))}
                                </Grid>
                                <Grid item xs={6} sx={{ display: 'flex', justifyContent: { sm: 'end', xs: 'center' } }}>
                                    <DeleteBtn />
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        disabled={loading ? true : false}
                                        sx={{
                                            backgroundColor: '#00ee34',
                                            ':hover': { backgroundColor: '#00ee34' },
                                            height: '36px'
                                        }}
                                    >
                                        {loading ? <CircularProgress sx={{ color: 'gray' }} size={24} /> : 'Update'}
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

export default EditBanner;

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
    Icon,
    Tooltip,
    Autocomplete,
    Checkbox
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import myAxios from 'utils/myAxios';
import { useNavigate } from 'react-router-dom';
import DeleteBtn from 'ui-component/adminCustomButton/DeleteBtn';
import CloseIcon from '@mui/icons-material/Close';
import AWS from '../../../aws-config';
import { CloseBtn } from 'ui-component/landing/constants/style';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

const AddBanner = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    // const banners = location.state;
    const [bannerImage, setBannerImage] = useState('');
    const [smallScreenBannerImage, setSmallScreenBannerImage] = useState('');
    const [getRegions, setGetRegions] = useState([]);
    const [formData, setFormData] = useState({ title: '', regions: [], bannerImage: '' });
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(false);

    const [bannerImageDimensions, setBannerImageDimensions] = useState({});
    const [bannerSmallImageDimensions, setBannerSmallImageDimensions] = useState({});

    // let indexArray = [];
    // let bannerSorts = [];
    // if (banners) {
    //     if (formData.region) {
    //         const filteredBannerLength = banners.banners.filter((banner) => banner.region._id === formData.region);
    //         indexArray = Array.from({ length: filteredBannerLength.length + 1 }, (_, i) => i + 1);
    //         bannerSorts = filteredBannerLength.map((item) => item.sort);
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
                // const idArray = response.data.data.regions.map(obj => obj._id);
                setGetRegions(response.data.data.regions);
            }
        };
        getRegions();
    }, []);

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
        setFormData({
            ...formData,
            regions: value
        });
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
        setBannerImage('');
        setLoading(false);
    };
    const handleSmallScreenDeleteImage = () => {
        setLoading(true);
        setSmallScreenBannerImage('');
        setLoading(false);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        // const indexInArray = bannerSorts.indexOf(formData.sort);
        // let swapId = '';
        // let swapSort = '';
        // if (indexInArray !== -1) {
        //     const changeableId = banners.banners.filter((item) => item.sort === formData.sort);
        //     swapId = changeableId[0]._id;
        //     swapSort = indexArray.length;
        // }
        if (bannerImageDimensions.height < 390 || bannerImageDimensions.width < 1010) {
            setErrors([{ bannerImage: 'Image Dimensions are wrong!' }]);
            setLoading(false);
            return;
        }
        if (bannerSmallImageDimensions.height <= 184 || bannerSmallImageDimensions.width <= 343) {
            setErrors([{ smallScreenBannerImage: 'Image Dimensions are wrong!' }]);
            setLoading(false);
            return;
        }
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
        s3.upload(params, async (err, bannerImageData) => {
            if (err) {
                setLoading(false);
                console.error('Error uploading to S3', err);
            } else {
                const params = {
                    Bucket: 'codegame-test',
                    Key: `uploads/${smallScreenBannerImage.name}`,
                    Body: smallScreenBannerImage
                };
                s3.upload(params, async (err, smallBannerImageData) => {
                    if (err) {
                        setLoading(false);
                        console.error('Error uploading to S3', err);
                    } else {
                        const idArray = formData.regions.map((obj) => obj._id);
                        const data = {
                            title: formData.title,
                            regions: idArray,
                            sort: formData.sort,
                            bannerImage: bannerImageData.Location,
                            smallScreenBannerImage: smallBannerImageData.Location
                            // swapId: swapId,
                            // swapSort: swapSort
                        };

                        const response = await myAxios.post('/admin/add-banner', data).catch((error) => {
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
    };

    const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
    const checkedIcon = <CheckBoxIcon fontSize="small" />;

    return (
        <MainCard title="Add Banner">
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
                            {/* <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label1">Select Region</InputLabel>
                                <Select id="region" label="Select Region" name="region" value={formData.region} onChange={handleChange}>
                                    {getRegions.map((region) => (
                                        <MenuItem value={region._id}>{region.name}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl> */}
                            <FormControl fullWidth>
                                <Autocomplete
                                    multiple
                                    id="dropdown-list"
                                    options={getRegions}
                                    disableCloseOnSelect
                                    getOptionLabel={(option) => option.name}
                                    renderOption={(props, option, { selected }) => (
                                        <li {...props} key={option._id}>
                                            <Checkbox
                                                name="regions"
                                                icon={icon}
                                                checkedIcon={checkedIcon}
                                                style={{ marginRight: 8 }}
                                                checked={selected}
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
                        {/* <Grid item sm={2} xs={12}>
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
                        <Grid
                            item
                            sm={6}
                            xs={12}
                            sx={{
                                position: 'relative'
                            }}
                        >
                            {bannerImage && (
                                <>
                                    <img
                                        onLoad={(e) => {
                                            setBannerImageDimensions({
                                                height: e.target.naturalHeight,
                                                width: e.target.naturalWidth
                                            });
                                        }}
                                        src={URL.createObjectURL(bannerImage)}
                                        alt="sadasd"
                                        height="200px"
                                        width="100%"
                                    />
                                    <Tooltip title="Remove" placement="top">
                                        <Icon
                                            onClick={() => {
                                                handleDeleteImage();
                                            }}
                                            component={CloseIcon}
                                            sx={{
                                                ...CloseBtn,
                                                color: theme.palette.error,
                                                position: 'absolute',
                                                right: 10
                                            }}
                                        />
                                    </Tooltip>
                                </>
                            )}
                        </Grid>
                        <Grid
                            item
                            sm={6}
                            xs={12}
                            sx={{
                                position: 'relative'
                            }}
                        >
                            {smallScreenBannerImage && (
                                <>
                                    <img
                                        onLoad={(e) => {
                                            setBannerSmallImageDimensions({
                                                height: e.target.naturalHeight,
                                                width: e.target.naturalWidth
                                            });
                                        }}
                                        src={URL.createObjectURL(smallScreenBannerImage)}
                                        alt="dfsdfsdf"
                                        height="200px"
                                        width="100%"
                                    />
                                    <Tooltip title="Remove" placement="top">
                                        <Icon
                                            onClick={() => {
                                                handleSmallScreenDeleteImage();
                                            }}
                                            component={CloseIcon}
                                            sx={{
                                                ...CloseBtn,
                                                color: theme.palette.error,
                                                position: 'absolute',
                                                right: 10
                                            }}
                                        />
                                    </Tooltip>
                                </>
                            )}
                        </Grid>
                    </Grid>

                    <Grid container sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
                        <Grid item sm={6} xs={12}>
                            {!bannerImage ? (
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
                                    {!smallScreenBannerImage ? (
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
                                        sx={{ backgroundColor: '#00ee34', ':hover': { backgroundColor: '#00ee34' }, height: '36px' }}
                                    >
                                        {loading ? <CircularProgress sx={{ color: 'gray' }} size={24} /> : 'Submit'}
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

export default AddBanner;

/* <Box
                                    sx={{
                                        width: '100%',
                                        height: '200px',
                                        backgroundImage: `url(${URL.createObjectURL(bannerImage)})`, // Set background image
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center'
                                    }}
                                    ref={imageRef}
                                >
                                    <Tooltip title="Remove" placement="top">
                                        <Icon
                                            onClick={() => {
                                                handleDeleteImage();
                                            }}
                                            component={CloseIcon}
                                            sx={{
                                                ...CloseBtn,
                                                color: theme.palette.error
                                            }}
                                        />
                                    </Tooltip>
                                </Box> */

{
    /* <Box
                                    sx={{
                                        width: '100%',
                                        height: '200px',
                                        backgroundImage: `url(${URL.createObjectURL(smallScreenBannerImage)})`, // Set background image
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center'
                                    }}
                                >
                                    <Tooltip title="Remove" placement="top">
                                        <Icon
                                            onClick={() => {
                                                handleSmallScreenDeleteImage();
                                            }}
                                            component={CloseIcon}
                                            sx={{
                                                ...CloseBtn,
                                                color: theme.palette.error
                                            }}
                                        />
                                    </Tooltip>
                                </Box> */
}

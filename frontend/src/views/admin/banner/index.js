import * as React from 'react';
import { useState, useEffect } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    CircularProgress,
    Grid,
    Typography,
    useTheme,
    IconButton,
    Tooltip,
    Chip
} from '@mui/material';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import MainCard from 'ui-component/cards/MainCard';
import myAxios from 'utils/myAxios';
import ModeIcon from '@mui/icons-material/Mode';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteModal from 'ui-component/landing/Components/deleteModal';

const columns = [
    { id: '#', label: '#', minWidth: 100 },
    { id: 'bannerImage', label: 'Banner Image', minWidth: 100 },
    { id: 'smallScreenBannerImage', label: 'Small Screen Banner Image', minWidth: 100 },
    { id: 'regions', label: 'Regions', minWidth: 100 },
    { id: 'action', label: 'Action', minWidth: 100 }
];

export default function Banners() {
    const theme = useTheme();
    const navigate = useNavigate();

    const [banners, setBanners] = useState('');
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [modalLoading, setModalLoading] = useState(false);
    const [currentIndex, setCurrentIndex] = useState('');
    const [currentId, setCurrentId] = useState('');

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event?.target?.value);
        setPage(0);
    };

    useEffect(() => {
        myAxios
            .get('/admin/get-banners')
            .then((response) => {
                setBanners(response.data.data.getBanners);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching Banner:', error);
            });
    }, []);

    const handleDelete = async (banner_id, index) => {
        const response = await myAxios.post('/admin/delete-banner', { banner_id: banner_id });
        const filterArray = banners;
        filterArray.splice(index, 1);
        setBanners([...filterArray]);
        setModalLoading(false);
        setOpen(false);
    };

    return (
        <MainCard
            content={false}
            title="Banners"
            secondary={
                <Button
                    variant="outlined"
                    onClick={() => navigate('/admin/add-banner', { state: { banners: banners } })}
                    style={{
                        color: theme.palette.success.main,
                        border: '1px solid',
                        borderColor: !loading ? theme.palette.success.main : 'gray',
                        width: '110px'
                    }}
                >
                    {!loading ? 'Add Banner' : <CircularProgress sx={{ color: 'gray' }} size={24} />}
                </Button>
            }
        >
            {banners ? (
                banners.length > 0 ? (
                    <Grid>
                        {/* table */}
                        <TableContainer>
                            <Table stickyHeader aria-label="sticky table">
                                <TableHead>
                                    <TableRow>
                                        {columns.map((column) => (
                                            <TableCell
                                                key={column.id}
                                                sx={{ py: 3, textAlign: 'center', fontWeight: 'bold !important' }}
                                                align={column.align}
                                                style={{ minWidth: column.minWidth }}
                                            >
                                                {column.label}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {banners.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                                        <TableRow key={row._id} sx={{ py: 3 }} hover role="checkbox" tabIndex={-1}>
                                            <TableCell sx={{ textAlign: 'center' }}>{index + 1}</TableCell>
                                            <TableCell sx={{ textAlign: 'center' }}>
                                                <img
                                                    src={row.bannerImage}
                                                    style={{ width: '100px', height: '50px', borderRadius: 8 }}
                                                />
                                            </TableCell>
                                            <TableCell sx={{ textAlign: 'center' }}>
                                                <img
                                                    src={row.smallScreenBannerImage}
                                                    style={{ width: '100px', height: '50px', borderRadius: 8 }}
                                                />
                                            </TableCell>
                                            <TableCell sx={{ textAlign: 'center' }}>
                                                {row.regions.map((region, index) => (
                                                    <Chip
                                                        key={index}
                                                        label={region.name}
                                                        sx={{
                                                            background: theme.palette.success.light,
                                                            color: theme.palette.success.dark,
                                                            fontWeight: 'bold',
                                                            ml: 0.5
                                                        }}
                                                    />
                                                ))}

                                            </TableCell>
                                            <TableCell sx={{ textAlign: 'center' }}>
                                                <Tooltip title="Edit" placement="top">
                                                    <IconButton
                                                        onClick={() =>
                                                            navigate('/admin/edit-banner', { state: { banner: row, banners: banners } })
                                                        }
                                                    >
                                                        <ModeIcon sx={{ color: theme.palette.success.main }} />
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip title="Delete" placement="top">
                                                    <IconButton
                                                        sx={{ ml: 1 }}
                                                        onClick={() => {
                                                            setCurrentIndex(index);
                                                            setCurrentId(row._id);
                                                            setOpen(true);
                                                        }}
                                                    >
                                                        <DeleteIcon color="error" />
                                                    </IconButton>
                                                </Tooltip>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                            <DeleteModal
                                open={open}
                                handleOpen={handleOpen}
                                handleClose={handleClose}
                                moduleName={'Banner'}
                                handleDelete={handleDelete}
                                index={currentIndex}
                                id={currentId}
                                modalLoading={modalLoading}
                                setModalLoading={setModalLoading}
                            />
                            <TablePagination
                                rowsPerPageOptions={[10, 25, 100]}
                                component="div"
                                count={banners.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </TableContainer>
                    </Grid>
                ) : (
                    <Grid sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '300px' }}>
                        <Typography sx={{ fontSize: 15 }}>No Record Founded</Typography>
                    </Grid>
                )
            ) : (
                <Grid sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '300px' }}>
                    <CircularProgress sx={{ color: '#00ee34' }} />
                </Grid>
            )}
        </MainCard>
    );
}

import * as React from 'react';
import { useState, useEffect } from 'react';
import { TablePagination, Table, TableBody, TableCell, TableContainer, TableHead, CircularProgress, TableRow, useTheme, Grid, Typography, IconButton, Tooltip } from '@mui/material';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import MainCard from 'ui-component/cards/MainCard';
import myAxios from 'utils/myAxios';
import moment from 'moment';
import Chip from '@mui/material/Chip';
import ModeIcon from '@mui/icons-material/Mode';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteModal from 'ui-component/landing/Components/deleteModal';

const columns = [
    { id: 'title', label: 'Title', minWidth: 100 },
    { id: 'keyFeatures', label: 'Key Features', minWidth: 100 },
    { id: 'createdAt', label: 'Created At', minWidth: 100 },
    { id: 'coverImage', label: 'Image', minWidth: 100 },
    { id: 'action', label: 'Action', minWidth: 100 }
];

export default function NewsAndPromotions() {
    const theme = useTheme();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [modalLoading, setModalLoading] = useState(false);
    const [news, setNews] = useState([]);
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

    const formatTimestamp = (timestamp) => {
        return moment(timestamp).fromNow();
    };

    useEffect(() => {
        myAxios
            .get('/admin/get-news')
            .then((response) => {
                setNews(response.data);
                setLoading(false)
            })
            .catch((error) => {
                console.error('Error fetching News:', error);
            });
    }, []);


    const handleDelete = async (news_id, index) => {
        await myAxios.delete('/admin/delete-news', { data: { news_id: news_id } });
        const filterArray = news;
        filterArray.splice(index, 1);
        setNews([...filterArray]);
        setModalLoading(false)
        setOpen(false)
    };

    return (
        <MainCard
            content={false}
            title="News and Promotions"
            secondary={
                <Button variant="outlined" onClick={() => navigate('/admin/add-news-and-promotions')}
                    disabled={loading ? true : false}
                    style={{ color: theme.palette.success.main, border: '1px solid', borderColor: !loading ? theme.palette.success.main : 'gray', width: '200px' }}
                >
                    {!loading ?
                        'Add News'
                        :
                        <CircularProgress sx={{ color: 'gray' }} size={24} />
                    }
                </Button>
            }
        >
            {!loading ?
                (news.length > 0 ?
                    (
                        <TableContainer>
                            <Table stickyHeader aria-label="sticky table">
                                <TableHead>
                                    <TableRow>
                                        {columns.map((column) => (
                                            <TableCell
                                                key={column.id}
                                                sx={{ py: 3, textAlign: 'center' }}
                                                align={column.align}
                                                style={{ minWidth: column.minWidth }}
                                            >
                                                {column.label}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {news
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((row, index) => (
                                            <TableRow key={row._id} sx={{ py: 3 }} hover role="checkbox" tabIndex={-1}>
                                                <TableCell sx={{ textAlign: 'center' }}>{row.title}</TableCell>
                                                <TableCell sx={{ textAlign: 'center' }}>
                                                    {row.keyFeatures.length > 0 ? (
                                                        <div>
                                                            {row.keyFeatures.map((keyFeature, index) => (
                                                                <Chip
                                                                    key={index}
                                                                    label={keyFeature}
                                                                    color="primary"
                                                                    variant="outlined"
                                                                    style={{ marginRight: '4px', marginBottom: '4px' }}
                                                                />
                                                            ))}
                                                        </div>
                                                    ) : (
                                                        ''
                                                    )}
                                                </TableCell>
                                                <TableCell sx={{ textAlign: 'center' }}>{formatTimestamp(row.createdAt)}</TableCell>
                                                <TableCell sx={{ textAlign: 'center' }}>
                                                    <img src={row.coverImage} style={{ width: '100px', height: '50px', borderRadius: 8 }} />
                                                </TableCell>

                                                <TableCell sx={{ textAlign: 'center' }}>
                                                    <Tooltip title="Edit" placement="top">
                                                        <IconButton
                                                            onClick={() => navigate('/admin/edit-news-and-promotions', { state: { news: row } })}
                                                        >
                                                            <ModeIcon sx={{ color: theme.palette.success.main }} />
                                                        </IconButton>
                                                    </Tooltip>
                                                    <Tooltip title="Delete" placement="top">
                                                        <IconButton sx={{ ml: 1 }} onClick={() => { setCurrentIndex(index); setCurrentId(row._id); setOpen(true) }}>
                                                            <DeleteIcon color="error" />
                                                        </IconButton>
                                                    </Tooltip>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                </TableBody>
                            </Table>
                            <DeleteModal open={open} handleOpen={handleOpen} handleClose={handleClose} moduleName={'News'} handleDelete={handleDelete} index={currentIndex} id={currentId} modalLoading={modalLoading} setModalLoading={setModalLoading} />
                            <TablePagination
                                rowsPerPageOptions={[10, 25, 100]}
                                component="div"
                                count={news.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </TableContainer>
                    ) :
                    (
                        <Grid sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '300px' }}>
                            <Typography sx={{ fontSize: 15 }}>
                                No Record Founded
                            </Typography>
                        </Grid>
                    )
                ) :
                (
                    <Grid sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '300px' }}>
                        <CircularProgress sx={{ color: '#00ee34' }} />
                    </Grid>
                )
            }
        </MainCard>
    );
}

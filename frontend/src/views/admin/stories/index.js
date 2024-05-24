import * as React from 'react';
import { useState, useEffect } from 'react';
import {
    Chip,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    Tooltip,
    CircularProgress,
    Grid,
    Typography
} from '@mui/material';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import MainCard from 'ui-component/cards/MainCard';
import myAxios from 'utils/myAxios';
import moment from 'moment';
import { useTheme } from '@mui/material/styles';
import ModeIcon from '@mui/icons-material/Mode';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteModal from 'ui-component/landing/Components/deleteModal';

//Tabel Head Row
const columns = [
    { id: '#', label: '#', minWidth: 100 },
    { id: 'thumbnail', label: 'Thumbnail', minWidth: 100 },
    { id: 'created_at', label: 'Created At', minWidth: 100 },
    { id: 'action', label: 'Action', minWidth: 100 }
];

export default function Stories() {
    const theme = useTheme();
    const navigate = useNavigate();
    const [stories, setStories] = useState('');
    const [loading, setLoading] = useState(true);

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [modalLoading, setModalLoading] = useState(false);

    const [currentIndex, setCurrentIndex] = useState('');
    const [currentId, setCurrentId] = useState('');

    const formatTimestamp = (timestamp) => {
        return moment(timestamp).fromNow();
    };

    useEffect(() => {
        myAxios
            .get('/admin/stories')
            .then((response) => {
                setStories(response.data.data.stories);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching stories:', error);
            });
    }, []);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event?.target?.value);
        setPage(0);
    };

    const handleAddStory = () => {
        setLoading(true);
        navigate('/admin/stories/add');
    };

    const handleDelete = async (story_id, index) => {
        const response = await myAxios.post('/admin/delete-story', { story_id: story_id });
        const filterArray = stories;
        filterArray.splice(index, 1);
        setStories([...filterArray]);
        setModalLoading(false);
        setOpen(false);
    };

    return (
        <MainCard
            content={false}
            title="Stories"
            secondary={
                <Button
                    variant="outlined"
                    style={{
                        color: theme.palette.success.main,
                        border: '1px solid',
                        borderColor: !loading ? theme.palette.success.main : 'gray',
                        width: '100px'
                    }}
                    onClick={handleAddStory}
                    disabled={loading ? true : false}
                >
                    {!loading ? 'Add Story' : <CircularProgress sx={{ color: 'gray' }} size={24} />}
                </Button>
            }
        >
            {/* table */}
            {!loading ? (
                stories.length > 0 ? (
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
                                {stories.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                                    <TableRow key={row._id} sx={{ py: 3 }} hover role="checkbox" tabIndex={-1}>
                                        <TableCell sx={{ textAlign: 'center' }}>{index + 1}</TableCell>
                                        <TableCell sx={{ textAlign: 'center' }}>
                                            <img src={row.storyImages[0]} style={{ width: '100px', height: '50px', borderRadius: 8 }} />
                                        </TableCell>
                                        {/* <TableCell sx={{textAlign: 'center'}}>{row.region.name}</TableCell> */}
                                        <TableCell sx={{ textAlign: 'center' }}>
                                            {' '}
                                            <Chip
                                                label={formatTimestamp(row.createdAt)}
                                                sx={{
                                                    background: theme.palette.success.light,
                                                    color: theme.palette.success.dark,
                                                    fontWeight: 'bold'
                                                }}
                                            />{' '}
                                        </TableCell>
                                        {/* <TableCell sx={{textAlign: 'center'}}>{row.sort}</TableCell> */}
                                        <TableCell sx={{ textAlign: 'center' }}>
                                            {/* Action button for each story */}
                                            <Tooltip title="Edit" placement="top">
                                                <IconButton onClick={() => navigate('/admin/stories/edit', { state: { story: row } })}>
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
                            moduleName={'Story'}
                            handleDelete={handleDelete}
                            index={currentIndex}
                            id={currentId}
                            modalLoading={modalLoading}
                            setModalLoading={setModalLoading}
                        />

                        <TablePagination
                            rowsPerPageOptions={[10, 25, 100]}
                            component="div"
                            count={stories.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </TableContainer>
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

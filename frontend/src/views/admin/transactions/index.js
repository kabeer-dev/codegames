import * as React from 'react';
import { useState } from 'react';
import { useTheme, Grid, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, TablePagination, Chip } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';

//Fake Transaction Data
const transactions = [
    { transactionId: 'XMFQWHGOGCO', amount: '100', userEmail: 'jhon@gmail.com', date: '24 Oct 2023', status: 'Paid' },
    { transactionId: 'ZAVLOGX8VLU', amount: '150', userEmail: 'due@gmail.com', date: '24 Feb 2024', status: 'UnPiad' },
    { transactionId: 'ZAVLOHX8VLA', amount: '200', userEmail: 'jhon@gmail.com', date: '24 Oct 2023', status: 'Paid' },
]
// Table Head Row
const columns = [
    { id: 'id', label: '#', minWidth: 100 },
    { id: 'transaction-id', label: 'Transaction Id', minWidth: 100 },
    { id: 'amount', label: 'Amount', minWidth: 100 },
    { id: 'user-email', label: 'User Email', minWidth: 100 },
    { id: 'date', label: 'Order Date', minWidth: 100 },
    { id: 'status', label: 'Status', minWidth: 100 },
];

export default function Transactions() {
    const theme = useTheme();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event?.target?.value);
        setPage(0);
    };

    //For Now only View Fake Transcations Data
    return (
        <MainCard content={false} title="Transactions">
            {/* {!loading ?
                (
                    transactions.length > 0 ?
                        ( */}
            <Grid>
                {/* table */}
                <TableContainer>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow >
                                {columns.map((column) => (
                                    <TableCell key={column.id} sx={{ py: 3, textAlign: 'center' }} align={column.align} style={{ minWidth: column.minWidth }}>
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {transactions
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => (
                                    <TableRow key={row.transactionId} sx={{ py: 3 }} hover role="checkbox" tabIndex={-1}>
                                        <TableCell sx={{ textAlign: 'center' }}>{index + 1}</TableCell>
                                        <TableCell sx={{ textAlign: 'center' }}>{row.transactionId}</TableCell>
                                        <TableCell sx={{ textAlign: 'center' }}>{row.amount}</TableCell>
                                        <TableCell sx={{ textAlign: 'center' }}>{row.userEmail}</TableCell>
                                        <TableCell sx={{ textAlign: 'center' }}>{row.date}</TableCell>
                                        <TableCell sx={{ textAlign: 'center' }}>
                                            <Chip
                                                label={row.status}
                                                sx={{
                                                    // background: row.status === 'Paid' ? theme.palette.success.light : (row.status === 'Processing' ? 'yellow': 'red'),
                                                    // color: row.status === 'Paid'? theme.palette.success.dark : 'black',
                                                    background: theme.palette.success.light,
                                                    color: theme.palette.success.dark,
                                                    fontWeight: 'bold'
                                                }}
                                            />
                                        </TableCell>
                                        {/* <TableCell sx={{ textAlign: 'center' }}>
                                                                <Button variant="contained" color="error" sx={{ ml: 1 }} onClick={() => { setCurrentIndex(index); setCurrentId(row._id); setOpen(true) }}>
                                                                    Remove
                                                                </Button>
                                                            </TableCell> */}
                                    </TableRow>
                                ))}

                        </TableBody>
                    </Table>
                    {/* <DeleteModal open={open} handleOpen={handleOpen} handleClose={handleClose} moduleName={'Mobile Game'} handleDelete={handleRemove} index={currentIndex} id={currentId} modalLoading={modalLoading} setModalLoading={setModalLoading} /> */}
                    {/* table pagination */}
                    <TablePagination
                        rowsPerPageOptions={[10, 25, 100]}
                        component="div"
                        count={transactions.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </TableContainer>


            </Grid>
            {/* ) :
                    (
                        <Grid sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '300px' }}>
                            <Typography sx={{ fontSize: 15 }}>
                                No Record Founded
                            </Typography>
                        </Grid>
                    )

                )
                :
                (
                    <Grid sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '300px' }}>
                        <CircularProgress sx={{ color: '#00ee34' }} />
                    </Grid>
                )

            } */}
        </MainCard>
    );
}

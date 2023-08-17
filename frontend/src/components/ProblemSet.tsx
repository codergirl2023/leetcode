import axios from "axios";
import React from 'react';
import {useEffect, useState} from "react";
import {
    Link,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow
} from "@mui/material";
import CompanyWiseQuestionsList from './CompanyWiseQuestionsList.js'

function ProblemSet() {
    const [problems, setProblems] = useState([]);
    useEffect(() => {
        axios
            .get("http://localhost:3000/problemset/all", {
                headers: {
                    'authorization': "Bearer " + localStorage.getItem('token')
                }
            })
            .then((response) => {
                setProblems(response.data.problemSet);
            })
            .catch((error) => {
                console.log("Error fetching problems:", error);
            });
    }, []);
    console.log("auth ", localStorage.getItem('token'))
    return (
        <div>
            <CompanyWiseQuestionsList/>
            <div style={{display:"flex", marginTop:"5rem"}}>
                <TableComp problems={problems}/>
            </div>
        </div>
    );
}
const columnsHeaderRow = ["Title", "Difficulty", "Acceptance"]

function TableComp({problems}) {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columnsHeaderRow.map((columnHeader) => (
                                <TableCell>
                                    {columnHeader}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {problems
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((problem) => {
                                return (
                                    <TableRow
                                        key={problem._id}
                                        sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                    >
                                        <TableCell component="th" scope="row">

                                            <Link href={problem._id}>{problem.title}</Link>
                                        </TableCell>
                                        <TableCell>{problem.acceptance}</TableCell>
                                        <TableCell
                                            sx={{color: problem.difficulty === "Easy" ? "green" : problem.difficulty === "Medium" ? "orange" : "red"}}>{problem.difficulty}</TableCell>

                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 50]}
                component="div"
                count={problems.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}
export default ProblemSet;

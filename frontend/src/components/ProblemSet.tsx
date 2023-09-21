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
import '../assets/static/ProblemSet.css';
import { IProblem } from "../types/type.js";
import { Link as RouterLink } from 'react-router-dom'; 

const BASE_URL = import.meta.env.VITE_BASE_URL;

interface problemSet extends Array<IProblem>{
    problem?:IProblem[]
}

function ProblemSet() {
    const [problems, setProblems] = useState<problemSet>([]);
    useEffect(() => {
        axios
            .get(`${BASE_URL}/problemSet/all`, {
                headers: {
                    'authorization': "Bearer " + localStorage.getItem('token')
                }
            })
            .then((response) => {
                console.log("problems =",response.data.problemSet)
                setProblems(response.data.problemSet);
            })
            .catch((error) => {
                console.log("Error fetching problems:", error);
            });
    }, []);
    return (
        <div>
            <CompanyWiseQuestionsList/>
            <div style={{display:"flex", marginTop:"5rem"}}>
                <TableComp problems={problems} />
            </div>
        </div>
    );
}
const columnsHeaderRow = ["Title", "Difficulty", "Acceptance"]

function TableComp({problems}:{problems:problemSet}) {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columnsHeaderRow.map((columnHeader, index) => (
                                <TableCell key={index}>
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
                                            
                                        <Link component={RouterLink} to={`/problemSet/${problem._id}`}>{problem.title}</Link>
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
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setEmployeeError,
  setEmployees,
} from "../features/employees/employeesSlice";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Container from "@mui/material/Container";
import { Typography } from "@mui/material";
import axios from "axios";
import styled from "@emotion/styled";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const Employees = () => {
  const employeesData = useSelector((state) => state?.employee?.employees);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      try {
        const result = await axios.get(
          `${import.meta.env.VITE_USER_API_HOSTNAME}user/getAll/`,
          { withCredentials: true }
        );
        const employeesResult = result?.data;
        dispatch(setEmployees(employeesResult));
      } catch (error) {
        dispatch(
          setEmployeeError({
            message: error?.response?.data?.message || "Network Error.",
            status: error?.response?.status || 500,
          })
        );
      }
    })();
  }, []);

  return (
    <Container maxWidth="xl">
      <Typography variant="h5" sx={{ mt: 3, mb: 2, textAlign: "center" }}>
        {"Employees Details"}
      </Typography>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table sx={{ minWidth: 650 }} stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Employee Name</StyledTableCell>
              <StyledTableCell align="right">Email</StyledTableCell>
              <StyledTableCell align="right">Type</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employeesData?.map((row) => (
              <StyledTableRow
                key={row?.fullName}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row?.fullName}
                </TableCell>
                <TableCell align="right">{row?.email}</TableCell>
                <TableCell align="right">{row?.type}</TableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default Employees;

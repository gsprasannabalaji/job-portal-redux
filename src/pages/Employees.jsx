import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setEmployeeError,
  setEmployees,
} from "../features/employees/employeesSlice";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Container from "@mui/material/Container";
import { Typography } from "@mui/material";
import axios from "axios";

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
      <Typography variant="h5" sx={{ mt: 3, mb: 2 }}>
        {"Employees Details"}
      </Typography>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table sx={{ minWidth: 650 }} stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>Employee Name</TableCell>
              <TableCell align="right">Email</TableCell>
              <TableCell align="right">Type</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employeesData?.map((row) => (
              <TableRow
                key={row?.fullName}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row?.fullName}
                </TableCell>
                <TableCell align="right">{row?.email}</TableCell>
                <TableCell align="right">{row?.type}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default Employees;

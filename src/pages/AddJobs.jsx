import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { TextField, Button, Container, Typography } from "@mui/material";
import { setNewJob, setNewJobError } from "../features/jobs/addJobSlice";
import CustomSnackBar from "../components/CustomSnackBar";

const AddJobs = () => {
  const { newJob: jobData,  error} = useSelector((state) => state?.addJob);
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const { name, value } = e?.target;
    dispatch(setNewJob({ ...jobData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    try {
        await axios.post(
          `${import.meta.env.VITE_USER_API_HOSTNAME}create/job`,
          jobData,
          { withCredentials: true }
        );
        dispatch(setNewJob({ 
            title: "",
            description: "",
            applyLink: "",
            companyName: "",
            salary: "",
         }));
         dispatch(setNewJobError({
          message: "Added New Job Successfully",
          status: 200
         }))
    } catch (err) {
        console.log(err);
        dispatch(setNewJobError({
          message: "Network Failed. Please try again later",
          status: 500,
        }))
    };
  }

  const checkDisabled = () => {
    const { title, companyName, description, salary, applyLink } = jobData;
    return!(
      title &&
      companyName &&
      description &&
      salary &&
      applyLink
    );
  }

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" sx={{my: 3}}>
        Add Job
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Company Name"
          fullWidth
          name="companyName"
          value={jobData?.companyName}
          onChange={handleInputChange}
          margin="normal"
          required
        />
        <TextField
          label="Title"
          fullWidth
          name="title"
          value={jobData?.title}
          onChange={handleInputChange}
          margin="normal"
          required
        />
        <TextField
          label="Description"
          fullWidth
          name="description"
          value={jobData?.description}
          onChange={handleInputChange}
          margin="normal"
          required
        />
        <TextField
          label="Apply Link"
          fullWidth
          name="applyLink"
          value={jobData?.applyLink}
          onChange={handleInputChange}
          margin="normal"
          required
        />
        <TextField
          label="Salary"
          fullWidth
          name="salary"
          value={jobData?.salary}
          onChange={handleInputChange}
          margin="normal"
          type="number"
          required
        />
        <Button type="submit" variant="contained" color="primary" disabled={checkDisabled()} fullWidth>
          Submit
        </Button>
      </form>
      {error?.message && <CustomSnackBar isOpen={true} message={error?.message} onClose={() => {dispatch(setNewJobError({
        message: "",
        status: 200
      }))}} customKey={"addJob"} />}
    </Container>
  );
};

export default AddJobs;

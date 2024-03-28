import Paper from '@mui/material/Paper';
import jobPosts from '../mockData/jobPosts';
import Box from "@mui/material/Box";
import { Link, Typography } from '@mui/material';
import { useTheme } from '@emotion/react';

const JobListing = () => {
    const theme = useTheme();

    return (
        <>
            {jobPosts?.map((jobPost) => (
                <Paper key={jobPost?.id} sx={{ p: 2, mt: 3, display: 'flex', flexDirection: 'column' }} elevation={5}>
                    <Typography variant="h5" sx={{ mt:0, mb: 2}} >{jobPost?.title}</Typography>
                    <Box component="p" sx={{ mt:0, mb: 2}} >{jobPost?.description}</Box>
                    <Box componen="div" sx={{ display: {xs: 'flex'}, justifyContent: 'space-between', alignItems: {xs: 'baseline', md: 'center'} , flexDirection: {xs: 'column', md: 'row'} }}>
                    <Link component={'a'} underline='hover' href={jobPost?.applyLink} target='_blank' sx={{ mb: {xs: 1} }}>Apply</Link>
                    <Box component="p" sx={{ m: 0, color: theme.palette.secondary.main}} >{jobPost?.lastUpdated}</Box>
                    </Box>
                </Paper>
            ))}
        </>
    )
}

export default JobListing;
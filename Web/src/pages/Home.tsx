import { Box, Grid, Typography } from "@mui/material";

const Home = () => {
	return (
		<Grid container spacing={1} direction="row" alignItems="center" justifyContent="center" sx={{ minHeight: "60vh" }} pb={4}>
			<Grid size={12}>
				<Typography variant="h2" color="primary" noWrap component="div" fontWeight={600}>
					<Box display="flex" justifyContent="center">
						HOME
					</Box>
				</Typography>
			</Grid>
		</Grid>
	);
};

export default Home;

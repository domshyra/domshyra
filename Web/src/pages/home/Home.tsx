import BorderSection from "@fragments/HomeSection";
import { Grid } from "@mui/material";
import { data } from "./data";

const Home = () => {
	return (
		<Grid
			container
			spacing={4}
			direction="row"
			alignItems="center"
			justifyContent="center"
			sx={{ minHeight: { xs: "20vh", md: "60vh", lg: "70vh" }, width: "100%" }}
			pb={{ md: 4, xs: 1 }}
		>
			{data.map((section, index) => (
				<BorderSection key={index} {...section} />
			))}
		</Grid>
	);
};

export default Home;

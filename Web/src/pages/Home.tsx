import BorderSection, { HomeSection } from "@fragments/HomeSection";
import { about, stations } from "@constants/routes";

import { Grid } from "@mui/material";
import { aboutMeElevatorPitch } from "@constants/data";

const data: HomeSection[] = [
	{
		title: "Stations Section",
		description:
			"Radio stations I've curated on <b>Spotify</b> for different seasons, moods, and activities. From hip hop to instrumentals, I have a love of music and sharing it is the oldest form of story telling.",
		link: stations,
	},
	{
		title: "About Me Section",
		description: aboutMeElevatorPitch,
		link: about,
	},
];

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

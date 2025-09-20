import { Box, Divider, Grid, Typography } from "@mui/material";
import { about, stations } from "@constants/routes";

import BorderPaper from "@fragments/paper/BorderPaper";
import { useNavigate } from "react-router-dom";

type HomeSection = {
	title: string;
	description: string;
	link: string;
};
const data: HomeSection[] = [
	{
		title: "Stations Section",
		description:
			"Radio stations I've curated on <b>Spotify</b> for different seasons, moods, and activities. From hip hop to instrumentals, I have a love of music and sharing it is the oldest form of story telling.",
		link: stations,
	},
	{
		title: "About Me Section",
		description:
			"I’m a full stack software engineer who solves both technical and creative problems. My work spans <b>React, .NET, Azure, SQL</b>, and <b>Terraform</b>, delivering web based SaaS applications that are scalable, intuitive, and impactful. I’ve built tools for companies like <b>Tesla, SpaceX, Nike, Meta</b>, and <b>Intel</b> at Currie & Brown, as well as modernized core systems at WSRB. I believe that design and development are both hard skills, and software should not only work — but work intuitively and tell a story.",
		link: about,
	},
];

const Home = () => {
	const nav = useNavigate();

	const homeSection = ({ title, description, link }: HomeSection) => {
		return (
			<Grid size={{ xs: 12, md: 6 }} sx={{ display: "flex", alignItems: "center", justifyContent: "center", overflowY: "ellipse" }} key={title}>
				<BorderPaper
					onClick={() => nav(link)}
					sx={{
						cursor: "pointer",
						height: {
							md: "28vh",
							lg: "23vh",
							xl: "18vh",
							xs: undefined,
						},
					}}
				>
					<Typography variant="h4" color="secondary" noWrap component="div" fontWeight={500}>
						<Box display="flex" justifyContent="center" color="primary.dark">
							{title}
						</Box>
					</Typography>
					<Divider sx={{ color: "primary.dark", my: 1, mx: 2 }} />
					<Typography variant="caption" color="text.secondary" fontWeight={400} dangerouslySetInnerHTML={{ __html: description }} />
				</BorderPaper>
			</Grid>
		);
	};

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
			{data.map((section) => homeSection(section))}
		</Grid>
	);
};

export default Home;

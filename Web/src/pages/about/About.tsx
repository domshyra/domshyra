import { Box, Grid, Typography, useMediaQuery, useTheme } from "@mui/material";

import AboutSection from "@fragments/AboutSection";
import JobTimeline from "@components/jobTimeline/JobTimeline";
import { data } from "./data";

//TODO? use some animations for section transitions, like fade in or slide in
//? https://mobbin.com/sites/retool-57b95056-1028-4d7b-a14a-c22f6c8694b6/65564b72-19e0-4bb7-b31e-288a72b5989a/preview

//? TODO: add a sticky sections for a title, such as I enjoy which stays at the top then adds (coding, music, etc.)
//? as you scroll down and the content will switch much like the above example link
const About = () => {
	const theme = useTheme();
	const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
	const maxWidth = isLargeScreen ? "60%" : "90%";

	return (
		<Box sx={{ flexGrow: 1, textAlign: "center", maxWidth, margin: "0 auto" }}>
			<Typography pb={0} variant="h4">
				About
			</Typography>
			<Typography variant="caption" color="text.secondary" fontWeight={400}>
				A curious creative who grew up in Portland Or, and is now a software developer in Brooklyn Ny. <br />
				<code>(this page is a work in progress)</code>
			</Typography>
			<Grid
				container
				spacing={4}
				direction="row"
				alignItems="center"
				justifyContent="center"
				sx={{ width: "100%" }}
				pb={{ md: 4, xs: 1 }}
				pt={2}
			>
				{data.map((section, index) => (
					<AboutSection key={index} {...section} />
				))}
				<JobTimeline />
			</Grid>

			{/* This will prob end up being it's own page, make sure to show responsibilities and what I did to make the company better. */}
			{/* What was the most fun thing I could work on for each project? C&B was the tree's and what if for blocks */}
			{/* templates and msal-selenium for wsrb, modernizing things and bringing the team new technologies and best practices, for many a things */}
		</Box>
	);
};
export default About;

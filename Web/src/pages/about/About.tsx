import { Box, Grid, Typography, useMediaQuery, useTheme } from "@mui/material";
import { about, work } from "@constants/routes";

import BorderSection from "@fragments/HomeSection";

const data = [
	{
		title: "Work History",
		link: `${about}/${work}`,
		description:
			"Senior software engineer working in <b>React, .NET, Azure, SQL</b>, and <b>Terraform</b>, delivering web based SaaS applications that are scalable, intuitive, and impactful. I’ve built tools for companies like <b>Tesla, SpaceX, Nike, Meta</b>, and <b>Intel</b> at Currie & Brown, as well as modernized core systems at WSRB.",
	},
	{
		title: "Skills",
		link: `${about}#skills`,
		show: false,
		description: "Web, backend, dev ops, code quality and making connections across teams, managing templates and ensuring testing.",
	},
	{
		title: "Github Projects",
		link: `${about}#github-projects`,
		show: false,
		description: "msal-selenium, this site, link to the playgrounds/Poc's.",
	},
	{
		title: "Outside of work projects",
		link: `${about}#outside-of-work-projects`,
		show: false,
		description:
			"Coding, making music and listening to and music history, architecture, skateboarding, motorcycles, self help / betterment, fashion and style.",
	},
];
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
				Add a brief summary here, or like a call to action / linked in profile bio stuff
			</Typography>
			<Grid
				container
				spacing={4}
				direction="row"
				alignItems="center"
				justifyContent="center"
				sx={{ minHeight: { xs: "20vh", md: "60vh", lg: "70vh" }, width: "100%" }}
				pb={{ md: 4, xs: 1 }}
				pt={2}
			>
				{data.map((section, index) => (
					<BorderSection key={index} {...section} headerColor="primary.main" />
				))}
			</Grid>

			{/* This will prob end up being it's own page, make sure to show responsibilities and what I did to make the company better. */}
			{/* TODO:? would also be cool to build a timeline in the work history page */}
			{/* What was the most fun thing I could work on for each project? C&B was the tree's and what if for blocks */}
			{/* templates and msal-selenium for wsrb, modernizing things and bringing the team new technologies and best practices, for many a things */}
		</Box>
	);
};
export default About;

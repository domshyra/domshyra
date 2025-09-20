import { Box, Link, Typography, useMediaQuery, useTheme } from "@mui/material";
import { about, work } from "@constants/routes";

import AboutDetails from "@sections/about/AboutDetails";
import { NavLink } from "react-router-dom";
import { jobDescription } from "./about";

//TODO? use some animations for section transitions, like fade in or slide in
//? https://mobbin.com/sites/retool-57b95056-1028-4d7b-a14a-c22f6c8694b6/65564b72-19e0-4bb7-b31e-288a72b5989a/preview

//? TODO: add a sticky sections for a title, such as I enjoy which stays at the top then adds (coding, music, etc.)
//? as you scroll down and the content will switch much like the above example link
const AboutView = () => {
	const theme = useTheme();
	const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
	return (
		<Box sx={{ flexGrow: 1, textAlign: "center", maxWidth: isLargeScreen ? "60%" : "90%", margin: "0 auto" }}>
			<Typography pb={2} variant="h4">
				About
			</Typography>
			<Typography variant="caption" color="text.secondary" fontWeight={400}>
				Add a brief summary here, or like a call to action / linked in profile bio stuff
			</Typography>

			{/* This will prob end up being it's own page, make sure to show responsibilities and what I did to make the company better. */}
			{/* TODO:? would also be cool to build a timeline in the work history page */}
			{/* What was the most fun thing I could work on for each project? C&B was the tree's and what if for blocks */}
			{/* templates and msal-selenium for wsrb, modernizing things and bringing the team new technologies and best practices, for many a things */}
			<AboutDetails title="Work History" description="wsrb, currie and brown(add clients), arvixe, j crew" />
			<Link component={NavLink} to={`${about}/${work}`}>
				work page
			</Link>

			<AboutDetails
				title="Skills" //break up of hard and soft? talk about how good i am at communicating across the Org.
				description="web, backend, dev ops, code quality and making connections across teams, managing templates and ensuring testing"
			/>

			<AboutDetails title="Github Projects" description="msal-selenium, this site, link to the playgrounds/Poc's" />

			<AboutDetails
				title="Outside of work projects" //hobbies
				description="coding, making music and listening to and music history, architecture, skateboarding, motorcycles, self help / betterment, fashion and style"
			/>
			{jobDescription.map((job, index) => (
				<AboutDetails key={index} {...job} />
			))}
		</Box>
	);
};
export default AboutView;

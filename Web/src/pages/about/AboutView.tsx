import { Box, Link, Typography } from "@mui/material";
import { about, work } from "@constants/routes";

import AboutDetails from "@sections/about/AboutDetails";
import { NavLink } from "react-router-dom";

const AboutView = () => {
	return (
		<Box sx={{ flexGrow: 1, textAlign: "center" }}>
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
			<AboutDetails title="Work History" content="wsrb, currie and brown(add clients), arvixe, j crew" />
			<Link component={NavLink} to={`${about}/${work}`}>
				work page
			</Link>

			<AboutDetails
				title="Skills" //break up of hard and soft? talk about how good i am at communicating across the Org.
				content="web, backend, dev ops, code quality and making connections across teams, managing templates and ensuring testing"
			/>

			<AboutDetails title="Github Projects" content="msal-selenium, this site, link to the playgrounds/Poc's" />

			<AboutDetails
				title="Outside of work projects" //hobbies
				content="coding, making music and listening to and music history, architecture, skateboarding, motorcycles, self help / betterment"
			/>
		</Box>
	);
};
export default AboutView;

import { Box, Typography } from "@mui/material";

import SocialButtons from "@components/socalis/SocialButtons";
import { aboutMeExtendedPitch } from "@constants/data";

//TODO? use some animations for section transitions, like fade in or slide in
//? https://mobbin.com/sites/retool-57b95056-1028-4d7b-a14a-c22f6c8694b6/65564b72-19e0-4bb7-b31e-288a72b5989a/preview

//? TODO: add a sticky sections for a title, such as I enjoy which stays at the top then adds (coding, music, etc.)
//? as you scroll down and the content will switch much like the above example link
const About = () => {
	return (
		<>
			<Typography textAlign="center" variant="h4" sx={{ width: "100%" }}>
				About
			</Typography>
			<Typography
				textAlign="center"
				variant="caption"
				color="text.secondary"
				fontWeight={400}
				sx={{
					width: "100%",
					mx: { xs: 2, md: 20, lg: 40 },
					whiteSpace: "pre-line",
					mt: -4,
					mb: 1,
				}}
				dangerouslySetInnerHTML={{ __html: aboutMeExtendedPitch }}
			/>
			<Box sx={{ width: "50%", margin: "0 auto", mb: 2 }}>
				<SocialButtons />
			</Box>
			{/* This will prob end up being it's own page, make sure to show responsibilities and what I did to make the company better. */}
			{/* What was the most fun thing I could work on for each project? C&B was the tree's and what if for blocks */}
			{/* templates and msal-selenium for wsrb, modernizing things and bringing the team new technologies and best practices, for many a things */}
		</>
	);
};
export default About;

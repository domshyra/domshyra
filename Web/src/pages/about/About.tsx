import { Box, Divider, Grid, Stack, Typography } from "@mui/material";
import { aboutMeTitle, data, skillsTitle, workHistory } from "@pages/home/data";

import JobTimeline from "@components/jobTimeline/JobTimeline";
import Skill from "@components/Skill";
import { skillsList } from "@pages/skills/data";

//TODO? use some animations for section transitions, like fade in or slide in
//? https://mobbin.com/sites/retool-57b95056-1028-4d7b-a14a-c22f6c8694b6/65564b72-19e0-4bb7-b31e-288a72b5989a/preview

//? TODO: add a sticky sections for a title, such as I enjoy which stays at the top then adds (coding, music, etc.)
//? as you scroll down and the content will switch much like the above example link
const About = () => {
	return (
		<>
			<Typography pb={0.5} textAlign="center" variant="h4" sx={{ width: "100%" }}>
				About
			</Typography>
			<Typography
				textAlign="center"
				variant="caption"
				color="text.secondary"
				fontWeight={400}
				sx={{ width: "100%", mx: { xs: 2, md: 20, lg: 40 } }}
				dangerouslySetInnerHTML={{ __html: data.find((x) => x.title === aboutMeTitle)?.description || "" }}
			/>
			<Typography textAlign="center" variant="caption" color="text.secondary" fontWeight={400} sx={{ width: "100%" }}>
				Grew up in Portland Or, and out in Brooklyn Ny. <br />
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
				<Stack direction="row" sx={{ width: "100%", justifyContent: "space-between", display: "flex" }} spacing={1}>
					<Grid size={{ xs: 12, lg: 6 }}>
						<Typography pb={1} variant="h6" textAlign="center" sx={{ width: "100%" }}>
							{workHistory}
						</Typography>
						<JobTimeline />
					</Grid>
					<Divider orientation="vertical" flexItem sx={{ display: { xs: "none", lg: "block" } }} />
					{/* <Grid size={{ xs: 0, lg: 1 }} /> */}
					<Grid size={{ xs: 12, lg: 6 }}>
						<Box pt={1} px={2}>
							<Typography pb={2} variant="h6" textAlign="center" sx={{ width: "100%" }}>
								{skillsTitle}
							</Typography>
							{skillsList.map((skill, index) => (
								<Skill key={index} {...skill} />
							))}
						</Box>
					</Grid>
				</Stack>
			</Grid>

			{/* This will prob end up being it's own page, make sure to show responsibilities and what I did to make the company better. */}
			{/* What was the most fun thing I could work on for each project? C&B was the tree's and what if for blocks */}
			{/* templates and msal-selenium for wsrb, modernizing things and bringing the team new technologies and best practices, for many a things */}
		</>
	);
};
export default About;

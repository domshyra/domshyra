import { Box, Divider, Link, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";

import Education from "@components/education/Education";
import Skills from "@pages/skills/Skills";
import SocialButtons from "@components/socalis/SocialButtons";
import WorkHistory from "@pages/work/WorkHistory";
import { aboutMeExtendedPitch } from "@constants/data";
import { aboutMeImgUrl } from "@constants/common";

//TODO? use some animations for section transitions, like fade in or slide in
//? https://mobbin.com/sites/retool-57b95056-1028-4d7b-a14a-c22f6c8694b6/65564b72-19e0-4bb7-b31e-288a72b5989a/preview

//? TODO: add a sticky sections for a title, such as I enjoy which stays at the top then adds (coding, music, etc.)
//? as you scroll down and the content will switch much like the above example link
const About = () => {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("md"));

	const typographyStyle = { width: "90%", mx: { xs: 3, md: 20, lg: 40 }, whiteSpace: "pre-line", px: 0.5 };
	const domDeckardUrl = "https://domdeckard.com";
	const dividerStyle = { color: "primary.main", pr: 10, mr: 10, my: 4, width: "100%" };
	return (
		<>
			<Typography textAlign="center" variant="h3" sx={{ width: "100%" }} pb={2}>
				About
			</Typography>
			{/* show on top for mobile */}
			<img
				src={aboutMeImgUrl}
				alt="A photo of myself"
				loading="lazy"
				style={{
					display: isMobile ? "block" : "none",
					marginLeft: "auto",
					marginRight: "auto",
					width: "85%",
					borderRadius: 8,
				}}
			/>
			<Stack spacing={2} sx={{ width: isMobile ? "100%" : "50%", mt: 1 }}>
				<Box justifyItems={"center"}>
					<Typography
						textAlign="center"
						variant="body1"
						color="text.secondary"
						fontWeight={400}
						sx={{
							...typographyStyle,
							mt: -4,
						}}
						dangerouslySetInnerHTML={{ __html: aboutMeExtendedPitch }}
					/>
					<Typography
						textAlign="center"
						variant="body1"
						color="text.secondary"
						fontWeight={400}
						sx={{
							...typographyStyle,
							mb: 1,
						}}
					>
						I also create music under the moniker of{" "}
						<Link
							fontWeight={400}
							href={domDeckardUrl}
							target="_blank"
							rel="noopener noreferrer"
							underline="none"
							sx={{ cursor: "pointer" }}
						>
							Dom Deckard
						</Link>
					</Typography>
					<Typography variant="caption" fontWeight={400} justifyContent="center" display="flex" sx={{ width: "100%" }}>
						View my other coding profiles, and social links below
					</Typography>
					<Box sx={{ width: isMobile ? "100%" : "60%", margin: "0 auto", mb: 2, alignItems: "center" }}>
						<SocialButtons />
					</Box>
				</Box>
			</Stack>
			{/* show on right for desktop */}
			<img
				src={aboutMeImgUrl}
				alt="A photo of myself"
				loading="lazy"
				style={{
					marginLeft: "auto",
					marginRight: "auto",
					width: "35%",
					borderRadius: 8,
					display: isMobile ? "none" : "block",
				}}
			/>

			<Divider sx={dividerStyle} />
			<WorkHistory />
			<Divider sx={dividerStyle} />
			<Skills />
			<Divider sx={dividerStyle} />
			<Education />
			{/* This will prob end up being it's own page, make sure to show responsibilities and what I did to make the company better. */}
			{/* What was the most fun thing I could work on for each project? C&B was the tree's and what if for blocks */}
			{/* templates and msal-selenium for wsrb, modernizing things and bringing the team new technologies and best practices, for many a things */}
		</>
	);
};
export default About;

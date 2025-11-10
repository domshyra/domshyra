import { Box, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";

import SocialButtons from "@components/socalis/SocialButtons";
import { aboutMeExtendedPitch } from "@constants/data";
import { aboutMeImgUrl } from "@constants/common";
import { useNavigate } from "react-router-dom";
import { work } from "@constants/routes";

//TODO? use some animations for section transitions, like fade in or slide in
//? https://mobbin.com/sites/retool-57b95056-1028-4d7b-a14a-c22f6c8694b6/65564b72-19e0-4bb7-b31e-288a72b5989a/preview

//? TODO: add a sticky sections for a title, such as I enjoy which stays at the top then adds (coding, music, etc.)
//? as you scroll down and the content will switch much like the above example link
const About = () => {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("md"));
	const navigate = useNavigate();

	const typographyStyle = { width: "90%", mx: { xs: 3, md: 20, lg: 40 }, whiteSpace: "pre-line", px: 0.5 };
	const goToWork = () => {
		navigate(`../${work}`);
	};
	return (
		<>
			<Typography textAlign="center" variant="h4" sx={{ width: "100%" }} pb={2}>
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
						color="primary"
						fontWeight={400}
						sx={{
							...typographyStyle,
							cursor: "pointer",
							underline: "hover",
							mb: 1,
						}}
						onClick={goToWork}
					>
						View my work here.
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

			{/* This will prob end up being it's own page, make sure to show responsibilities and what I did to make the company better. */}
			{/* What was the most fun thing I could work on for each project? C&B was the tree's and what if for blocks */}
			{/* templates and msal-selenium for wsrb, modernizing things and bringing the team new technologies and best practices, for many a things */}
		</>
	);
};
export default About;

import { Box, Card, Divider, Grid, Link, Paper, Typography, useTheme } from "@mui/material";

import SchoolIcon from "@mui/icons-material/School";

const Education = () => {
	const theme = useTheme();
	const corpoolUrl = "https://github.com/FroYoInc/sprinkles";
	return (
		<>
			<Typography pb={1} variant="h4" textAlign="center" sx={{ width: "100%" }}>
				Education
			</Typography>
			<Typography variant="body2" color="text.secondary" textAlign="center" sx={{ width: "100%" }}>
				I graduated with a Computer Science degree from Portland State University in 2015.
			</Typography>
			<Box sx={{ width: "80%", margin: "0 auto", pt: 2, pb: 4 }}>
				<Grid container spacing={2} sx={{ justifyContent: "center", alignItems: "center" }}>
					<Card component={Paper} variant="outlined" sx={{ p: 2, mb: 2 }}>
						<Typography
							textAlign="left"
							color={theme.palette.primary.light}
							variant="h6"
							fontWeight={700}
							pb={0}
							mb={-1}
							justifyContent="flex-start"
							alignItems="center"
							display="flex"
						>
							<SchoolIcon sx={{ mr: 1 }} />
							Bachelor's Degree in Computer Science
						</Typography>
						<Divider sx={{ color: "primary.main", pr: 10, mr: 10, pt: 1 }} />
						<Box justifyContent="space-between" alignItems="center" sx={{ px: 1, mt: 1 }}>
							<Typography component="span" variant="body2" textAlign="left" mb={1} fontWeight={400} sx={{ display: "block" }}>
								<b>Portland State University</b> - Portland, OR
							</Typography>
							<Typography component="span" variant="body2" textAlign="left" mb={1} fontWeight={400} sx={{ display: "block" }}>
								<b>Senior Project:</b> Corpool is a corporate carpooling app I helped with for my senior capstone project made for
								Navex Global.{" "}
								<Link
									fontWeight={400}
									href={corpoolUrl}
									target="_blank"
									rel="noopener noreferrer"
									underline="none"
									sx={{ cursor: "pointer" }}
								>
									View the repo
								</Link>
							</Typography>
							<Typography component="span" variant="body2" textAlign="left" mb={1} fontWeight={400} sx={{ display: "block" }}>
								<b>Classes:</b> Compilers, Data Structures & Algorithms, Software Engineering, Databases, Computer Ethics and Computer
								Graphics.
							</Typography>
							<Typography component="span" variant="body2" textAlign="left" mb={1} fontWeight={400} sx={{ display: "block" }}>
								<b>GPA:</b> 3.4
							</Typography>
						</Box>
					</Card>
				</Grid>
			</Box>
		</>
	);
};
export default Education;

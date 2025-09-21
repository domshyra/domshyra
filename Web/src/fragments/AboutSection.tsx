import { Box, Divider, Grid, Typography } from "@mui/material";

import BorderPaper from "./paper/BorderPaper";
import { useNavigate } from "react-router-dom";

export type AboutSection = {
	title: string;
	description: string;
	link: string;
	show?: boolean;
};
const AboutSection = ({ title, description, link, show }: AboutSection) => {
	const nav = useNavigate();
	if (show === false) return null;
	return (
		<Grid size={6} sx={{ display: "flex", alignItems: "center", justifyContent: "center", overflowY: "ellipse" }} key={title}>
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
					<Box display="flex" justifyContent="center" color="primary.main">
						{title}
					</Box>
				</Typography>
				<Divider sx={{ color: "primary.dark", my: 1, mx: 2 }} />
				<Typography variant="caption" color="text.secondary" fontWeight={400} dangerouslySetInnerHTML={{ __html: description }} />
			</BorderPaper>
		</Grid>
	);
};

export default AboutSection;

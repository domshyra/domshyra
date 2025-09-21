import { Box, Divider, Grid, Typography } from "@mui/material";

import BorderPaper from "./paper/BorderPaper";
import { useNavigate } from "react-router-dom";

export type HomeSection = {
	title: string;
	description: string;
	link: string;
};
const BorderSection = ({ title, description, link }: HomeSection) => {
	const nav = useNavigate();
	return (
		<Grid size={{ xs: 12, md: 6 }} sx={{ display: "flex", alignItems: "center", justifyContent: "center", overflowY: "ellipse" }} key={title}>
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
					<Box display="flex" justifyContent="center" color="primary.dark">
						{title}
					</Box>
				</Typography>
				<Divider sx={{ color: "primary.dark", my: 1, mx: 2 }} />
				<Typography variant="caption" color="text.secondary" fontWeight={400} dangerouslySetInnerHTML={{ __html: description }} />
			</BorderPaper>
		</Grid>
	);
};

export default BorderSection;

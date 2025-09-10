import { Box, Typography } from "@mui/material";

import BorderPaper from "@fragments/paper/BorderPaper";

type AboutDetailsProps = {
	title: string;
	content?: string;
};

const AboutDetails = ({ title, content }: AboutDetailsProps) => {
	return (
		<Box sx={{ flexGrow: 1, textAlign: "center" }}>
			<Typography pb={2} variant="h6">
				{title}
			</Typography>
			<BorderPaper>
				<Typography>{content}</Typography>
			</BorderPaper>
		</Box>
	);
};
export default AboutDetails;

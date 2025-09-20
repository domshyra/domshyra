import { Box, List, ListItem, Typography } from "@mui/material";

//TODO! figure out typings
export type AboutDetailsProps = {
	title: string;
	company?: string;
	description?: string;
	bullets?: string[];
};

const AboutDetails = ({ title, company, description, bullets }: AboutDetailsProps) => {
	return (
		<Box sx={{ flexGrow: 1, textAlign: "center" }}>
			<Typography pb={2} variant="h5" color="primary">
				{company ? `${company} - ${title}` : title}
			</Typography>
			<Typography
				component="p"
				textAlign="center"
				color="text.secondary"
				pb={2}
				dangerouslySetInnerHTML={{ __html: description || "FILL OUT DOM" }}
			/>
			<List sx={{ listStyleType: "disc" }}>
				{bullets &&
					bullets.map((bullet, index) => (
						<ListItem key={index} sx={{ display: "list-item", padding: 0.25, justifyContent: "center" }}>
							<Typography component="div" variant="caption" textAlign="left" dangerouslySetInnerHTML={{ __html: bullet }} />
						</ListItem>
					))}
			</List>
		</Box>
	);
};
export default AboutDetails;

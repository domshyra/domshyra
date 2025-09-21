import JobTimeline from "@components/jobTimeline/JobTimeline";
import { Typography } from "@mui/material";

const WorkHistory = () => {
	/* This will prob end up being it's own page, make sure to show responsibilities and what I did to make the company better. */
	/* TODO:? would also be cool to build a timeline in the work history page */
	/* What was the most fun thing I could work on for each project? C&B was the tree's and what if for blocks */
	/* templates and msal-selenium for wsrb, modernizing things and bringing the team new technologies and best practices, for many a things */

	return (
		<>
			<Typography pb={0} variant="h4" textAlign="center" color="primary" sx={{ width: "100%" }}>
				Work History
			</Typography>
			<JobTimeline />
		</>
	);
};
export default WorkHistory;

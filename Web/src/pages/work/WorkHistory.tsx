import { Grid, Typography } from "@mui/material";
import { data, workHistory } from "@pages/home/data";

import JobTimeline from "@components/jobTimeline/JobTimeline";
import { workHistoryInMy } from "@constants/data";

const WorkHistory = () => {
	return (
		<>
			<Typography pb={1} variant="h4" textAlign="center" sx={{ width: "100%" }}>
				{workHistory}
			</Typography>
			<Grid size={{ xs: 12, sm: 10, md: 8 }} sx={{ margin: "0 auto", pb: 1, px: { sm: 4, lg: 6 } }}>
				<Typography
					variant="caption"
					color="text.secondary"
					fontWeight={400}
					dangerouslySetInnerHTML={{ __html: data.find((x) => x.title === workHistory)?.description || "" }}
				/>
				<Typography variant="caption" color="text.secondary" fontWeight={400} dangerouslySetInnerHTML={{ __html: workHistoryInMy }} />
			</Grid>
			<Grid size={{ xs: 12, sm: 10, md: 8 }} sx={{ margin: "0 auto", pb: 2, pt: 2 }}>
				<JobTimeline />
			</Grid>
		</>
	);
};
export default WorkHistory;

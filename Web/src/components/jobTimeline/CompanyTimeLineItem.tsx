import { TimelineConnector, TimelineContent, TimelineDot, TimelineItem, TimelineSeparator } from "@mui/lab";

import HomeIcon from "@mui/icons-material/Home";
import { Typography } from "@mui/material";

export type CompanyTimelineItemProps = {
	company: string;
	isFirstItem?: boolean;
};

const CompanyTimeLineItem = ({ company, isFirstItem }: CompanyTimelineItemProps) => {
	return (
		<TimelineItem>
			<TimelineSeparator>
				{!isFirstItem && <TimelineConnector />}
				<TimelineDot color="primary" variant="outlined" sx={{ my: 0 }}>
					<HomeIcon />
				</TimelineDot>
				<TimelineConnector />
			</TimelineSeparator>

			<TimelineContent
				sx={{
					py: 0,
					alignItems: "center",
					display: "flex",
				}}
			>
				<Typography variant="h5" color="primary" mb={0} textAlign="left" pb={isFirstItem ? 4 : 0}>
					{company}
				</Typography>
			</TimelineContent>
		</TimelineItem>
	);
};

export default CompanyTimeLineItem;

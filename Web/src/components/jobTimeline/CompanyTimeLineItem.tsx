import { TimelineConnector, TimelineContent, TimelineDot, TimelineItem, TimelineSeparator } from "@mui/lab";

import Homecon from "@mui/icons-material/Home";
import { Typography } from "@mui/material";

export type CompanyTimelineItemProps = {
	company: string;
};

const CompanyTimeLineItem = ({ company }: CompanyTimelineItemProps) => {
	return (
		<TimelineItem>
			<TimelineSeparator>
				<TimelineConnector />
				<TimelineDot color="primary" variant="outlined">
					<Homecon />
				</TimelineDot>
				<TimelineConnector />
			</TimelineSeparator>
			<TimelineContent>
				<Typography variant="h5" color="primary" pb={0} mb={0} textAlign="left">
					{company}
				</Typography>
			</TimelineContent>
		</TimelineItem>
	);
};

export default CompanyTimeLineItem;

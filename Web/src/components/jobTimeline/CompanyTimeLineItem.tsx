import { TimelineConnector, TimelineContent, TimelineDot, TimelineItem, TimelineSeparator } from "@mui/lab";

import Homecon from "@mui/icons-material/Home";
import { Typography } from "@mui/material";

export type CompanyTimelineItemProps = {
	company: string;
	renderFirstConnector?: boolean;
};

const CompanyTimeLineItem = ({ company, renderFirstConnector }: CompanyTimelineItemProps) => {
	return (
		<TimelineItem>
			<TimelineSeparator>
				{renderFirstConnector && <TimelineConnector />}
				<TimelineDot color="primary" variant="outlined">
					<Homecon />
				</TimelineDot>
				<TimelineConnector />
			</TimelineSeparator>

			<TimelineContent>
				<Typography variant="h5" color="primary" mt={1} mb={0} textAlign="left">
					{company}
				</Typography>
			</TimelineContent>
		</TimelineItem>
	);
};

export default CompanyTimeLineItem;

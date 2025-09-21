import { TimelineConnector, TimelineContent, TimelineDot, TimelineItem, TimelineSeparator } from "@mui/lab";

import HomeIcon from "@mui/icons-material/Home";
import { ReactNode } from "react";
import { Typography } from "@mui/material";
import WorkTimeSpan from "@fragments/WorkTimeSpan";

export type CompanyTimelineItemProps = {
	company: string;
	isFirstItem?: boolean;
	companyIcon?: ReactNode;
	start: Date;
	end?: Date;
};

const CompanyTimeLineItem = ({ company, isFirstItem, companyIcon, start, end }: CompanyTimelineItemProps) => {
	return (
		<TimelineItem>
			<TimelineSeparator>
				{!isFirstItem && <TimelineConnector />}
				<TimelineDot color="primary" variant="outlined" sx={{ my: 0 }}>
					{companyIcon ? companyIcon : <HomeIcon />}
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
				<WorkTimeSpan start={start} end={end} marginTop={isFirstItem ? -1 : 3.4} paddingLeft={1} />
			</TimelineContent>
		</TimelineItem>
	);
};

export default CompanyTimeLineItem;

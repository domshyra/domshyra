import { Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import { TimelineConnector, TimelineContent, TimelineDot, TimelineItem, TimelineSeparator } from "@mui/lab";

import HomeIcon from "@mui/icons-material/Home";
import { ReactNode } from "react";
import WorkTimeSpan from "@fragments/WorkTimeSpan";

export type CompanyTimelineItemProps = {
	company: string;
	isFirstItem?: boolean;
	companyIcon?: ReactNode;
	start: Date;
	end?: Date;
};

const CompanyTimeLineItem = ({ company, isFirstItem, companyIcon, start, end }: CompanyTimelineItemProps) => {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("md"));
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
					pb: 0,
					mt: isFirstItem ? -1 : 4,
					alignItems: "center",
					display: "flex",
				}}
			>
				<Stack direction="column" justifyContent="space-between" spacing={2} pb={4}>
					<Typography variant={isMobile ? "h5" : "h4"} mb={0} textAlign="left">
						{company}
						<WorkTimeSpan start={start} end={end} />
					</Typography>
				</Stack>
			</TimelineContent>
		</TimelineItem>
	);
};

export default CompanyTimeLineItem;

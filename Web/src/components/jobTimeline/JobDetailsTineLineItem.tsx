import { Divider, Typography } from "@mui/material";
import { TimelineConnector, TimelineContent, TimelineDot, TimelineItem, TimelineSeparator } from "@mui/lab";
import { formatDateTime, getTimeLengthInYearsAndMonths } from "@tools/datetime";

export type JobDetailsTimelineItemProps = {
	title: string;
	company: string;
	description: string;
	bullets: string[];
	start: Date;
	end?: Date;
};

const JobDetailsTimelineItem = ({ title, description, start, end }: JobDetailsTimelineItemProps) => {
	const format = "MMM/YY";
	const timespan = getTimeLengthInYearsAndMonths(start, end);
	return (
		<TimelineItem>
			<TimelineSeparator>
				<TimelineConnector />
				<TimelineDot variant="outlined" />
				<TimelineConnector />
			</TimelineSeparator>
			<TimelineContent>
				<Typography component="div" textAlign="left" color="text.secondary">
					{title}
				</Typography>
				<Typography pb={2} variant="caption" color="text.secondary" fontWeight={300} mt={-1}>
					{`${formatDateTime(start, format)} - ${end ? formatDateTime(end, format) : "Present"}`} ·{" "}
					{timespan.years > 0 ? `${timespan.years} yr${timespan.years > 1 ? "s" : ""} ` : ""}
					{timespan.months > 0 ? `${timespan.months} mo${timespan.months > 1 ? "s" : ""} ` : ""}
				</Typography>
				<Divider sx={{ color: "primary.main", pr: 10, mr: 10 }} />
				<Typography
					component="span"
					variant="caption"
					textAlign="left"
					color="text.secondary"
					dangerouslySetInnerHTML={{ __html: description }}
					mb={1}
				/>
			</TimelineContent>
			{/* <Collapse orientation="horizontal" in={false}>
				<List sx={{ listStyleType: "disc" }}>
					{bullets &&
						bullets.map((bullet, index) => (
							<ListItem key={index} sx={{ display: "list-item", padding: 0.25, justifyContent: "center" }}>
								<Typography component="div" variant="caption" textAlign="left" dangerouslySetInnerHTML={{ __html: bullet }} />
							</ListItem>
						))}
				</List>
			</Collapse> */}
		</TimelineItem>
	);
};

export default JobDetailsTimelineItem;

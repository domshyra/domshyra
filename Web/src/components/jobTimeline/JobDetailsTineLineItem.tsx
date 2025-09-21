import { Collapse, Divider, List, ListItem, Paper, Typography, useTheme } from "@mui/material";
import { TimelineConnector, TimelineContent, TimelineDot, TimelineItem, TimelineSeparator } from "@mui/lab";
import { formatDateTime, getTimeLengthInYearsAndMonths } from "@tools/datetime";
import { greyDarkest, greyLightest } from "@styles/themes/colors";

export type JobDetailsTimelineItemProps = {
	title: string;
	company: string;
	description: string;
	bullets: string[];
	start: Date;
	end?: Date;
};

const JobDetailsTimelineItem = ({ title, description, start, end, bullets }: JobDetailsTimelineItemProps) => {
	const format = "MMM/YY";
	const timespan = getTimeLengthInYearsAndMonths(start, end);
	const theme = useTheme();
	const htmlFontSize = theme.typography.htmlFontSize;

	return (
		<TimelineItem>
			<TimelineSeparator sx={{ ml: 1.5 }}>
				<TimelineConnector sx={{ minHeight: `${37 / htmlFontSize}rem` }} />
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
				<Paper
					elevation={0}
					sx={{
						width: "100%",
						mt: 1,
						mb: 2,
						minHeight: `${175 / htmlFontSize}rem`,
						maxHeight: "20vh",
						overflowY: "scroll",
						scrollbarGutter: "stable",
						overflow: "scroll",
						"&::-webkit-scrollbar": {
							scrollbarWidth: "thin",
							width: "0.3rem",
						},
						"&::-webkit-scrollbar-thumb": {
							backgroundColor: theme.palette.grey[400],
							borderRadius: "0.25rem",
						},
						"& *::-webkit-scrollbar": {
							width: "0.4em",
							height: "0.6em",
						},
						"& *::-webkit-scrollbar-track": {
							borderRadius: "8px",
							background: theme.palette.mode === "dark" ? greyDarkest : greyLightest,
						},
						"& *::-webkit-scrollbar-corner": {
							backgroundColor: theme.palette.background.paper,
						},
					}}
				>
					<Collapse orientation="horizontal" in={true}>
						<List sx={{ listStyleType: "disc", pl: 3 }} dense>
							{bullets &&
								bullets.map((bullet, index) => (
									<ListItem key={index} sx={{ display: "list-item", padding: 0.25, justifyContent: "left" }}>
										<Typography component="div" variant="caption" textAlign="left" dangerouslySetInnerHTML={{ __html: bullet }} />
									</ListItem>
								))}
						</List>
					</Collapse>
				</Paper>
			</TimelineContent>
		</TimelineItem>
	);
};

export default JobDetailsTimelineItem;

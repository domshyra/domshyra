import { Box, Collapse, Divider, List, ListItem, Typography, useTheme } from "@mui/material";
import { TimelineConnector, TimelineContent, TimelineDot, TimelineItem, TimelineSeparator } from "@mui/lab";

import { JobDetails } from "./data";
import JobPaper from "./JobPaper";
import WorkTimeSpan from "@fragments/WorkTimeSpan";

export type JobDetailsTimelineItemProps = JobDetails & {
	isFirstItem: boolean;
	isFirstCompanyItem?: boolean;
};

const JobDetailsTimelineItem = ({ title, description, start, end, bullets, isFirstItem, isFirstCompanyItem }: JobDetailsTimelineItemProps) => {
	const theme = useTheme();
	const htmlFontSize = theme.typography.htmlFontSize;

	return (
		<TimelineItem sx={{ mt: isFirstCompanyItem ? -3 : -1 }}>
			<TimelineSeparator sx={{ ml: 1.5 }}>
				<TimelineConnector sx={{ minHeight: `${37 / htmlFontSize}rem` }} />
				<TimelineDot variant="outlined" />
				<TimelineConnector />
			</TimelineSeparator>
			<TimelineContent sx={{ ml: 2.5, mt: isFirstItem ? -1 : 2 }}>
				<Typography textAlign="left" color="text.primary" variant="h6" fontWeight={700} pb={0} mb={-1}>
					{title}
				</Typography>
				<WorkTimeSpan start={start} end={end} marginTop={-1} />
				<Divider sx={{ color: "primary.main", pr: 10, mr: 10, pt: 0.5 }} />
				<Box justifyContent="space-between" alignItems="center" sx={{ px: 1, mt: 1 }}>
					<Typography component="span" variant="body2" textAlign="left" dangerouslySetInnerHTML={{ __html: description }} mb={1} />
				</Box>
				{bullets && (
					<Box sx={{ px: 1 }}>
						<JobPaper mode={theme.palette.mode} htmlFontSize={htmlFontSize}>
							<Collapse orientation="horizontal" in={true}>
								<List sx={{ listStyleType: "disc", pl: 3 }} dense>
									{bullets &&
										bullets.map((bullet, index) => (
											<ListItem key={index} sx={{ display: "list-item", padding: 0.25, justifyContent: "left" }}>
												<Typography
													component="code"
													variant="caption"
													textAlign="left"
													dangerouslySetInnerHTML={{ __html: bullet }}
													fontWeight={300}
												/>
											</ListItem>
										))}
								</List>
							</Collapse>
						</JobPaper>
					</Box>
				)}
			</TimelineContent>
		</TimelineItem>
	);
};

export default JobDetailsTimelineItem;

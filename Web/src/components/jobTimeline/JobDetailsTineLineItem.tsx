import { Box, Collapse, Divider, List, ListItem, Paper, Typography, useTheme } from "@mui/material";
import { ReactNode, memo } from "react";
import { TimelineConnector, TimelineContent, TimelineDot, TimelineItem, TimelineSeparator } from "@mui/lab";
import { formatDateTime, getTimeLengthInYearsAndMonths } from "@tools/datetime";
import { greyDarkest, greyLightest } from "@styles/themes/colors";

import { JobDetails } from "./data";

export type JobDetailsTimelineItemProps = JobDetails & {
	isFirstItem: boolean;
	isFirstCompanyItem?: boolean;
};

const JobDetailsTimelineItem = ({ title, description, start, end, bullets, isFirstItem, isFirstCompanyItem }: JobDetailsTimelineItemProps) => {
	const format = "MMM/YY";
	const timespan = getTimeLengthInYearsAndMonths(start, end);
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
				<Typography pb={2} variant="caption" color="text.secondary" fontWeight={300} mt={-1}>
					{`${formatDateTime(start, format)} - ${end ? formatDateTime(end, format) : "Present"}`} ·{" "}
					{timespan.years > 0 ? `${timespan.years} yr${timespan.years > 1 ? "s" : ""} ` : ""}
					{timespan.months > 0 ? `${timespan.months} mo${timespan.months > 1 ? "s" : ""} ` : ""}
				</Typography>
				<Divider sx={{ color: "primary.main", pr: 10, mr: 10, pt: 0.5 }} />
				<Box justifyContent="space-between" alignItems="center" sx={{ px: 1, mt: 1 }}>
					<Typography
						component="span"
						variant="body2"
						textAlign="left"
						// color="text.secondary"
						dangerouslySetInnerHTML={{ __html: description }}
						mb={1}
					/>
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

const JobPaper = memo(({ mode, htmlFontSize, children }: { mode: "light" | "dark"; htmlFontSize: number; children?: ReactNode }) => {
	const barColor = mode === "dark" ? greyDarkest : greyLightest;

	return (
		<Paper
			elevation={0}
			sx={{
				width: "100%",
				mt: 1,
				mb: 2,
				minHeight: `${60 / htmlFontSize}rem`,
				maxHeight: "20vh",
				overflowY: "scroll",
				scrollbarGutter: "stable",
				overflow: "scroll",
				"&::-webkit-scrollbar": {
					scrollbarWidth: "thin",
					width: "0.3rem",
				},
				"&::-webkit-scrollbar-thumb": {
					backgroundColor: barColor,
					borderRadius: "0.25rem",
				},
				"& *::-webkit-scrollbar": {
					width: "0.4em",
					height: "0.6em",
				},
				"& *::-webkit-scrollbar-track": {
					borderRadius: "8px",
					background: barColor,
				},
				"& *::-webkit-scrollbar-corner": {},
				"::-webkit-scrollbar-corner": {},
			}}
		>
			{children}
		</Paper>
	);
});

export default JobDetailsTimelineItem;

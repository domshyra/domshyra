import { Timeline, timelineItemClasses } from "@mui/lab";

import AboutDetails from "@sections/about/AboutDetails";
import CompanyTimeLineItem from "@components/jobTimeline/CompanyTimeLineItem";
import JobDetailsTimelineItem from "@components/jobTimeline/JobDetailsTineLineItem";
import React from "react";
import { Typography } from "@mui/material";
import { jobDescription } from "@pages/about/data";

const Work = () => {
	/* This will prob end up being it's own page, make sure to show responsibilities and what I did to make the company better. */
	/* TODO:? would also be cool to build a timeline in the work history page */
	/* What was the most fun thing I could work on for each project? C&B was the tree's and what if for blocks */
	/* templates and msal-selenium for wsrb, modernizing things and bringing the team new technologies and best practices, for many a things */

	const companies = Array.from(new Set(jobDescription.map((job) => job.company)));

	return (
		<>
			<Typography pb={2} variant="h4" textAlign="center" color="primary" sx={{ width: "100%" }}>
				Work History
			</Typography>

			<Timeline
				sx={{
					//make it left aligned
					[`& .${timelineItemClasses.root}:before`]: {
						flex: 0,
						padding: 0,
					},
				}}
			>
				{companies.map((company) => (
					<React.Fragment key={company}>
						<CompanyTimeLineItem company={company} />
						{jobDescription
							.filter((job) => job.company === company)
							.map((filteredJob, index) => (
								<JobDetailsTimelineItem key={index} {...filteredJob} />
							))}
					</React.Fragment>
				))}
			</Timeline>

			<AboutDetails title="J. Crew" description="wsrb, currie and brown(add clients), arvixe, j crew" />
		</>
	);
};
export default Work;

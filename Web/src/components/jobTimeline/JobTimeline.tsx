import { Timeline, timelineItemClasses } from "@mui/lab";

import CompanyTimeLineItem from "./CompanyTimeLineItem";
import { Grid } from "@mui/material";
import JobDetailsTimelineItem from "./JobDetailsTineLineItem";
import React from "react";
import { jobDescription } from "@components/jobTimeline/data";

const JobTimeline = () => {
	const companies = Array.from(new Set(jobDescription.map((job) => job.company)));

	return (
		<Grid size={{ xs: 12, sm: 10, md: 8 }} sx={{ margin: "0 auto", pb: 2 }}>
			<Timeline
				sx={{
					//make it left aligned
					[`& .${timelineItemClasses.root}:before`]: {
						flex: 0,
						padding: 0,
					},
					px: 0,
				}}
			>
				{companies.map((company, companyIndex) => (
					<React.Fragment key={company}>
						<CompanyTimeLineItem company={company} isFirstItem={companyIndex === 0} />
						{jobDescription
							.filter((job) => job.company === company)
							.map((filteredJob, index) => (
								//use the companyIndex index cause it's only the first item on the timeline we wanna adjust
								<JobDetailsTimelineItem
									key={index}
									{...filteredJob}
									isFirstItem={index === 0}
									isFirstCompanyItem={companyIndex === 0}
								/>
							))}
					</React.Fragment>
				))}
			</Timeline>
		</Grid>
	);
};

export default JobTimeline;

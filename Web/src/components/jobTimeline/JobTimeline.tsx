import { Timeline, timelineItemClasses } from "@mui/lab";

import CompanyTimeLineItem from "./CompanyTimeLineItem";
import JobDetailsTimelineItem from "./JobDetailsTineLineItem";
import React from "react";
import { jobDescription } from "@pages/about/data";

const JobTimeline = () => {
	const companies = Array.from(new Set(jobDescription.map((job) => job.company)));

	return (
		<Timeline
			sx={{
				//make it left aligned
				[`& .${timelineItemClasses.root}:before`]: {
					flex: 0,
					padding: 0,
				},
			}}
		>
			{companies.map((company, companyIndex) => (
				<React.Fragment key={company}>
					<CompanyTimeLineItem company={company} renderFirstConnector={companyIndex !== 0} />
					{jobDescription
						.filter((job) => job.company === company)
						.map((filteredJob, index) => (
							<JobDetailsTimelineItem key={index} {...filteredJob} />
						))}
				</React.Fragment>
			))}
		</Timeline>
	);
};

export default JobTimeline;

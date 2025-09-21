import { Timeline, timelineItemClasses } from "@mui/lab";
import { currieAndBrown, jCrew, wsrb } from "./data";

import CheckroomIcon from "@mui/icons-material/Checkroom";
import CompanyTimeLineItem from "./CompanyTimeLineItem";
import EngineeringIcon from "@mui/icons-material/Engineering";
import FireTruckIcon from "@mui/icons-material/FireTruck";
import { Grid } from "@mui/material";
import JobDetailsTimelineItem from "./JobDetailsTineLineItem";
import React from "react";
import { jobDescription } from "@components/jobTimeline/data";

const JobTimeline = () => {
	const companies = Array.from(new Set(jobDescription.map((job) => job.company)));

	const companyIcons = [
		{ label: jCrew, icon: <CheckroomIcon /> },
		{ label: currieAndBrown, icon: <EngineeringIcon /> },
		{ label: wsrb, icon: <FireTruckIcon /> },
		// Add more company-icon mappings as needed
	];

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
						<CompanyTimeLineItem
							company={company}
							isFirstItem={companyIndex === 0}
							companyIcon={companyIcons.find((comp) => comp.label === company)?.icon}
							start={
								new Date(
									Math.min(...jobDescription.filter((job) => job.company === company).map((job) => new Date(job.start).getTime()))
								)
							}
							end={
								new Date(
									Math.max(
										...jobDescription
											.filter((job) => job.company === company)
											.map((job) => (job?.end ? new Date(job.end).getTime() : Date.now()))
									)
								)
							}
						/>
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

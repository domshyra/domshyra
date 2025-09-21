import { formatDateTime, getTimeLengthInYearsAndMonths } from "@tools/datetime";

import { Typography } from "@mui/material";

type WorkTimeSpanProps = {
	start: Date;
	end?: Date;
	marginTop: number;
	paddingLeft?: number;
};

const WorkTimeSpan = ({ start, end, marginTop, paddingLeft }: WorkTimeSpanProps) => {
	const format = "MMM/YY";
	const span = getTimeLengthInYearsAndMonths(start, end);
	return (
		<Typography pb={2} variant="caption" color="text.secondary" fontWeight={300} mt={marginTop} pl={paddingLeft}>
			{`${formatDateTime(start, format)} - ${end ? formatDateTime(end, format) : "Present"}`} ·{" "}
			{span.years > 0 ? `${span.years} yr${span.years > 1 ? "s" : ""} ` : ""}
			{span.months > 0 ? `${span.months} mo${span.months > 1 ? "s" : ""} ` : ""}
		</Typography>
	);
};

export default WorkTimeSpan;

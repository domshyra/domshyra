import { Typography } from "@mui/material";
import { getTimeSpanDisplayString } from "@tools/datetime";

type WorkTimeSpanProps = {
	start: Date;
	end?: Date;
};

const WorkTimeSpan = ({ start, end }: WorkTimeSpanProps) => {
	return (
		<Typography variant="caption" color="text.secondary" fontWeight={300} display="flex" sx={{ alignItems: "flex-end" }}>
			{getTimeSpanDisplayString(start, end)}
		</Typography>
	);
};

export default WorkTimeSpan;

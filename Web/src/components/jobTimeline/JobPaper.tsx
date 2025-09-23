import { ReactNode, memo } from "react";
import { greyDarkest, greyLightest } from "@styles/themes/colors";

import { Paper } from "@mui/material";

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
				WebkitOverflowScrolling: "touch",
			}}
		>
			{children}
		</Paper>
	);
});

export default JobPaper;

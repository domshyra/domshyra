import { Box, Button, Paper } from "@mui/material";
import { ReactNode, memo, useEffect, useRef, useState } from "react";

const JobBullets = memo(({ htmlFontSize, children }: { htmlFontSize: number; children?: ReactNode }) => {
	const [showMore, setShowMore] = useState(false);
	const size = 60;
	const ref = useRef<HTMLDivElement>(null);
	const [shouldShowButton, setShouldShowButton] = useState(false);

	useEffect(() => {
		const checkOverflow = () => {
			if (ref.current) {
				setShouldShowButton(ref.current.clientHeight > size / htmlFontSize && ref.current.scrollHeight > ref.current.clientHeight);
			}
		};
		checkOverflow();

		// for window resizes
		window.addEventListener("resize", checkOverflow);
		return () => {
			window.removeEventListener("resize", checkOverflow);
		};
	}, [children, htmlFontSize]);

	const toggleShowMore = () => {
		setShowMore((prev) => !prev);
	};

	return (
		<Box mb={2} pt={0.5}>
			<Paper
				elevation={1}
				ref={ref}
				sx={{
					width: "100%",
					mt: 1,
					minHeight: `${size / htmlFontSize}rem`,
					maxHeight: showMore ? "none" : "20vh",
					overflowY: showMore ? "none" : "scroll",
					scrollbarGutter: "stable",
					overflow: showMore ? "none" : "scroll",
					px: 0.5,
					borderColor: "divider",
					borderWidth: 1,
					borderStyle: "solid",
				}}
			>
				{children}
			</Paper>
			{shouldShowButton && (
				<Button size="small" variant="text" onClick={toggleShowMore} sx={{ width: "100%", fontWeight: "light", borderRadius: "8px" }}>
					{showMore ? "Show Less" : "Show More"}
				</Button>
			)}
		</Box>
	);
});

export default JobBullets;

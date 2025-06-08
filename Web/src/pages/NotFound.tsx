import { Box, Typography } from "@mui/material";

const NotFound = () => {
	return (
		<>
			<Box sx={{ flexGrow: 1, textAlign: "center" }}>
				<Typography pb={2} variant="h3">
					404 - Not found
				</Typography>
			</Box>
		</>
	);
};
export default NotFound;

import { Box, Link, Typography } from "@mui/material";

import { NavLink } from "react-router-dom";
import { appName } from "@constants/common";

const AppBarTitle = () => {
	return (
		<Box sx={{ width: "100%", position: "absolute", left: 0, textAlign: "center" }}>
			<Link underline="none" to="/" component={NavLink}>
				<Typography variant="h6" noWrap component="div">
					{appName}
				</Typography>
			</Link>
		</Box>
	);
};

export default AppBarTitle;

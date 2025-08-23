import { Box, Link, Typography } from "@mui/material";

import { NavLink } from "react-router-dom";
import { appName } from "@constants/common";

const AppBarTitle = () => {
	return (
		<Box sx={{ width: "100%", position: "absolute", left: 0, textAlign: "center", px: 2, pointerEvents: "none" }}>
			<Link underline="none" to="/" component={NavLink}>
				<Typography variant="h6" noWrap component="span" sx={{ pointerEvents: "auto", fontWeight: 600 }}>
					{appName}
				</Typography>
			</Link>
		</Box>
	);
};

export default AppBarTitle;

import { Link, Typography } from "@mui/material";

import { NavLink } from "react-router-dom";
import { appName } from "@constants/common";

const AppBarTitle = () => {
	return (
		<Link underline="none" to="/" component={NavLink}>
			<Typography variant="h6" noWrap component="div">
				{appName}
			</Typography>
		</Link>
	);
};

export default AppBarTitle;

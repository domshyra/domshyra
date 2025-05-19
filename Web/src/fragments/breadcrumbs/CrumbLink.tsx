import { Link as MuiLink } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const CrumbLink = ({ text, to }: { text: string; to: string }) => {
	return (
		<MuiLink component={RouterLink} to={to} underline="hover" color="inherit">
			{text}
		</MuiLink>
	);
};

export default CrumbLink;

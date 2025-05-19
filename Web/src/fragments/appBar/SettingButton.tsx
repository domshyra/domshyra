import { IconButton } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import { settings } from "@constants/routes";
import { useNavigate } from "react-router-dom";

const SettingsButton = () => {
	const navigation = useNavigate();
	return (
		<IconButton onClick={() => navigation(settings)} aria-label="settings" color="inherit">
			<SettingsIcon />
		</IconButton>
	);
};

export default SettingsButton;

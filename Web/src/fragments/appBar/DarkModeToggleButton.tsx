import { IconButton, useColorScheme } from "@mui/material";

import BedtimeIcon from "@mui/icons-material/Bedtime";
import WbSunnyIcon from "@mui/icons-material/WbSunny";

const DarkModeToggleButton = () => {
	const { mode, setMode } = useColorScheme();
	return (
		<IconButton onClick={() => setMode(mode === "light" ? "dark" : "light")} aria-label="settings" color="inherit">
			{mode === "light" ? <WbSunnyIcon /> : <BedtimeIcon />}
		</IconButton>
	);
};

export default DarkModeToggleButton;

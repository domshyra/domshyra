import { useColorScheme, useMediaQuery, useTheme } from "@mui/material";

import BedtimeIcon from "@mui/icons-material/Bedtime";
import ComputerIcon from "@mui/icons-material/Computer";
import SettingsView from "./SettingView";
import SmartphoneIcon from "@mui/icons-material/Smartphone";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import { useCallback } from "react";

export default function Settings() {
	const theme = useTheme();
	const { mode, setMode } = useColorScheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("md"));

	const themeOptions = useCallback(
		() => [
			{ key: "light", label: "Light", icon: <WbSunnyIcon />, onchange: () => setMode("light") },
			{ key: "dark", label: "Dark", icon: <BedtimeIcon />, onchange: () => setMode("dark") },
			{ key: "system", label: "System", icon: isMobile ? <SmartphoneIcon /> : <ComputerIcon />, onchange: () => setMode("system") },
		],
		[isMobile, setMode]
	);

	const usingText = mode === "system" ? "system settings" : `${mode} mode`;

	return <SettingsView usingText={usingText} themeOptions={themeOptions} />;
}

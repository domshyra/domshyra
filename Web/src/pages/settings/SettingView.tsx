import { Box, Button, Container, Divider, FormHelperText, ToggleButton, ToggleButtonGroup, Typography, useTheme } from "@mui/material";

import BedtimeIcon from "@mui/icons-material/Bedtime";
import BorderPaper from "src/fragments/paper/BorderPaper";
import VisibilityIcon from "@mui/icons-material/Visibility";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import { useAppSelector } from "@redux/hooks";
import { useNavigate } from "react-router-dom";

interface SettingsViewProps {
	activateDarkMode: () => void;
	activateLightMode: () => void;
	activateCvdMode: () => void;
}

export default function SettingsView({ activateDarkMode, activateLightMode, activateCvdMode }: SettingsViewProps) {
	const theme = useTheme();
	const navigate = useNavigate();
	const { themeName } = useAppSelector((state) => state.themeMode);

	const themeOptions = [
		{ key: "light", label: "Light", icon: <WbSunnyIcon />, onchange: activateLightMode },
		{ key: "dark", label: "Dark", icon: <BedtimeIcon />, onchange: activateDarkMode },
		{ key: "cvd", label: "Color Vision Deficiency", icon: <VisibilityIcon />, onchange: activateCvdMode },
	];

	const boxDivider = (
		<Divider
			sx={{
				color: theme.palette.background.paperBorder,
				borderColor: theme.palette.background.paperBorder,
				width: "100%",
				my: 2,
			}}
		/>
	);

	return (
		<Container maxWidth="xs">
			<Typography variant="h4" align="center" pb={2}>
				Settings
			</Typography>
			<BorderPaper
				sx={{
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<Typography variant="h5" color="textDisabled" align="center">
					Select a Theme
				</Typography>
				<Box>
					{boxDivider}
					<Box display="flex" alignItems="center" pb={1}>
						<ToggleButtonGroup color="primary" value={themeName} exclusive aria-label="Theme selection">
							{themeOptions.map((option) => (
								<ToggleButton key={option.key} value={option.key} aria-label={option.label} onClick={option.onchange}>
									{option.icon}
									<Typography variant="body2" sx={{ ml: 1 }}>
										{option.key}
									</Typography>
								</ToggleButton>
							))}
						</ToggleButtonGroup>
					</Box>
					<Box display="flex" alignItems="center">
						<FormHelperText>Using {themeOptions.find((theme) => theme.key === themeName)?.label ?? themeName} Theme</FormHelperText>
					</Box>
				</Box>
				{boxDivider}

				<Box>
					<Button variant="contained" size="small" color="neutral" sx={{ width: "100%" }} onClick={() => navigate(-1)}>
						Go back
					</Button>
				</Box>
			</BorderPaper>
		</Container>
	);
}

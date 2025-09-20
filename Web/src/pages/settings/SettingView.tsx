import {
	Box,
	Button,
	Container,
	Divider,
	FormHelperText,
	ToggleButton,
	ToggleButtonGroup,
	Typography,
	useColorScheme,
	useTheme,
} from "@mui/material";

import BorderPaper from "src/fragments/paper/BorderPaper";
import { useNavigate } from "react-router-dom";

type SettingsViewProps = {
	usingText: string;
	themeOptions: () => { key: string; label: string; icon: React.ReactNode; onchange: () => void }[];
};

export default function SettingsView({ usingText, themeOptions }: SettingsViewProps) {
	const theme = useTheme();
	const navigate = useNavigate();
	const { mode } = useColorScheme();

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
					Select a mode
				</Typography>
				<Box>
					{boxDivider}
					<Box display="flex" alignItems="center" pb={1}>
						<ToggleButtonGroup color="primary" value={mode} exclusive aria-label="Theme selection">
							{themeOptions().map((option) => (
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
						<FormHelperText>Using {usingText}</FormHelperText>
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

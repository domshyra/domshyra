import { Alert, AlertTitle, Box, Collapse, Tooltip } from "@mui/material";

interface OfflineAlertViewProps {
	online: boolean;
	offlineAtDisplay: string | null;
	relativeDisplayTime: string;
	showRelativeTime: boolean;
	setShowRelativeTime: (show: boolean) => void;
}

export const OfflineAlertView = ({ online, offlineAtDisplay, relativeDisplayTime, showRelativeTime, setShowRelativeTime }: OfflineAlertViewProps) => {
	return (
		<Box sx={{ width: "100%" }}>
			<Collapse in={!online}>
				<Alert
					severity="error"
					variant="filled"
					onClick={() => {
						setShowRelativeTime(!showRelativeTime);
					}}
				>
					<AlertTitle>Offline</AlertTitle>
					The app has been offline since{" "}
					<Tooltip title={showRelativeTime ? offlineAtDisplay : relativeDisplayTime}>
						<>{showRelativeTime ? relativeDisplayTime : offlineAtDisplay}</>
					</Tooltip>
					. Please check your internet connection.
				</Alert>
			</Collapse>
		</Box>
	);
};

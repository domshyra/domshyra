import { Box, FormHelperText, Tooltip, Typography } from "@mui/material";
import { useCallback, useState } from "react";

import { getRelativeTime } from "@tools/datetime";
import { useAppSelector } from "@redux/hooks";
import { useTheme } from "@mui/material/styles";

const LastSavedText = ({ savedAt, failedState, isDirty }: { savedAt: Date | null; failedState: boolean; isDirty: boolean }) => {
	const { online, offlineAtDisplay } = useAppSelector((state) => state.connectionStatus);

	const [showRelativeTime, setShowRelativeTime] = useState(false);
	const theme = useTheme();
	const errorStyle = theme.palette.error.main;

	const relativeTimeDisplay = getRelativeTime(savedAt);

	const toolTipTitle = useCallback(() => {
		if (savedAt) {
			return showRelativeTime ? `${savedAt.toLocaleTimeString()}` : `${relativeTimeDisplay}`;
		}
		return "";
	}, [savedAt, showRelativeTime, relativeTimeDisplay]);

	if (failedState) {
		return <FormHelperText sx={{ color: errorStyle }}>The form is currently in a failed state. Please refresh the page.</FormHelperText>;
	}

	return (
		<>
			{!online ? (
				<FormHelperText sx={{ color: errorStyle }}>
					{`Offline since ${offlineAtDisplay}, changes will be saved when you're back online.`}
				</FormHelperText>
			) : null}
			<FormHelperText
				onClick={() => {
					setShowRelativeTime(!showRelativeTime);
				}}
			>
				<Tooltip title={toolTipTitle()}>
					<Box display="flex" pt={0.5} pb={1} sx={{ display: { xs: "none", md: "flex" } }}>
						<Box display="flex" justifyContent="left">
							<Typography variant="caption" color="text.secondary" fontWeight={300}>
								{savedAt ? `Last saved at ${showRelativeTime ? relativeTimeDisplay : savedAt.toLocaleTimeString()}` : null}
							</Typography>
						</Box>
						<Box sx={{ flexGrow: 1 }} />

						<Box sx={{ flexGrow: 1 }} />
						<Box display="flex" justifyContent="right">
							<Typography variant="caption" color="text.secondary" fontWeight={300}>
								{isDirty ? "...working" : ""}
							</Typography>
						</Box>
					</Box>
				</Tooltip>
			</FormHelperText>
		</>
	);
};

export default LastSavedText;

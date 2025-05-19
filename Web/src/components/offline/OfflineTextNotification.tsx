import { FormHelperText } from "@mui/material";
import { useAppSelector } from "@redux/hooks";

/**
 * Renders a text notification when the user is offline.
 * @returns JSX.Element | null
 */
const OfflineTextNotification = () => {
	const { online } = useAppSelector((state) => state.connectionStatus);
	if (online) {
		return null;
	}
	return (
		<FormHelperText sx={{ textAlign: "left", paddingBottom: 0 }}>
			You are offline, some data might be out of date.
		</FormHelperText>
	);
};

export default OfflineTextNotification;

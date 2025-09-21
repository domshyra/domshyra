import { SnackbarMessage, setSnackbar } from "@redux/slices/snackbar";

import { useAppDispatch } from "@redux/hooks";
import { useCallback } from "react";

function useSnackbarMessage() {
	const dispatch = useAppDispatch();
	const setSnackbarMessage = useCallback(
		(message: Pick<SnackbarMessage, "message" | "severity" | "link" | "duration">) => {
			dispatch(
				setSnackbar({
					show: true,
					message: message.message,
					severity: message.severity,
					link: message.link,
					duration: message.duration,
				})
			);
		},
		[dispatch]
	);
	return setSnackbarMessage;
}

export default useSnackbarMessage;

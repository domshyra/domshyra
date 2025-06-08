import { Alert, Link, Snackbar, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@redux/hooks";

import { NavLink } from "react-router-dom";
import { setSnackbar } from "@redux/slices/snackbar";
import { useCallback } from "react";

const autoHideDuration = 5000;

/**
 * A component that displays a snackbar alert message for the whole app.
 */
const SnackbarAlert = () => {
	const { show, message, link, severity } = useAppSelector((state) => state.snackbar);
	const dispatch = useAppDispatch();
	const onClose = useCallback(() => {
		dispatch(setSnackbar({ show: false, message: "", link: "" }));
	}, [dispatch]);

	// if we have a link, we want to show the message as a link
	const showLink = (link?.length ?? 0) > 0;

	return (
		<Snackbar open={show} autoHideDuration={autoHideDuration} onClose={onClose} anchorOrigin={{ vertical: "bottom", horizontal: "left" }}>
			<Alert id="alert-delete-msg" onClose={onClose} severity={severity ?? "success"} sx={{ width: "100%" }}>
				{showLink ? (
					<Link underline="none" component={NavLink} to={link ?? ""} reloadDocument>
						<Typography sx={{ fontWeight: "bold" }} display="inline">
							{message}
						</Typography>
					</Link>
				) : (
					<Typography variant={"body1"}>{message}</Typography>
				)}
			</Alert>
		</Snackbar>
	);
};

export default SnackbarAlert;

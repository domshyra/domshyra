import { Grid } from "@mui/material";
import React from "react";
import SnackbarAlert from "@fragments/snackbar/SnackbarAlert";

/**
 * Renders a layout component for displaying snackbar messages.
 *
 * @param {Object} props - The component props.
 * @param {React.ReactElement<any, string | React.JSXElementConstructor<any>>} props.children - The child elements to be rendered within the layout.
 * @returns {React.ReactElement} The rendered layout component.
 */
export const SnackbarLayout = (props: {
	children: React.ReactElement<unknown, string | React.JSXElementConstructor<unknown>>;
}): React.ReactElement => {
	return (
		<>
			<Grid container>{props.children}</Grid>
			<SnackbarAlert />
		</>
	);
};

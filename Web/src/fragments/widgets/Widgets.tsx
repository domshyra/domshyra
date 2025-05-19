import { Paper } from "@mui/material";
import { styled } from "@mui/material/styles";

export const borderRadius = 16;

export const Widget = styled(Paper)(({ theme }) => ({
	padding: 16,
	borderRadius: borderRadius,
	maxWidth: "100%",
	margin: "auto",
	position: "relative",
	zIndex: 1,
	backdropFilter: "blur(40px)",
	boxShadow: theme.palette.mode === "dark" ? theme.shadows[2] : theme.shadows[1],
}));

export const WidgetMobile = styled(Paper)(({ theme }) => ({
	paddingLeft: 16,
	paddingRight: 16,
	paddingTop: 4,
	paddingBottom: 4,
	borderRadius: borderRadius,
	maxWidth: "100%",
	margin: "auto",
	position: "relative",
	zIndex: 1,
	backdropFilter: "blur(40px)",
	boxShadow: theme.palette.mode === "dark" ? theme.shadows[2] : theme.shadows[1],
}));

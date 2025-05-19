import { Backdrop, CircularProgress } from "@mui/material";

import { white } from "@styles/themes/colors";

function Loading({ open }: { open: boolean }) {
	return (
		<Backdrop
			id="Overlay"
			open={open}
			sx={{
				color: white,
				zIndex: (theme) => theme.zIndex.drawer + 1,
			}} //https://mui.com/material-ui/customization/z-index/
		>
			<CircularProgress color="inherit" />
		</Backdrop>
	);
}

export default Loading;


import { Box, Button } from "@mui/material";

import AppBarTitle from "@fragments/appBar/AppBarTitle";
import Menu from "@fragments/appBar/Menu";
import { MenuProps } from "@fragments/appBar/props";
import SettingsButton from "@fragments/appBar/SettingButton";

const MediumScreenMenu = (props: MenuProps) => {
	const { accessToken, setAccessTokenCallback, showHamburgerMenu } = props;
	return (
		<Box
			sx={{
				flexDirection: "row",
				justifyContent: "space-between",
				alignItems: "center",
				alignContent: "center",
				display: { xs: "none", md: "flex" },
				width: "100vw",
				textAlign: "center",
			}}
		>
			<Box sx={{ flexShrink: 1 }}>{showHamburgerMenu ? <Menu {...props} /> : null}</Box>

			<Box sx={{ width: "100%", ml: accessToken ? 6 : 5 }}>
				<AppBarTitle />
			</Box>
			<Box sx={{ flexShrink: 0 }}>
				{accessToken ? (
					<Button variant="text" color="secondary" onClick={() => setAccessTokenCallback(null)}>
						Log out
					</Button>
				) : null}
			</Box>
			<SettingsButton />
		</Box>
	);
};

export default MediumScreenMenu;

import { Box, AppBar as MuiAppBar, Toolbar, useTheme } from "@mui/material";

import { AppBarViewProps } from "./props";
import HomeIcon from "@mui/icons-material/Home";
import MediumScreenMenu from "@components/appBar/MediumScreenMenu";
import { MenuItemProps } from "@fragments/appBar/props";
import SmallScreenMenu from "@components/appBar/SmallScreenMenu";
import { root } from "@constants/routes";

/**
 * Represents a styled app bar component.
 */
const AppBarView = (props: AppBarViewProps) => {
	const { anchorEl, open, hamburgerMenus, handleClick, handleClose, setAccessTokenCallback, accessToken, showHamburgerMenu } = props;
	const theme = useTheme();

	const menuItems: Array<MenuItemProps> = [
		{
			label: "Home",
			path: root,
			icon: <HomeIcon />,
		},
	];

	return (
		<Box sx={{ flexGrow: 1 }}>
			<MuiAppBar position="static" color="default" sx={{ boxShadow: theme.palette.mode === "dark" ? theme.shadows[3] : theme.shadows[2] }}>
				<Toolbar>
					<SmallScreenMenu
						accessToken={accessToken}
						anchorEl={anchorEl}
						hamburgerMenus={hamburgerMenus}
						handleClick={handleClick}
						handleClose={handleClose}
						menuItems={menuItems}
						open={open}
						setAccessTokenCallback={setAccessTokenCallback}
						showHamburgerMenu={showHamburgerMenu}
					/>
					<MediumScreenMenu
						accessToken={accessToken}
						anchorEl={anchorEl}
						hamburgerMenus={hamburgerMenus}
						handleClick={handleClick}
						handleClose={handleClose}
						menuItems={menuItems}
						open={open}
						setAccessTokenCallback={setAccessTokenCallback}
						showHamburgerMenu={showHamburgerMenu}
					/>
				</Toolbar>
			</MuiAppBar>
		</Box>
	);
};

export default AppBarView;

import { IconButton, Menu as MenuMui } from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import { MenuProps } from "./props";

const Menu = ({ handleClick, open, anchorEl, hamburgerMenus, menuItems, handleClose }: MenuProps) => {
	return (
		<>
			<IconButton
				size="large"
				edge="start"
				color="inherit"
				aria-label="open drawer"
				aria-expanded={open ? "true" : undefined}
				onClick={handleClick}
				sx={{ mr: 2 }}
			>
				<MenuIcon />
			</IconButton>
			<MenuMui
				id="basic-menu"
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				slotProps={{
					list: {
						"aria-labelledby": "basic-button",
					},
				}}
			>
				{hamburgerMenus(menuItems)}
			</MenuMui>
		</>
	);
};

export default Menu;

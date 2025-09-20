import { IconButton, Menu as MenuMui } from "@mui/material";
import { about, root, stations } from "@constants/routes";

import HomeIcon from "@mui/icons-material/Home";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import MenuIcon from "@mui/icons-material/Menu";
import { MenuItemProps } from "@fragments/appBar/props";
import { MenuProps } from "./props";
import PersonIcon from "@mui/icons-material/Person";
import { useMemo } from "react";

const Menu = ({ handleClick, open, anchorEl, hamburgerMenus, handleClose }: MenuProps) => {
	const renderMenuItems = useMemo(() => {
		const menuItems: Array<MenuItemProps> = [
			{
				label: "Home",
				path: root,
				icon: <HomeIcon />,
			},
			{
				label: "About",
				path: about,
				icon: <PersonIcon />,
			},
			{
				label: "Stations",
				path: stations,
				icon: <LibraryMusicIcon />,
			},
		];
		return hamburgerMenus(menuItems);
	}, [hamburgerMenus]);
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
				{renderMenuItems}
			</MenuMui>
		</>
	);
};

export default Menu;

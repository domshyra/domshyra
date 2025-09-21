export type MenuProps = {
	accessToken: string | null;
	anchorEl: Element | null;
	hamburgerMenus: (items: MenuItemProps[]) => JSX.Element[];
	handleClick: (event: { currentTarget: Element }) => void;
	handleClose: () => void;
	open: boolean;
	setAccessTokenCallback: (response: { data: { accessToken: string } } | null) => void;
	showHamburgerMenu?: boolean;
};

/**
 * Used for the hamburger menu items in the AppBar
 */
export type MenuItemProps = {
	label: string;
	path: string;
	icon: JSX.Element;
	protected?: boolean;
};

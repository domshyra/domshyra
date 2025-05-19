import { MenuItemProps } from "@fragments/appBar/props";

export type AppBarViewProps = {
	accessToken: string | null;
	anchorEl: Element | null;
	hamburgerMenus: (items: MenuItemProps[]) => JSX.Element[];
	handleClick: (event: { currentTarget: Element }) => void;
	handleClose: () => void;
	open: boolean;
	setAccessTokenCallback: (response: { data: { accessToken: string } } | null) => void;
	showHamburgerMenu: boolean;
};

import { Grid, Link, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { useCallback, useState } from "react";

import AppBarView from "./AppBarView";
import MenuItem from "@mui/material/MenuItem";
import { MenuItemProps } from "@fragments/appBar/props";
import { NavLink } from "react-router-dom";
import { setAccessToken } from "@redux/slices/authorization";

// import { useIsAuthenticated } from "@azure/msal-react";

/**
 * Represents a styled app bar component.
 */
const AppBar = () => {
	//for hamburger menu
	const [anchorEl, setAnchorEl] = useState<Element | null>(null);
	const open = Boolean(anchorEl);
	const authorization = useAppSelector((state) => state.authorization);
	const handleClick = (event: { currentTarget: Element }) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	// const authenticated = useIsAuthenticated();

	const hamburgerMenus = (items: MenuItemProps[]) => {
		return items
			.filter((x) => (authorization.accessToken && x.protected) || !x.protected)
			.map((item) => (
				<Link underline="none" component={NavLink} to={item.path} key={item.path}>
					<MenuItem onClick={handleClose} aria-label={`Show ${item.label}`} title={`Show ${item.label}`}>
						<Grid container direction="row" alignContent="center" alignItems="center">
							<Typography>{item.label}</Typography>
						</Grid>
					</MenuItem>
				</Link>
			));
	};
	const accessToken = authorization?.accessToken;
	// const showHamburgerMenu = accessToken != null || isLocal(); //TODO remove use authenticated if using msal
	const dispatch = useAppDispatch();

	const setAccessTokenCallback = useCallback(
		(response: { data: { accessToken: string } } | null) => {
			dispatch(setAccessToken(response?.data?.accessToken ?? null));
		},
		[dispatch]
	);

	return (
		<AppBarView
			accessToken={accessToken}
			anchorEl={anchorEl}
			hamburgerMenus={hamburgerMenus}
			handleClick={handleClick}
			handleClose={handleClose}
			open={open}
			setAccessTokenCallback={setAccessTokenCallback}
			showHamburgerMenu={true}
		/>
	);
};

export default AppBar;

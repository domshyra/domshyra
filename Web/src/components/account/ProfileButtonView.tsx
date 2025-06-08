import AccountCircle from "@mui/icons-material/AccountCircle";
import { IPublicClientApplication } from "@azure/msal-browser";
import { IconButton } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

interface ProfileButtonViewProps {
	anchorEl: Element | null;
	handleClickProfile: (event: { currentTarget: Element }) => void;
	handleCloseProfile: () => void;
	handleLogout: (instance: IPublicClientApplication) => Promise<void>;
	instance: IPublicClientApplication;
}

const ProfileButtonView = ({ anchorEl, handleClickProfile, handleCloseProfile, handleLogout, instance }: ProfileButtonViewProps) => {
	return (
		<>
			<IconButton
				size="large"
				aria-label="account of current user"
				aria-controls="menu-appbar"
				aria-haspopup="true"
				onClick={handleClickProfile}
				color="inherit"
				id="logout-btn"
			>
				<AccountCircle />
			</IconButton>
			<Menu
				sx={{ mt: "45px" }}
				id="menu-appbar"
				anchorEl={anchorEl}
				anchorOrigin={{
					vertical: "top",
					horizontal: "right",
				}}
				keepMounted
				transformOrigin={{
					vertical: "top",
					horizontal: "right",
				}}
				open={Boolean(anchorEl)}
				onClose={handleCloseProfile}
			>
				<MenuItem
					onClick={async () => {
						await handleLogout(instance);
					}}
					id="logout-btn-confirm"
				>
					Log Out
				</MenuItem>
			</Menu>
		</>
	);
};

export default ProfileButtonView;

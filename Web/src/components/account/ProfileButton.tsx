import { IPublicClientApplication } from "@azure/msal-browser";
import ProfileButtonView from "./ProfileButtonView";
import { useMsal } from "@azure/msal-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { withRouter } from "./withRouter";

const ProfileButton = () => {
	//Profile Menu
	const [anchorEl, setAnchorProfileEl] = useState<Element | null>(null);
	//Auth
	const { instance } = useMsal();

	const navigate = useNavigate();

	const handleClickProfile = (event: { currentTarget: Element }) => {
		setAnchorProfileEl(event.currentTarget);
	};

	const handleCloseProfile = () => {
		setAnchorProfileEl(null);
	};

	const handleLogout = async (instance: IPublicClientApplication) => {
		//This will clear the session cache.
		await instance.logoutRedirect({
			//Prevent redirect to Azure logout page so user doesn't log out of AAD entirely.
			onRedirectNavigate: () => {
				return false;
			},
		});
		navigate("/logout");
	};

	return (
		<ProfileButtonView
			anchorEl={anchorEl}
			handleClickProfile={handleClickProfile}
			handleCloseProfile={handleCloseProfile}
			handleLogout={handleLogout}
			instance={instance}
		/>
	);
};

const ProfileButtonWithRouter = withRouter(ProfileButton);

export default ProfileButtonWithRouter;

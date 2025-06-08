// import { MsalAuthenticationTemplate, useIsAuthenticated } from "@azure/msal-react";

import { Navigate, Outlet } from "react-router-dom";

import { root } from "@constants/routes";
import { useAppSelector } from "@redux/hooks";

// import { checkForSeleniumTokensInSessionStorage } from "./authorization";

// import { useCallback } from "react";

// import useAuthentication from "@hooks/useAuthentication";

// import { InteractionType } from "@azure/msal-browser";

function ProtectedRoute() {
	// useAuthentication();
	// const isAuthenticated = useIsAuthenticated();
	const authorization = useAppSelector((state) => state.authorization);

	// This function seems like it shouldn't be necessary, but it is used to determine if we are running in a Selenium test environment
	// The assumption is that InteractionType.Redirect should be fine because we are calling `await instance.acquireTokenSilent(accessTokenConfig(externalTokenResult.account));`
	// const seleniumRunner = useCallback(() => {
	// 	return checkForSeleniumTokensInSessionStorage();
	// }, []);

	return (
		// return (
		// 	<MsalAuthenticationTemplate interactionType={seleniumRunner() ? InteractionType.Silent : InteractionType.Redirect}>
		// 		{isAuthenticated && authorization.accessToken !== null ? <Outlet /> : <LoadingOverlay open={true} />}
		// 	</MsalAuthenticationTemplate>
		// );
		<>{authorization.accessToken ? <Outlet /> : <Navigate to={root} />}</>
	);
}

export default ProtectedRoute;

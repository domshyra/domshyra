// import { MsalAuthenticationTemplate, useIsAuthenticated } from "@azure/msal-react";

import { Navigate, Outlet } from "react-router-dom";

import { root } from "../constants/routes";
import { useAppSelector } from "@redux/hooks";

// import useAuthentication from "@hooks/useAuthentication";

// import { InteractionType } from "@azure/msal-browser";

function ProtectedRoute() {
	// useAuthentication();
	// const isAuthenticated = useIsAuthenticated();
	const authorization = useAppSelector((state) => state.authorization);

	return (
        // <MsalAuthenticationTemplate interactionType={InteractionType.Redirect}>
        // </MsalAuthenticationTemplate>
        <>{authorization.accessToken ? <Outlet /> : <Navigate to={root} />}</>
    );
}

export default ProtectedRoute;

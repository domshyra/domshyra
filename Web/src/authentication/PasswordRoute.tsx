import { Navigate, Outlet } from "react-router-dom";

import { root } from "@constants/routes";
import { useAppSelector } from "@redux/hooks";

function PasswordRoute() {
	const authorization = useAppSelector((state) => state.passwordAuthorization);

	return <>{authorization.showFrontEndPasswordPage ? <Navigate to={root} /> : <Outlet />}</>;
}

export default PasswordRoute;

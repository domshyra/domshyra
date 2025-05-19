import { useLocation, useNavigate, useParams } from "react-router-dom";

import React from "react";

export function withRouter(Component: React.ElementType) {
	function ComponentWithRouterProp(props: any) {
		const location = useLocation();
		const navigate = useNavigate();
		const params = useParams();

		return <Component {...props} router={{ location, navigate, params }} />;
	}

	return ComponentWithRouterProp;
}

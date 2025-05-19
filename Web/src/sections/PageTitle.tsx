import { appName } from "@constants/common";
import { root } from "@constants/routes";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const PageTitle = () => {
	const location = useLocation();
	const defaultTitle = appName;

	useEffect(() => {
		const path = location.pathname;

		if (path === root) {
			document.title = defaultTitle;
			return;
		}

		document.title = getPageTitle(path);

		return () => {
			// Reset title on unmount
			document.title = defaultTitle;
		};
	}, [defaultTitle, location.pathname]);

	return null;
};

// parse the / and - chars out of the path and capitalize the whole text
const getPageTitle = (path: string) => {
	const title = path
		.split("/")
		.filter((p) => p)
		.map((p) => p.replace(/-/g, " ").toUpperCase())
		.join(" - ");
	return title;
};

export default PageTitle;

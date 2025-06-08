import { appName } from "@constants/common";
import { root } from "@constants/routes";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const PageTitle = () => {
	const location = useLocation();
	const defaultTitle = appName;

	useEffect(() => {
		const path = location.state?.title ?? location.pathname;

		if (path === root) {
			document.title = defaultTitle;
			return;
		}

		document.title = getPageTitle(path);

		return () => {
			// Reset title on unmount
			document.title = defaultTitle;
		};
	}, [defaultTitle, location.pathname, location.state?.title]);

	return null;
};

// parse the / and - chars out of the path and capitalize the first letter of each word
// and join them with a space, e.g. /stations/123 -> Stations 123
const getPageTitle = (path: string) => {
	const title = path
		.split("/")
		.filter(Boolean) // Remove empty segments
		.map((segment) => {
			return segment
				.replace(/-/g, " ") // Replace dashes with spaces
				.replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize first letter of each word
		})
		.join(" ");

	return title;
};

export default PageTitle;

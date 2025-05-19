import { baseApiUrl } from "@constants/common";

/* istanbul ignore next */
function isProd() {
	return import.meta.env.MODE !== "development";
}
/* istanbul ignore next */
const isLocalOrDevEnvironment = () => {
	return import.meta.env.MODE === "development" || import.meta.url?.includes("RENAME-TO-DEPLOYED_WEB_URI.com");
};
/* istanbul ignore next */
const isLocal = () => {
	return import.meta.env.MODE === "development";
};
/* istanbul ignore next */
const isTest = () => {
	return import.meta.env.MODE === "test";
};

const blobPath = (url: string) => `${baseApiUrl}Blob?blobPath=${encodeURIComponent(url)}`;
export { blobPath, isLocal, isLocalOrDevEnvironment, isProd, isTest };

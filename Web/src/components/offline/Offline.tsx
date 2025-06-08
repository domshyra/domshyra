import { ReactNode, useCallback, useEffect } from "react";
import { setOffline, setOnline } from "@slices/connectionStatus";
import { useAppDispatch, useAppSelector } from "@redux/hooks";

/**
 * Renders the children components and manages the online/offline status of the application.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {ReactNode} props.children - The child components to be rendered.
 * @returns {JSX.Element} The rendered Offline component.
 */
const Offline = ({ children }: { children: ReactNode }): JSX.Element => {
	const { online, offlineAt, onlineAt } = useAppSelector((state) => state.connectionStatus);
	const dispatch = useAppDispatch();

	const appOnline = useCallback(() => {
		dispatch(setOnline());
	}, [dispatch]);

	const appOffline = useCallback(() => {
		dispatch(setOffline());
	}, [dispatch]);

	// Add event listeners for online and offline events
	useEffect(() => {
		window.addEventListener("online", appOnline);
		window.addEventListener("offline", appOffline);

		return () => {
			window.removeEventListener("online", appOnline);
			window.removeEventListener("offline", appOffline);
		};
	}, [appOffline, appOnline]);

	// Only check for online status on initial load
	useEffect(() => {
		if (navigator.onLine) {
			fetch("https://jsonplaceholder.typicode.com/todos/1")
				.then(() => {
					appOnline();
				})
				.catch(() => {
					appOffline();
				});
		} else {
			appOffline();
		}
	}, [appOffline, appOnline]);

	// Log the online status and the time of the last online and offline events
	useEffect(() => {
		console.table([
			{
				status: online ? "Online" : "Offline",
				"Offline at": offlineAt ? new Date(JSON.parse(offlineAt)).toLocaleString() : "never",
				"Online at": onlineAt ? new Date(JSON.parse(onlineAt)).toLocaleString() : "never",
			},
		]);
	}, [online, offlineAt, onlineAt]);

	return <>{children}</>;
};
export default Offline;

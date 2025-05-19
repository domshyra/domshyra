import { useEffect, useState } from "react";

import { OfflineAlertView } from "./OfflineAlertView";
import { parseRelativeDateTime } from "@tools/datetime";
import { useAppSelector } from "@redux/hooks";

const oneMin = 60000;

/**
 * Renders an alert component to indicate that the app is offline.
 * Displays the duration of the offline status and provides a tooltip with the exact timestamp.
 */
export const OfflineAlert = () => {
	const { online, offlineAt, offlineAtDisplay } = useAppSelector((state) => state.connectionStatus);
	const at = offlineAt ?? JSON.stringify(new Date());

	const [showRelativeTime, setShowRelativeTime] = useState(true);
	const [relativeDisplayTime, setRelativeDisplayTime] = useState<string>("");

	useEffect(() => {
		const interval = setInterval(() => {
			setRelativeDisplayTime(parseRelativeDateTime(at));
		}, oneMin);

		return () => clearInterval(interval);
	}, [at]);

	useEffect(() => {
		if (!online) {
			setRelativeDisplayTime(parseRelativeDateTime(at));
		}
	}, [online, at]);

	return (
		<OfflineAlertView
			online={online}
			offlineAtDisplay={offlineAtDisplay}
			relativeDisplayTime={relativeDisplayTime}
			showRelativeTime={showRelativeTime}
			setShowRelativeTime={setShowRelativeTime}
		/>
	);
};

import { setCvdMode, setDarkMode, setLightMode } from "@slices/themeMode";
import { startTransition, useCallback } from "react";

import SettingsView from "./SettingView";
import { useAppDispatch } from "@redux/hooks";

export default function Settings() {
	const dispatch = useAppDispatch();

	const activateDarkMode = useCallback(() => {
		startTransition(() => {
			dispatch(setDarkMode());
		});
	}, [dispatch]);
	const activateLightMode = useCallback(() => {
		startTransition(() => {
			dispatch(setLightMode());
		});
	}, [dispatch]);
	const activateCvdMode = useCallback(() => {
		startTransition(() => {
			dispatch(setCvdMode());
		});
	}, [dispatch]);
	return <SettingsView activateCvdMode={activateCvdMode} activateDarkMode={activateDarkMode} activateLightMode={activateLightMode} />;
}

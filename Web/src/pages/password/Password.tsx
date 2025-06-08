import { useCallback, useEffect, useState } from "react";

import PasswordView from "./PasswordView";
import { setShowFrontEndPasswordPage } from "@redux/slices/passwordAuthorization";
import { useAppDispatch } from "@redux/hooks";
import { useForm } from "react-hook-form";
import { useSitePasswordPageMutation } from "@redux/services/accountApi";

const Password = () => {
	const [loading, setLoading] = useState(false);
	const [helperText, setHelperText] = useState("");

	const methods = useForm({
		mode: "onBlur",
	});
	const isDirty = methods.formState.isDirty;
	const dispatch = useAppDispatch();

	const setShowFrontEndPasswordPageCallback = useCallback(
		(state: boolean) => {
			dispatch(setShowFrontEndPasswordPage(state));
		},
		[dispatch]
	);
	const handleError = useCallback((error: string) => {
		setHelperText(error);
	}, []);
	const [password] = useSitePasswordPageMutation();

	const loginCallback = useCallback(() => {
		const values = methods.getValues();
		methods.reset(values, { keepValues: true, keepDirty: false });
		setLoading(true);
		const value = values.password;
		password(value)
			.unwrap()
			.then(() => {
				setShowFrontEndPasswordPageCallback(false);
			})
			.catch((error: any) => {
				console.log(error);
				handleError(error.data);
			})
			.finally(() => {
				setLoading(false);
			});
	}, [methods, password, setShowFrontEndPasswordPageCallback, handleError]);

	useEffect(() => {
		if (isDirty) {
			setHelperText("");
		}
	}, [isDirty]);

	return <PasswordView methods={methods} loginCallback={loginCallback} loading={loading} helperText={helperText} />;
};

export default Password;

import { SnackbarMessage, setSnackbar } from "@redux/slices/snackbar";
import { useCallback, useState } from "react";
import { useLoginMutation, useRegisterMutation } from "@redux/services/accountApi";

import { Account } from "@_types/authorization";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import LoginView from "./LoginView";
import { SerializedError } from "@reduxjs/toolkit";
import { isLocal } from "@tools/env";
import { root } from "@constants/routes";
import { setAccessToken } from "@redux/slices/authorization";
import { useAppDispatch } from "@redux/hooks";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
	const [loading, setLoading] = useState(false);
	const [register] = useRegisterMutation();
	const [login] = useLoginMutation();
	const methods = useForm({
		mode: "onBlur",
	});
	const dispatch = useAppDispatch();
	const [helperText, setHelperText] = useState("");

	const setSnackbarMessage = useCallback(
		(message: SnackbarMessage) => {
			dispatch(setSnackbar({ show: true, message: message.message, severity: message.severity }));
		},
		[dispatch]
	);

	const setAccessTokenCallback = useCallback(
		(response: any) => {
			dispatch(setAccessToken(response?.data?.accessToken));
		},
		[dispatch]
	);
	const navigate = useNavigate();

	const handleError = useCallback(
		(error: any) => {
			const errorReason = (Object.values(error.data?.errors)[0] as string) ?? "";
			setHelperText(errorReason);
			setSnackbarMessage({ show: true, message: error.data.title, severity: "error" });
		},
		[setSnackbarMessage]
	);

	const loginCallback = useCallback(() => {
		const values = methods.getValues();
		setLoading(true);

		let data = { email: values.email, password: values.password };

		if (isLocal()) {
			data = { email: "test@trustmebro.com", password: "tesT@123234asd" };
		}

		login(data)
			.then((response: { data?: Account; error?: FetchBaseQueryError | SerializedError }) => {
				console.log(response);
				if (response.data) {
					console.log("Logged in");
					setAccessTokenCallback(response);
					const link = root;
					if (response.error) {
						return handleError(response.error);
					}
					setSnackbarMessage({
						show: true,
						message: "Logged in",
					});
					navigate(link);
				}
			})
			.finally(() => {
				setLoading(false);
			});
	}, [handleError, login, methods, navigate, setAccessTokenCallback, setSnackbarMessage]);

	const registerCallback = useCallback(() => {
		const values = methods.getValues();
		setLoading(true);

		register({ email: values.email, password: values.password })
			.then((response: any) => {
				console.log(response);
				const link = root;
				if (response.error) {
					return handleError(response.error);
				}
				setSnackbarMessage({
					show: true,
					message: "Record created.",
					link: link,
				});
				navigate(link);
			})
			.finally(() => {
				setLoading(false);
			});
	}, [handleError, methods, navigate, register, setSnackbarMessage]);

	return (
		<LoginView
			methods={methods}
			loginCallback={loginCallback}
			registerCallback={registerCallback}
			setAccessTokenCallback={setAccessTokenCallback}
			loading={loading}
			helperText={helperText}
		/>
	);
};

export default LoginPage;

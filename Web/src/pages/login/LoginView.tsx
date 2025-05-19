import { Box, Button, Container, FormHelperText, Typography } from "@mui/material";

import BorderPaper from "@fragments/paper/BorderPaper";
import { FormProvider } from "react-hook-form";
import { PasswordViewProps } from "@pages/password/PasswordView";
import TextField from "@fragments/textField/TextField";
import { isLocal } from "@tools/env";
import { useAppSelector } from "@redux/hooks";

export interface LoginViewProps extends PasswordViewProps {
	registerCallback: () => void;
	setAccessTokenCallback: (response: { accessToken: string; refreshToken?: string } | null) => void;
}

const LoginView = ({ methods, loginCallback, registerCallback, setAccessTokenCallback, loading, helperText }: LoginViewProps) => {
	const authorization = useAppSelector((state) => state.authorization);

	if (authorization.accessToken) {
		return (
			<Container maxWidth="sm">
				<Button onClick={() => setAccessTokenCallback(null)}>Logout</Button>
			</Container>
		);
	}
	return (
		<Container maxWidth="sm">
			<BorderPaper>
				<FormProvider {...methods}>
					<Box component="form" noValidate sx={{ mt: 1 }}>
						<Typography variant="h4" component="div" pb={0}>
							<Box sx={{ textAlign: "center" }}>Login</Box>
						</Typography>
						<TextField name="email" label="email" id="email" rules={{ required: "email is required." }} dataType="string" />
						<TextField
							type="password"
							name="password"
							label="password"
							id="password"
							rules={{ required: "password is required." }}
							dataType="string"
						/>
						{helperText ? <FormHelperText error>{helperText}</FormHelperText> : null}
						<Box sx={{ display: "flex", justifyContent: "space-between", paddingTop: 4 }}>
							<Button variant="outlined" color="success" onClick={registerCallback} disabled={!isLocal()} loading={loading}>
								Register
							</Button>
							<Button variant="outlined" color="success" onClick={loginCallback} loading={loading}>
								Login
							</Button>
						</Box>
					</Box>
					{/* <DevTool control={methods.control} /> */}
				</FormProvider>
			</BorderPaper>
		</Container>
	);
};

export default LoginView;

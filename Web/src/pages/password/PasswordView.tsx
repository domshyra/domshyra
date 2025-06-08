import { Box, Button, Container, FormHelperText, Grid } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";

import TextField from "@fragments/textField/TextField";

export interface PasswordViewProps {
	methods: ReturnType<typeof useForm>;
	loginCallback: () => void;
	loading: boolean;
	helperText: string;
}

const PasswordView: React.FC<PasswordViewProps> = ({ methods, loginCallback, loading, helperText }) => {
	return (
		<Container>
			<FormProvider {...methods}>
				<Box component="form" onSubmit={methods.handleSubmit(loginCallback)} noValidate>
					<Grid container spacing={0} direction="column" alignItems="center" justifyContent="center" sx={{ minHeight: "60vh" }}>
						<Grid size={6}>
							<TextField
								type="password"
								name="password"
								label="password"
								id="password"
								fullWidth
								rules={{ required: "password is required." }}
								dataType="string"
								endAdornment={
									<Button variant="outlined" onClick={loginCallback} loading={loading} type="submit">
										submit
									</Button>
								}
							/>
							<FormHelperText error>{helperText}</FormHelperText>
						</Grid>
					</Grid>
				</Box>
			</FormProvider>
		</Container>
	);
};

export default PasswordView;

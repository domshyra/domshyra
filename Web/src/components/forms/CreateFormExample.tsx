import { FormProvider, useForm } from "react-hook-form";

import { Box } from "@mui/material";
import FormFields from "./FormFeildsExample";
import { SubmitButton } from "@fragments/buttons/SubmitButton";
import { useCallback } from "react";

// import { SnackbarMessage, setSnackbar } from "@slices/snackbar";

// import { useAppDispatch } from "@redux/hooks";
// import { useNavigate } from "react-router-dom";

// import { DevTool } from "@hookform/devtools";

// import { useUpsertRecordMutation } from "@redux/services/recordsApi";

/*
Here is an example of the create form.
It should have a submitButton
It should have onSubmit that does snackbar messages
it should have a form provider that wraps the form, this is useful for textField items since it has a useFormContext that is used to get the form state
It should use redux for the snackbar messages and the online status
It should be tested for the form fields, and the form submission and any other weird logic or edge cases
*/
const CreateForm = () => {
	const methods = useForm({
		mode: "onBlur",
	});

	// const [upsertRecord] = useUpsertRecordMutation();
	// const [isLoadingVisible, setIsLoadingVisible] = useState<boolean>(false);
	// const navigate = useNavigate();
	//Utilized for dispatching redux actions
	// const dispatch = useAppDispatch();

	// const setSnackbarMessage = useSnackbarMessage();
	/**
	 * Save the record
	 * @param {*} form
	 */
	const onFormSubmit = useCallback(
		() => {
			// setIsLoadingVisible(true);
			// upsertRecord({ data: form, isCreateMode: true })
			// 	.then((response) => {
			// 		console.log(response);
			// 		const link = `${route}edit/${response.data.id}`;
			// 		if (response.error) {
			// 			setSnackbarMessage({ show: true, message: "Error saving Record.", isError: true });
			// 			return;
			// 		}
			// 		setSnackbarMessage({
			// 			show: true,
			// 			message: "Record created.",
			// 			link: link,
			// 		});
			// 		navigate(link);
			// 	})
			// 	.catch((error) => {
			// 		console.log(error);
			// 	})
			// 	.finally(() => {
			// 		setIsLoadingVisible(false);
			// 	});
		},
		// [upsertRecord, setSnackbarMessage, navigate]
		[] //todo! remove this
	);

	return (
		<FormProvider {...methods}>
			<Box component="form" onSubmit={methods.handleSubmit(onFormSubmit)} noValidate sx={{ mt: 3 }}>
				<FormFields />
				<SubmitButton
					isCreateMode={true}
					isDirty={methods.formState.isDirty}
					isValid={methods.formState.isValid}
					// isLoadingVisible={isLoadingVisible}
					isLoadingVisible={true}
					lastSaved={null}
				/>
			</Box>
			{/* <DevTool control={methods.control} /> */}
		</FormProvider>
	);
};

export default CreateForm;

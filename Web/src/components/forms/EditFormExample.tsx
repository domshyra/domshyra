import { FormProvider, useForm } from "react-hook-form";

import { Box } from "@mui/material";
import LastSavedText from "./LastSavedText";
import useAutoSave from "@hooks/useAutoSave";
import { useParams } from "react-router-dom";

// import { useEffect, useState } from "react";

// import FormFields from "./FormFeildsExample";

// import { useGetRecordQuery, usePatchRecordMutation } from "@redux/services/recordsApi";

// import { DevTool } from "@hookform/devtools";

/*
Here is an example of the edit form.
It should not have a submitButton, because it uses the autoSave hook
It should not have onSubmit, that is handled by the autoSave hook
it should initialize the form with the data and then set a flag to prevent the form from resetting the data once a mutation is made
it should have a form provider that wraps the form, this is useful for textField items since it has a useFormContext that is used to get the form state
It should not use redux for the snackbar messages and the online status - again handled by autoSave
It should be tested for the form fields, any other weird logic or edge cases
*/

const EditForm = () => {
	const methods = useForm({
		mode: "onBlur",
	});

	const { id } = useParams();
	// const [patchRecord] = usePatchRecordMutation();
	// const { data: record, isLoading } = useGetRecordQuery(id);

	// const [initialRecordLoaded, setInitialRecordLoaded] = useState(false);

	// This is used only for the initial load of the record data. After that we don't want to reset the form data. The hook will modify the form data from there on out.
	// useEffect(() => {
	// 	if (record && !initialRecordLoaded) {
	// 		methods.reset(record, { keepDefaultValues: false, keepDirty: false });
	// 		//This is to prevent the form from resetting data when we patch the record
	// 		setInitialRecordLoaded(true);
	// 	}
	// }, [methods.reset, record, methods, initialRecordLoaded]);

	const { savedAt, failedState } = useAutoSave({
		defaultValues: methods.formState.defaultValues as object,
		getValues: methods.getValues,
		id: id!,
		isDirty: methods.formState.isDirty,
		label: "Record",
		resetField: methods.resetField,
		// rtkQueryMutation: patchRecord,
		rtkQueryMutation: async () => {
			// Implement the mutation logic here
			return Promise.resolve();
		},
	});

	return (
		<FormProvider {...methods}>
			<Box autoComplete="off" component="form" noValidate sx={{ mt: 3 }}>
				{/* <FormFields isLoading={isLoading} /> */}
				{/* <DevTool control={methods.control} /> */}
				<LastSavedText savedAt={savedAt} failedState={failedState} isDirty={methods.formState.isDirty} />
			</Box>
		</FormProvider>
	);
};

export default EditForm;

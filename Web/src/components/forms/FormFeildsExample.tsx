import TextField from "@fragments/textField/TextField";

/**
 * Renders the form fields for the Record component.
 *
 * @param isLoading - Indicates whether the form fields are in a loading state.
 * @returns The rendered form fields.
 */
const FormFields = ({ isLoading }: { isLoading?: boolean }) => {
	return (
		<>
			<TextField name="name" label="name Name" id="name" rules={{ required: "Name is required." }} dataType="string" isLoading={isLoading} />
		</>
	);
};

export default FormFields;

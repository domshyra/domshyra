import { Button, FormHelperText, Stack } from "@mui/material";

import { useAppSelector } from "@redux/hooks";

export type SubmitButtonProps = {
	isCreateMode: boolean;
	isDirty: boolean;
	isValid: boolean;
	lastSaved: Date | null;
	isLoadingVisible: boolean;
};

/**
 * The submit button component.
 *
 * @returns {JSX.Element} The submit button JSX element.
 */
export const SubmitButton = ({ isCreateMode, isDirty, isValid, isLoadingVisible, lastSaved }: SubmitButtonProps) => {
	const formIsModified = isDirty || !isValid;
	const { online, offlineAt } = useAppSelector((state) => state.connectionStatus);
	const offlineAtDate = new Date(JSON.parse(offlineAt ?? JSON.stringify(new Date())));

	const btnText = () => {
		if (!online) {
			return "Offline";
		}
		if (isCreateMode) {
			return "Create";
		}
		return "Save";
	};
	const btnDisabled = () => {
		if (!online) {
			return true;
		}
		if (!isCreateMode && online && offlineAt && formIsModified) {
			//show save button only after we have been offline and the form is dirty
			return true;
		}

		return !isDirty || !isValid;
	};
	const checkDate = lastSaved == null ? true : lastSaved! > offlineAtDate;
	const showButton = (offlineAt && online && formIsModified && checkDate) || isCreateMode;

	if (!isCreateMode && !offlineAt) {
		return null;
	}

	return (
		<>
			<Stack spacing={2}>
				<SubmitButtonHelperText showButton={showButton} />
			</Stack>
			{showButton ? (
				<Button
					color="primary"
					data-testid="submit-form-btn"
					disabled={btnDisabled()}
					id="submit-form-btn"
					loading={isLoadingVisible}
					type="submit"
					variant="contained"
				>
					{btnText()}
				</Button>
			) : null}
		</>
	);
};

const SubmitButtonHelperText = ({ showButton }: { showButton: boolean }) => {
	const { online, offlineAtDisplay, offlineAt } = useAppSelector((state) => state.connectionStatus);
	return (
		<>
			{offlineAt && !online ? <FormHelperText>You have went offline, we cannot auto save.</FormHelperText> : null}
			{showButton ? (
				<FormHelperText>
					You have went back online, we have haven't saved since {offlineAtDisplay}. Please hit save when ready.
				</FormHelperText>
			) : null}
		</>
	);
};

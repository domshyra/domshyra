import * as jsonpatch from "fast-json-patch";

import { AutoSaveRecord, UseAutoSaveProps, mutationSuccess } from "@_types/autosave";
import { SnackbarMessage, setSnackbar } from "@redux/slices/snackbar";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { useCallback, useEffect, useState } from "react";

import { Dictionary } from "../types/common";
import { UseFormResetField } from "react-hook-form";
import { isProd } from "@tools/env";
import { useBeforeUnload } from "react-router-dom";

//2 seconds for local/dev, 5 seconds for deployed
const autoSaveInterval = isProd() ? 5000 : 2000;

//!Note, if you have a rkqMutation that is a changing your object make sure you are also not using a useEffect to update the object via rhf.setValue
/**
 * Used to auto save a record every 10 seconds once methods.formState.isDirty is true and will use the rtkQueryMutation to save the record
 * @remarks Every value in the form needs registered with the useForm hook. In other words methods.getValues should return every value
needing to be saved in the backend.
 * @param {object} defaultValues methods.formState.defaultValues
 * @remarks This doesn't work with rhf objects, there is a bug with rhf.
 */
export default function useAutoSave({ defaultValues, isDirty, getValues, resetField, id, label, rtkQueryMutation }: UseAutoSaveProps) {
	const { online } = useAppSelector((state) => state.connectionStatus);
	const [failedState, setFailedState] = useState(false);
	const dispatch = useAppDispatch();

	const setSnackbarMessage = useCallback(
		(message: SnackbarMessage) => {
			dispatch(setSnackbar({ show: true, message: message.message, severity: message.severity }));
		},
		[dispatch]
	);

	const [shouldAutoSave, setShouldAutoSave] = useState<null | boolean>(null);
	const [savedAt, setSavedAt] = useState<null | Date>(null);

	const handleSave = useCallback((savedTime: Date) => {
		setSavedAt(savedTime);
	}, []);

	const handleMutation = useCallback(
		(response: mutationSuccess | null) => {
			if (response !== null) {
				if (response!.formIsStillDirty !== true) {
					setShouldAutoSave(false); // turn autosave off
				}
				if (response.saveTime) {
					setSnackbarMessage({ show: true, message: `${label} saved at ${response.saveTime}` });
					handleSave(new Date());
				}
			} else {
				setSnackbarMessage({ show: true, message: "There was an error saving. Please try again later.", severity: "error" });
			}
		},
		[handleSave, label, setSnackbarMessage]
	);

	const autoSaveRecordsCallback = useCallback(async () => {
		const response = await autoSaveRecord({
			defaultValues,
			getValues,
			id,
			resetField,
			rtkQueryMutation,
		});
		handleMutation(response);
		if (response === null) {
			setSnackbarMessage({ show: true, message: "Cannot save current page. Please refresh", severity: "error" });
			setFailedState(true);
			setShouldAutoSave(false);
		}
	}, [defaultValues, getValues, handleMutation, id, resetField, rtkQueryMutation, setSnackbarMessage]);

	// if the form gets dirty start saving every 60 seconds
	useEffect(() => {
		if (isDirty && !failedState) {
			const intervalForAutoSave = setInterval(function () {
				setShouldAutoSave(true);
			}, autoSaveInterval);
			return async () => {
				autoSaveRecordsCallback();

				clearInterval(intervalForAutoSave); // clear autosave on dismount
			};
		}
		return () => {};
	}, [autoSaveRecordsCallback, failedState, isDirty]);

	useEffect(() => {
		if (online && shouldAutoSave) {
			autoSaveRecordsCallback();
		}
	}, [shouldAutoSave, online, autoSaveRecordsCallback]);

	//On page refresh send data to the back end
	useBeforeUnload(
		useCallback(async () => {
			if (!failedState) {
				autoSaveRecordsCallback();
			}
		}, [autoSaveRecordsCallback, failedState])
	);

	return { savedAt, failedState };
}

/**
 * Auto saves the record using the rtkQueryMutation
 * @param {*} methods
 * @returns
 */
export async function autoSaveRecord({
	defaultValues,
	getValues,
	id,
	resetField,
	rtkQueryMutation,
}: AutoSaveRecord): Promise<mutationSuccess | null> {
	const beforeSaveValues = defaultValues;
	const valuesToSave = getValues();
	const operations = jsonpatch.compare(beforeSaveValues, valuesToSave);
	if (operations.length === 0) {
		return { formIsStillDirty: false, saveTime: null };
	}

	return rtkQueryMutation({ id: id, operations }).then((response) => {
		if (response && response.data) {
			//Looks at each dirtyFields, touchedFields and defaultValues and resets to new values
			console.log("saved these fields", operations);
			const valuesAfterSave = getValues();
			const formIsStillDirty = resetUpdatedFields(valuesToSave, valuesAfterSave, resetField, operations);
			const saveTime = new Date();
			return { formIsStillDirty, saveTime: saveTime.toLocaleTimeString() };
		} else {
			return null;
		}
	});
}

/**
 * Checks the fields that were saved, keep dirty if any changes happened after the save, otherwise reset the field
 * @param {*} valuesToSave
 * @param {*} resetField
 * @param {Array} operations
 * @returns
 */
export function resetUpdatedFields(
	valuesToSave: object,
	valuesAfterSave: object | Array<unknown>,
	resetField: UseFormResetField<Record<string, unknown>>,
	operations: jsonpatch.Operation[]
) {
	//if the field is different than when we save, keep that one dirty so we don't loose data, notes for example
	const inProgressOperations = jsonpatch.compare(valuesToSave, valuesAfterSave);
	const inProgressFields = inProgressOperations.map((operation: jsonpatch.Operation) => {
		return getFieldNameFromOperation(operation);
	});

	const formIsStillDirty = inProgressFields?.length > 0;
	const possibleFieldsToReset = operations
		.map((operation: jsonpatch.Operation) => {
			if (inProgressFields?.length === 0 || !inProgressFields?.includes(operation.path.substring(1))) {
				return getFieldNameFromOperation(operation);
			}
			return null;
		})
		.filter((field: string | null) => field !== null);

	const uniqueFieldsToRest = [...new Set(possibleFieldsToReset)];
	uniqueFieldsToRest?.forEach((field) => {
		const defaultValue = valuesToSave[field as keyof object];
		resetField(field as string, { defaultValue: defaultValue, keepDirty: false, keepError: true });
	});

	return formIsStillDirty;
}

/**
 * Returns the field name from the operation and removes the / from the beginning of the path
 * if it is a nested field, it will return the parent field name
 * @param {*} operation
 * @returns
 */
function getFieldNameFromOperation(operation: jsonpatch.Operation) {
	const path = operation.path.substring(1);
	if (path.includes("/")) {
		return path.substring(0, path.indexOf("/"));
	}
	return path;
}

/**
 * Returns the operations needed to update the object with the updatedId and updatedValue
 * @param {*} object
 * @param {*} updatedId
 * @param {*} updatedValue
 * @returns
 */
export function getOperationsFromObject(object: Dictionary<string>, updatedId: string, updatedValue: object) {
	//This syntax says if we have a prop of updatedId, then use that as the key,
	//otherwise use an empty object so we call add instead of replace in the backend
	const oldObj = object[updatedId] ? { [updatedId]: object[updatedId] } : {};
	const newObj = { [updatedId]: updatedValue ?? "" };
	const operations = jsonpatch.compare(oldObj, newObj);
	return operations;
}

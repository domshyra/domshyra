import { UseFormResetField } from "react-hook-form";

export type mutationSuccess = {
	formIsStillDirty: boolean;
	saveTime: string | null;
};

export type UseAutoSaveProps = {
	defaultValues: object;
	getValues: () => object;
	id: string;
	isDirty: boolean;
	label: string;
	resetField: UseFormResetField<any>;
	rtkQueryMutation: (data: { id: string; operations: any[] }) => Promise<any>;
};

/**
 * Represents a record used for auto-saving functionality.
 */
export type AutoSaveRecord = {
	defaultValues: object;
	getValues: (payload?: string | string[]) => object;
	id: string;
	resetField: UseFormResetField<any>;
	rtkQueryMutation: (data: { id: string; operations: any[] }) => Promise<any>;
};

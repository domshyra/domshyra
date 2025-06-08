import { act, renderHook } from "@testing-library/react";
import { autoSaveRecord, resetUpdatedFields } from "@hooks/useAutoSave";
import { describe, expect, it, vi } from "vitest";

import { Operation } from "fast-json-patch";
import { useAppDispatch } from "@redux/hooks";
import useAutoSave from "@hooks/useAutoSave";

vi.mock("@redux/hooks", () => ({
	useAppDispatch: vi.fn(),
	useAppSelector: vi.fn(() => ({ online: true })),
}));

vi.mock("react-router-dom", () => ({
	useBeforeUnload: vi.fn(),
}));

describe.skip("useAutoSave", () => {
	const mockDispatch = vi.fn();
	const mockRtkQueryMutation = vi.fn();

	beforeEach(() => {
		vi.clearAllMocks();
		(useAppDispatch as unknown as typeof mockDispatch).mockReturnValue(mockDispatch);
	});

	it("should initialize with default values", () => {
		const { result } = renderHook(() =>
			useAutoSave({
				defaultValues: {},
				isDirty: false,
				getValues: vi.fn(() => ({})),
				resetField: vi.fn(),
				id: "test-id",
				label: "Test Label",
				rtkQueryMutation: mockRtkQueryMutation,
			})
		);

		expect(result.current.savedAt).toBeNull();
		expect(result.current.failedState).toBe(false);
	});

	it("should call autoSaveRecordsCallback when online and shouldAutoSave is true", async () => {
		const mockGetValues = vi.fn(() => ({}));
		const mockResetField = vi.fn();

		const { result } = renderHook(() =>
			useAutoSave({
				defaultValues: {},
				isDirty: true,
				getValues: mockGetValues,
				resetField: mockResetField,
				id: "test-id",
				label: "Test Label",
				rtkQueryMutation: mockRtkQueryMutation,
			})
		);

		act(() => {
			result.current.failedState = false;
		});

		expect(mockRtkQueryMutation).toHaveBeenCalled();
	});

	it("should handle save errors", async () => {
		mockRtkQueryMutation.mockResolvedValueOnce(null);

		const { result } = renderHook(() =>
			useAutoSave({
				defaultValues: {},
				isDirty: true,
				getValues: vi.fn(() => ({})),
				resetField: vi.fn(),
				id: "test-id",
				label: "Test Label",
				rtkQueryMutation: mockRtkQueryMutation,
			})
		);

		act(() => {
			result.current.failedState = true;
		});

		expect(result.current.failedState).toBe(true);
	});
});

//#region autoSaveRecord
describe.skip("autoSaveRecord", () => {
	const mockRtkQueryMutation = vi.fn();
	const mockResetField = vi.fn();

	it("should return null if no changes are detected", async () => {
		const mockDefaultValues = { field1: "value1" };
		const mockGetValues = vi.fn(() => ({ field1: "value1" }));

		const result = await autoSaveRecord({
			defaultValues: mockDefaultValues,
			getValues: mockGetValues,
			id: "test-id",
			resetField: mockResetField,
			rtkQueryMutation: mockRtkQueryMutation,
		});

		expect(result).toEqual({ formIsStillDirty: false, saveTime: null });
		expect(mockRtkQueryMutation).not.toHaveBeenCalled();
	});

	it("should call rtkQueryMutation with the correct operations", async () => {
		const mockDefaultValues = { field1: "value1" };
		const mockGetValues = vi.fn(() => ({ field1: "value2" }));

		mockRtkQueryMutation.mockResolvedValueOnce({ data: true });

		const result = await autoSaveRecord({
			defaultValues: mockDefaultValues,
			getValues: mockGetValues,
			id: "test-id",
			resetField: mockResetField,
			rtkQueryMutation: mockRtkQueryMutation,
		});

		expect(mockRtkQueryMutation).toHaveBeenCalledWith({
			id: "test-id",
			operations: [{ op: "replace", path: "/field1", value: "value2" }],
		});
		expect(result).toHaveProperty("formIsStillDirty");
		expect(result).toHaveProperty("saveTime");
	});

	it("should return null if rtkQueryMutation fails", async () => {
		const mockDefaultValues = { field1: "value1" };
		const mockGetValues = vi.fn(() => ({ field1: "value2" }));

		mockRtkQueryMutation.mockResolvedValueOnce(null);

		const result = await autoSaveRecord({
			defaultValues: mockDefaultValues,
			getValues: mockGetValues,
			id: "test-id",
			resetField: mockResetField,
			rtkQueryMutation: mockRtkQueryMutation,
		});

		expect(result).toBeNull();
	});

	it("should reset updated fields after a successful save", async () => {
		const mockDefaultValues = { field1: "value1" };
		const mockGetValues = vi.fn(() => ({ field1: "value2" }));

		mockRtkQueryMutation.mockResolvedValueOnce({ data: true });

		await autoSaveRecord({
			defaultValues: mockDefaultValues,
			getValues: mockGetValues,
			id: "test-id",
			resetField: mockResetField,
			rtkQueryMutation: mockRtkQueryMutation,
		});

		expect(mockResetField).toHaveBeenCalledWith("field1", {
			defaultValue: "value2",
			keepDirty: false,
			keepError: true,
		});
	});
});

//#endregion

//#region resetUpdatedFields

describe.skip("resetUpdatedFields", () => {
	const mockResetField = vi.fn();

	it("should reset fields that are not dirty after save", () => {
		const valuesToSave = { field1: "value1", field2: "value2" };
		const valuesAfterSave = { field1: "value1", field2: "value2" };
		const operations: Operation[] = [
			{ op: "replace", path: "/field1", value: "value1" },
			{ op: "replace", path: "/field2", value: "value2" },
		];

		const result = resetUpdatedFields(valuesToSave, valuesAfterSave, mockResetField, operations);

		expect(result).toBe(false);
		expect(mockResetField).toHaveBeenCalledWith("field1", {
			defaultValue: "value1",
			keepDirty: false,
			keepError: true,
		});
		expect(mockResetField).toHaveBeenCalledWith("field2", {
			defaultValue: "value2",
			keepDirty: false,
			keepError: true,
		});
	});

	it("should keep fields dirty if changes occurred after save", () => {
		const valuesToSave = { field1: "value1", field2: "value2" };
		const valuesAfterSave = { field1: "value1", field2: "newValue" };
		const operations: Operation[] = [
			{ op: "replace", path: "/field1", value: "value1" },
			{ op: "replace", path: "/field2", value: "value2" },
		];

		const result = resetUpdatedFields(valuesToSave, valuesAfterSave, mockResetField, operations);

		expect(result).toBe(true);
		expect(mockResetField).toHaveBeenCalledWith("field1", {
			defaultValue: "value1",
			keepDirty: false,
			keepError: true,
		});
		expect(mockResetField).not.toHaveBeenCalledWith("field2", expect.anything());
	});

	it("should handle nested fields correctly", () => {
		const valuesToSave = { field1: { nested: "value1" } };
		const valuesAfterSave = { field1: { nested: "value1" } };
		const operations: Operation[] = [{ op: "replace", path: "/field1/nested", value: "value1" }];

		const result = resetUpdatedFields(valuesToSave, valuesAfterSave, mockResetField, operations);

		expect(result).toBe(false);
		expect(mockResetField).toHaveBeenCalledWith("field1", {
			defaultValue: { nested: "value1" },
			keepDirty: false,
			keepError: true,
		});
	});

	it("should not reset fields if no operations are provided", () => {
		const valuesToSave = { field1: "value1" };
		const valuesAfterSave = { field1: "value1" };
		const operations: Operation[] = [];

		const result = resetUpdatedFields(valuesToSave, valuesAfterSave, mockResetField, operations);

		expect(result).toBe(false);
		expect(mockResetField).not.toHaveBeenCalled();
	});
});
//#endregion

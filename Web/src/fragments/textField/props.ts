import { FieldError } from "react-hook-form";
import { TextField as MuiTextField } from "@mui/material";

export type TextFieldSlotProps = {
	style: object;
	maxLength?: number;
	"data-testid": string;
};

export type TextFieldProps = {
	customErrorMessage?: string; //displays when isInvalid is true
	dataType: "number" | "string";
	disabled?: boolean;
	endAdornment?: string | JSX.Element;
	id: string;
	isInvalid?: (error: FieldError | undefined) => boolean;
	isLoading?: boolean;
	label?: string | null;
	maxWidth?: number;
	onTextFieldBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
	onTextFieldChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	rules?: Record<string, unknown>;
	setFocused?: (focused: boolean) => void;
	setHover?: (hover: boolean) => void;
	textAlign?: string;
	variant?: string;
} & React.ComponentProps<typeof MuiTextField>;

export type TextFieldViewProps = {
	customErrorMessage: string;
	endAdornmentElement: () => string | JSX.Element;
	isInvalid: (error: FieldError | undefined) => boolean;
	isNumberOnly: boolean;
	isRequired: () => boolean;
	onTextFieldBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
	onTextFieldChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	setFocused: (focused: boolean) => void;
	setHover: (hover: boolean) => void;
	slotProps: TextFieldSlotProps;
	textFieldStyle: object;
} & TextFieldProps;

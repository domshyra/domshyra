import { TextFieldProps, TextFieldSlotProps } from "./props";

import { InputAdornment } from "@mui/material";
import TextFieldView from "./TextFieldView";

/**
 * Used for all text items, this requires a formContext to be used in the parent component
 * @remarks this is the base for all numeric item/fields
 * @param {*} props
 * @returns
 */
const TextField = ({
	customErrorMessage = "",
	disabled = false,
	endAdornment = "",
	id,
	isInvalid = () => {
		return false;
	},
	isLoading = false,
	label = null,
	maxWidth = 75,
	onTextFieldBlur = () => {},
	onTextFieldChange = () => {},
	rules,
	setFocused = () => {},
	setHover = () => {},
	textAlign = "left",
	dataType,
	...props
}: TextFieldProps) => {
	const slotProps: TextFieldSlotProps = {
		style: { textAlign: textAlign },
		"data-testid": id,
	};

	const isNumberOnly = dataType === "number";

	if (!isNumberOnly) {
		//Add max length to prevent overflow
		slotProps.maxLength = 2000;
	}

	const isRequired = () => {
		if (rules) {
			//React hook forms sometimes has a string in the required object to denote the error message and if something is required.
			//rules.required will not always be a boolean type here. Converting manually.
			return !!rules.required;
		} else {
			return false;
		}
	};

	//can customize more later but lets text be full width if we use min instead of max
	const textFieldStyle = isNumberOnly ? { maxWidth: maxWidth } : { minWidth: maxWidth };

	const endAdornmentElement = () => {
		if (typeof endAdornment === "string") {
			<InputAdornment position="end">{endAdornment}</InputAdornment>;
		}
		return endAdornment;
	};

	return (
		<TextFieldView
			{...props}
			customErrorMessage={customErrorMessage}
			disabled={disabled}
			endAdornmentElement={endAdornmentElement}
			id={id}
			isInvalid={isInvalid}
			isLoading={isLoading}
			isNumberOnly={isNumberOnly}
			isRequired={isRequired}
			label={label}
			onTextFieldBlur={onTextFieldBlur}
			onTextFieldChange={onTextFieldChange}
			setFocused={setFocused}
			setHover={setHover}
			slotProps={slotProps}
			textFieldStyle={textFieldStyle}
			dataType={dataType}
		/>
	);
};

export default TextField;

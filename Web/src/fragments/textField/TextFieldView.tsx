import { Controller, useFormContext } from "react-hook-form";
import { TextField as MuiTextField, Skeleton, Stack, Typography } from "@mui/material";

import React from "react";
import { TextFieldViewProps } from "./props";
import { useTheme } from "@mui/material/styles";

/**
 * Used for all text items, this requires a formContext to be used in the parent component
 * @remarks this is the base for all numeric item/fields
 * @param {*} props
 * @returns
 */
const TextFieldView = (props: TextFieldViewProps) => {
	const {
		customErrorMessage,
		defaultValue,
		disabled,
		endAdornmentElement,
		id,
		isInvalid,
		isLoading,
		isNumberOnly,
		isRequired,
		label,
		onTextFieldBlur,
		onTextFieldChange,
		rules,
		setFocused,
		setHover,
		slotProps,
		textFieldStyle,
	} = props;
	const theme = useTheme();
	const methods = useFormContext();

	if (isLoading) {
		return <Skeleton width={50} />;
	}

	return (
		<Controller
			rules={rules}
			control={methods.control}
			name={id}
			defaultValue={defaultValue ?? ""}
			render={({ field: { onChange, onBlur, ref, value }, fieldState: { error } }) => (
				<>
					<Stack spacing={1} justifyContent="center">
						<MuiTextField
							{...props}
							ref={ref}
							disabled={disabled}
							value={value}
							label={label}
							id={id}
							required={isRequired()}
							name={id}
							variant="standard"
							color="primary"
							inputRef={ref}
							error={error !== undefined || isInvalid(error)}
							slotProps={{
								input: {
									//  The component that renders the input.
									endAdornment: endAdornmentElement(),
									...slotProps?.input,
								},
								htmlInput: {
									["data-testid"]: slotProps?.["data-testid"] ?? "text-field",
									maxLength: slotProps?.maxLength,
									//  The html input element.
									inputMode: isNumberOnly ? "numeric" : "text",
									...slotProps?.htmlInput,
								},
							}}
							style={textFieldStyle}
							onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
								if (isNumberOnly) {
									//Only save safe values. This still works with decimals because the regex
									if (typeof e.target.value === "number" || e.target.value === ".") {
										onChange(e);
										onTextFieldChange(e);
									}
								} else {
									onChange(e);
									onTextFieldChange(e);
								}
							}}
							onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
								setFocused(false);
								onBlur();
								onTextFieldBlur(e);
							}}
							onFocus={() => {
								setFocused(true);
							}}
							onMouseOver={() => {
								setHover(true);
							}}
							onMouseOut={() => {
								setHover(false);
							}}
						/>
						{error?.message ? (
							<Typography
								variant="caption"
								sx={{ color: theme.palette.error.main }}
								textAlign="right"
								pr={1}
								data-testid="error-message"
							>
								{error?.message}
							</Typography>
						) : null}
						{isInvalid(error) ? (
							<Typography variant="caption" sx={{ color: theme.palette.error.main }} textAlign="right">
								{customErrorMessage}
							</Typography>
						) : null}
					</Stack>
				</>
			)}
		/>
	);
};

export default TextFieldView;

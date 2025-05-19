import { Fragment, useCallback, useEffect, useMemo, useState } from "react";

import { Button } from "@mui/material";
import { StyledModalProps } from "./props";
import { StyledModalView } from "./StyledModalView";

// ModalProps is a type that is a subset of StyledModalProps
export type ModalProps = Pick<StyledModalProps, "show" | "action" | "handleClose">;

/**
 * base modal component
 * @remarks when using this component you must pass in the action to be performed when the action button is clicked
 * @remarks when using this component remember to give it a key to force a re-render, this is because the modal will not re-render when the show prop is toggled
 * for example <StyledModal key={show ? "someId" : ""} ... />
 * @param {*} param0
 * @returns
 */

const StyledModal = (props: StyledModalProps) => {
	const {
		show,
		action,
		prompt = "Action",
		actionColor = "primary",
		handleClose,
		closeButtonText = "Close",
		ModalBody = <Fragment />,
		ModalTitle = <Fragment />,
	} = props;
	const [open, setOpen] = useState(show);
	const [loading, setLoading] = useState(false);

	const actionOnClick = useCallback(async () => {
		setLoading(true);
		if (action) await action();
		setLoading(false);
		setOpen(false);
	}, [action]);

	const actionButton = useMemo(() => {
		return (
			<Button type="submit" loading={loading} id="modal-action-btn" color={actionColor} variant="contained" onClick={actionOnClick}>
				{prompt}
			</Button>
		);
	}, [actionColor, actionOnClick, loading, prompt]);

	const close = () => {
		handleClose();
		setOpen(false);
	};

	useEffect(() => {
		if (show) {
			setOpen(true);
		}
	}, [show]);

	return (
		<StyledModalView
			open={open}
			close={close}
			actionButton={actionButton}
			closeButtonText={closeButtonText}
			ModalBody={ModalBody}
			ModalTitle={ModalTitle}
			{...props}
		/>
	);
};

export default StyledModal;

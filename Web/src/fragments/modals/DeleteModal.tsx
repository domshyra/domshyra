import { Alert, AlertTitle, Typography } from "@mui/material";
import StyledModal, { ModalProps } from "./StyledModal";

import { useMemo } from "react";

export interface DeleteModalProps extends ModalProps {
	singleton: string;
}

/**
 * Delete modal
 * @param {*} param0
 * @returns
 */

const DeleteModal = (props: DeleteModalProps) => {
	const { singleton } = props;

	const modalTitle = useMemo(() => {
		return (
			<Alert severity="error" variant="outlined">
				<AlertTitle>Warning!</AlertTitle>
			</Alert>
		);
	}, []);
	const modalBody = useMemo(() => {
		return (
			<>
				<Typography align="center" id="are-you-sure-text">
					Are you sure you want to <strong>delete</strong> this <strong>{singleton}</strong>?
				</Typography>
				<Typography align="center" fontWeight={"bold"} pt={1}>
					All data will be lost
				</Typography>
			</>
		);
	}, [singleton]);

	return <StyledModal {...props} prompt="Delete" actionColor="error" ModalBody={modalBody} ModalTitle={modalTitle} />;
};

export default DeleteModal;

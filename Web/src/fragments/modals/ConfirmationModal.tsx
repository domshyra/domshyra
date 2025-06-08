import StyledModal from "./StyledModal";
import { StyledModalProps } from "./props";

/**
 * Yes or no confirmation modal. ModalBody will be rendered for the body
 * @param {*} param0
 * @returns
 */

const ConfirmationModal = (props: StyledModalProps) => {
	const { ModalBody, ModalTitle } = props;
	return <StyledModal {...props} prompt="Confirm" ModalBody={ModalBody} ModalTitle={ModalTitle} />;
};

export default ConfirmationModal;

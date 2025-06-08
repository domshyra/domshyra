export interface StyledModalProps {
	show: boolean;
	action?: () => Promise<void>;
	prompt?: string;
	actionColor?: "primary" | "secondary" | "error" | "info" | "success" | "warning";
	handleClose: () => void;
	closeButtonText?: string;
	ModalBody?: React.ReactNode;
	ModalTitle?: React.ReactNode;
	// ...other props
}

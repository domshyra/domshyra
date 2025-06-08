import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, useTheme } from "@mui/material";

import { StyledModalProps } from "./props";

interface StyledModalViewProps extends StyledModalProps {
	open: boolean;
	close: () => void;
	actionButton: React.ReactNode;
}
export const StyledModalView = ({ open, close, actionButton, closeButtonText, ModalBody, ModalTitle, ...props }: StyledModalViewProps) => {
	const theme = useTheme();

	return (
		<Dialog open={open} onClose={close} fullWidth={true} {...props}>
			<DialogTitle>{ModalTitle}</DialogTitle>
			<DialogContent sx={{ paddingBottom: 0 }}>{ModalBody}</DialogContent>
			<DialogActions>
				<Grid container justifyContent={"flex-start"}>
					{actionButton}
				</Grid>
				<Grid container justifyContent={"flex-end"}>
					<Button id="modal-close-btn" onClick={close} sx={{ color: theme.palette.text.secondary }}>
						{closeButtonText}
					</Button>
				</Grid>
			</DialogActions>
		</Dialog>
	);
};

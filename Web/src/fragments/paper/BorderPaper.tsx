import { Paper as MuiPaper, useTheme } from "@mui/material";

const BorderPaper = (props: React.ComponentProps<typeof MuiPaper>) => {
	const theme = useTheme();
	return (
		<MuiPaper
			{...props}
			sx={{
				...props.sx,
				border: `1px solid ${theme.palette.background.paperBorder}`,
				padding: 2,
				borderRadius: 4,
			}}
			elevation={3}
		></MuiPaper>
	);
};

export default BorderPaper;

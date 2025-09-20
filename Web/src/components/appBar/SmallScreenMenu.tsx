import AppBarTitle from "@fragments/appBar/AppBarTitle";
import { Box } from "@mui/material";
import DarkModeToggleButton from "@fragments/appBar/DarkModeToggleButton";
import Menu from "@fragments/appBar/Menu";
import { MenuProps } from "@fragments/appBar/props";

const SmallScreenMenu = (props: MenuProps) => {
	const { showHamburgerMenu } = props;

	return (
		<Box
			sx={{
				flexDirection: "row",
				justifyContent: "space-between",
				alignItems: "center",
				alignContent: "center",
				display: { xs: "flex", md: "none" },
				width: "100vw",
				textAlign: "center",
			}}
		>
			<Box>{showHamburgerMenu ? <Menu {...props} /> : null}</Box>
			<Box sx={{ flexGrow: 1 }} />
			<AppBarTitle />
			<Box sx={{ flexGrow: 1 }} />
			<DarkModeToggleButton />
		</Box>
	);
};

export default SmallScreenMenu;

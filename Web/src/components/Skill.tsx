import { Box, Card, Divider, Paper, Typography, useTheme } from "@mui/material";

import { ColorNamePallet } from "@styles/themes/base";
import { Skill as SkillType } from "@pages/skills/data";

declare module "@mui/material/styles" {
	interface Palette {
		colors: ColorNamePallet;
	}
}

const Skill = ({ title, description, icon }: SkillType) => {
	const theme = useTheme();

	return (
		<Card component={Paper} variant="outlined" sx={{ p: 2, mb: 2 }}>
			<Typography
				textAlign="left"
				color={theme.palette.primary.light}
				variant="h6"
				fontWeight={700}
				pb={0}
				mb={-1}
				justifyContent="flex-start"
				alignItems="center"
				display="flex"
			>
				{icon}
				{title}
			</Typography>
			<Divider sx={{ color: "primary.main", pr: 10, mr: 10, pt: 1 }} />
			<Box justifyContent="space-between" alignItems="center" sx={{ px: 1, mt: 1 }}>
				<Typography
					component="span"
					variant="body2"
					textAlign="left"
					dangerouslySetInnerHTML={{ __html: description.join("<br />") }}
					mb={1}
					fontWeight={400}
				/>
			</Box>
		</Card>
	);
};

export default Skill;

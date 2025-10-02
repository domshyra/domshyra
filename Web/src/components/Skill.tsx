import { Box, Card, Divider, Paper, Typography } from "@mui/material";

import { Skill as SkillType } from "@pages/skills/data";

const Skill = ({ title, description, icon }: SkillType) => {
	return (
		<Card component={Paper} variant="outlined" sx={{ p: 2, mb: 2 }}>
			<Typography
				textAlign="left"
				color="primary.light"
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

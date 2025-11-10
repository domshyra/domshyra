import { Box, Card, Divider, Paper, Tooltip, Typography, useTheme } from "@mui/material";
import React, { useMemo } from "react";

import { ColorNamePallet } from "@styles/themes/base";
import { SkillCard as SkillType } from "@pages/skills/data";
import { getTimeSpanDisplayString } from "@tools/datetime";

declare module "@mui/material/styles" {
	interface Palette {
		colors: ColorNamePallet;
	}
}

const Skill = ({ title, description, icon, categories }: SkillType) => {
	const theme = useTheme();

	const categoryElement = useMemo(() => {
		if (!categories || categories.length === 0) return null;
		return (
			<Box sx={{ mt: 1 }}>
				<Typography component="span" variant="body2" textAlign="left" mb={1} fontWeight={400}>
					{categories.map((category, index) => (
						<React.Fragment key={index}>
							<b>{category.title}:</b>{" "}
							{category.skills.map((skill) => (
								<Tooltip
									title={`${getTimeSpanDisplayString(skill.start, skill.end)}${"rating" in skill && skill.rating !== undefined ? ` (${skill.rating})` : ""}`}
									key={skill.title}
								>
									<span>
										{skill.title}

										{skill !== category.skills[category.skills.length - 1] ? ", " : ""}
									</span>
								</Tooltip>
							))}
							<br />
						</React.Fragment>
					))}
				</Typography>
			</Box>
		);
	}, [categories]);

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
				{categoryElement}
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

import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { ProgrammingSkill, categories } from "./data";

import { getTimeLengthInYearsAndMonths } from "@tools/datetime";

type SkillWithYears = ProgrammingSkill & {
	years: number;
};

const SkillsTable = () => {
	const programmingSkills = categories
		.map((category) => {
			return category.skills.map((skill) => ({
				...skill,
				years: getTimeLengthInYearsAndMonths(skill.start, skill.end).years,
			}));
		})
		.flat() as SkillWithYears[];

	//Todo: use a datagrid here instead for better accessibility and features
	return (
		<Box px={3}>
			<Typography pb={2} variant="h6" textAlign="center" sx={{ fontSize: "0.75rem" }}>
				Programming Skills Overview
			</Typography>
			<TableContainer component={Paper} sx={{ borderColor: "divider", borderWidth: 1, borderStyle: "solid" }}>
				<Table size="small">
					<TableHead>
						<TableRow>
							<TableCell>Title</TableCell>
							<TableCell>Level</TableCell>
							<TableCell align="right">Years</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{programmingSkills
							.sort((a, b) => b.years - a.years)
							.map((skill, index) => (
								<TableRow key={index}>
									<TableCell>{skill.title}</TableCell>
									<TableCell>{skill.rating}</TableCell>
									<TableCell align="right">{skill.years}</TableCell>
								</TableRow>
							))}
					</TableBody>
				</Table>
			</TableContainer>
		</Box>
	);
};

export default SkillsTable;

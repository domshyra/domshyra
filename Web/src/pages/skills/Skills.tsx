import { Grid, Typography } from "@mui/material";
import { data, skillsTitle } from "@pages/home/data";

import Skill from "@components/Skill";
import SkillsTable from "./SkillsTable";
import { skillsList } from "./data";

const Skills = () => {
	return (
		<>
			<Typography pb={1} variant="h4" textAlign="center" sx={{ width: "100%" }}>
				{skillsTitle}
			</Typography>
			<Grid size={{ xs: 12, sm: 10, md: 8 }} sx={{ margin: "0 auto", px: { sm: 4, lg: 6 } }}>
				<Typography
					variant="caption"
					color="text.secondary"
					fontWeight={600}
					dangerouslySetInnerHTML={{ __html: data.find((x) => x.title === skillsTitle)?.description || "" }}
				/>
			</Grid>
			<Grid size={{ xs: 12, sm: 10, md: 8 }} sx={{ margin: "0 auto", pb: 1, px: { sm: 4, lg: 6 } }}>
				<Typography variant="caption" color="secondary" fontWeight={400} justifyContent="center" display="flex" fontSize={"0.5rem"}>
					"I've got a particular set of skills"
				</Typography>
			</Grid>
			<Grid container spacing={2}>
				{skillsList.map((skill, index) => (
					<Grid key={index} size={{ md: 6, sm: 8 }}>
						<Skill {...skill} />
					</Grid>
				))}
				<Grid size={{ md: 6, sm: 8 }}>
					<SkillsTable />
				</Grid>
			</Grid>
		</>
	);
};
export default Skills;

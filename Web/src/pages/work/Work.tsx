import { Box, Divider, Grid, Stack, Typography } from "@mui/material";
import { skillsAboutSection, workAboutSection, workHistoryInMy } from "@constants/data";
import { skillsTitle, workHistory } from "@pages/home/data";

import JobTimeline from "@components/jobTimeline/JobTimeline";
import Skill from "@components/Skill";
import SkillsTable from "@pages/skills/SkillsTable";
import { skills } from "@constants/routes";
import { skillsList } from "@pages/skills/data";
import { useNavigate } from "react-router-dom";

const Work = () => {
	const navigate = useNavigate();
	return (
		<Grid container spacing={4} direction="row" alignItems="center" justifyContent="center" sx={{ width: "100%" }} pb={{ md: 4, xs: 1 }} pt={2}>
			<Stack direction="row" sx={{ display: { xs: "block", md: "flex" }, width: "100%", justifyContent: "space-between" }} spacing={1}>
				<Grid size={{ xs: 12, md: 6 }}>
					<Typography pb={2} variant="h4" color="primary" textAlign="center" sx={{ cursor: "pointer" }} onClick={() => navigate("history")}>
						{workHistory}
					</Typography>
					<Divider sx={{ mb: 2 }} />

					<Typography
						textAlign="center"
						variant="caption"
						fontWeight={400}
						dangerouslySetInnerHTML={{ __html: workAboutSection + workHistoryInMy }}
						px={4}
						pb={2}
					/>
					<Divider sx={{ mt: 2, mb: 3 }} />
					<Box mx={2}>
						<JobTimeline />
					</Box>
				</Grid>
				<Divider orientation="vertical" flexItem sx={{ display: { xs: "none", md: "block" } }} />
				<Grid size={{ xs: 12, md: 6 }}>
					<Box px={4} mx={1}>
						<Typography
							pb={2}
							color="primary"
							variant="h4"
							textAlign="center"
							sx={{ cursor: "pointer" }}
							onClick={() => navigate(skills)}
						>
							{skillsTitle}
						</Typography>
						<Divider sx={{ mb: 2 }} />
						<Typography
							textAlign="center"
							variant="caption"
							px={4}
							fontWeight={400}
							dangerouslySetInnerHTML={{ __html: skillsAboutSection }}
						/>
						<Divider sx={{ mt: 2, mb: 3 }} />

						<Box mx={4}>
							{skillsList.map((skill, index) => (
								<Skill key={index} {...skill} />
							))}
							<SkillsTable />
						</Box>
					</Box>
				</Grid>
			</Stack>
		</Grid>
	);
};

export default Work;

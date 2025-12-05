import { Box, Grid, ListItem, ListItemButton, ListItemIcon, ListItemText, SvgIcon } from "@mui/material";

import { socialList } from "@constants/common";

export type Social = {
	label: string;
	style: {
		backgroundColor: string;
		color: string;
	};
	svg: string;
	url: string;
};

const SocialButtons = () => {
	return (
		<>
			{socialList
				.sort((a, b) => a.label.localeCompare(b.label))
				.map((button, index) => (
					<SocialButton key={index} label={button.label} style={button.style} svg={button.svg} url={button.url} />
				))}
			<Box sx={{ flexGrow: 1 }} />
		</>
	);
};

const SocialButton = (props: Social) => {
	const { label, style, svg, url } = props;
	return (
		<ListItem key={label}>
			<Grid container sx={{ width: "100%" }}>
				<ListItemButton
					aria-label={label}
					style={style}
					href={url}
					target="_blank"
					rel="noopener noreferrer"
					sx={{ paddingTop: 0.5, paddingBottom: 0.5, paddingRight: 0.5, paddingLeft: 0.5 }}
				>
					<Box
						sx={{
							flexDirection: "row",
							justifyContent: "center",
							alignItems: "center",
							display: "flex",
							width: "100%",
						}}
					>
						<Box sx={{ flexGrow: 1 }} />
						<Box
							sx={{
								flexDirection: "row",
								justifyContent: "center",
								alignItems: "center",
								display: "flex",
							}}
						>
							<ListItemIcon style={style} sx={{ justifyContent: "left", flexShrink: 0, width: "2rem", minWidth: 0 }}>
								<SvgIcon sx={{ pb: 0.5, fontSize: "1.75rem", mr: 1 }}>
									<svg
										aria-hidden="true"
										data-prefix="fab"
										data-icon="github-alt"
										role="img"
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 550 550"
									>
										<path fill="currentColor" d={svg} />
									</svg>
								</SvgIcon>
							</ListItemIcon>

							<ListItemText sx={{ flexShrink: 0, px: 1 }}>{label}</ListItemText>
						</Box>
						<Box sx={{ flexGrow: 1 }} />
					</Box>
				</ListItemButton>
			</Grid>
		</ListItem>
	);
};

export default SocialButtons;

import { Box, IconButton, SvgIcon } from "@mui/material";
import { githubAccountUrl, githubSvgIcon, linkedInAccountUrl, linkedInSvgIcon } from "@constants/common";

const SocialMenuIcons = () => {
	return (
		<>
			<Box sx={{ flexGrow: 1 }} />
			<IconButton href={githubAccountUrl} aria-label="github" color="inherit" target="_blank">
				<SvgIcon sx={{ fontSize: "1rem" }}>
					<svg
						aria-hidden="true"
						data-prefix="fab"
						data-icon="github-alt"
						role="img"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 550 550"
					>
						<path fill="currentColor" d={githubSvgIcon} />
					</svg>
				</SvgIcon>
			</IconButton>
			<IconButton href={linkedInAccountUrl} aria-label="linkedin" color="inherit" target="_blank">
				<SvgIcon sx={{ fontSize: "1rem" }}>
					<svg
						aria-hidden="true"
						data-prefix="fab"
						data-icon="linkedin"
						role="img"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 550 550"
					>
						<path fill="currentColor" d={linkedInSvgIcon} />
					</svg>
				</SvgIcon>
			</IconButton>
		</>
	);
};

export default SocialMenuIcons;

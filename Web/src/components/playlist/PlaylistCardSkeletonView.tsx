import { Box, Button, Skeleton, Tooltip } from "@mui/material";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import Typography from "@mui/material/Typography";

const PlaylistCardSkeleton = () => {
	const width = 250;
	const height = 200;
	return (
		<Card sx={{ display: "flex", maxWidth: width, minHeight: height }} className="Cardbk">
			<Box sx={{ display: "flex", flexDirection: "column" }}>
				<CardContent sx={{ flex: "1 0 auto", width: width }}>
					<Typography sx={{ display: { xs: "none", md: "block" }, cursor: "pointer" }} component="div" variant="h6" color="primary">
						<Skeleton width="30%" />
					</Typography>
					<Typography sx={{ display: { xs: "block", md: "none" } }} component="div" variant="h6" color="text.secondary.light">
						<Skeleton width="30%" />
					</Typography>
					<Typography variant="subtitle2" color="text.secondary" component="div" gutterBottom>
						<Skeleton width="70%" />
					</Typography>
					<Typography sx={{ display: { xs: "block", md: "none" } }} component="div" variant="caption" color="text.secondary" align="center">
						<Skeleton width="50%" height={20} />
					</Typography>
					<Typography
						sx={{ display: { xs: "block", md: "none" } }}
						component="div"
						variant="caption"
						color="text.secondary.light"
						align="center"
					>
						<Skeleton width="40%" />
					</Typography>
				</CardContent>
				<Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center", pl: 1, maxWidth: width }}>
					<Tooltip title="loading..." placement="bottom-end" arrow>
						<Button aria-label="genre" color="secondary" size="small" startIcon={<MusicNoteIcon />}>
							Genre
						</Button>
					</Tooltip>
					<Typography sx={{ flex: "1 0 auto" }}>{/*left blank for spacing*/}</Typography>
					<Typography variant="caption" color="text.secondary.light" noWrap align="right">
						<Skeleton width="30%" />
					</Typography>
				</Box>
			</Box>

			<Skeleton variant="rectangular" width={200} height={200} />
		</Card>
	);
};

export default PlaylistCardSkeleton;

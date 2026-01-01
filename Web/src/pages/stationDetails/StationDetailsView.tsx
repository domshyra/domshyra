import { Button, Grid, Stack } from "@mui/material";

import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import PlaylistCard from "@components/playlist/PlaylistCard";
import { playlist } from "@_types/playlist";
import { stations } from "@constants/routes";
import { useNavigate } from "react-router-dom";

const PlaylistCardDetailsView = ({ title, imageURL, description, genre, trackCount, followerCount, playlistId }: playlist) => {
	const nav = useNavigate();

	return (
		<Grid container justifyContent="center" alignContent="center" pb={4} sx={{ width: "100%" }}>
			<Stack>
				<Button onClick={() => nav(stations)} variant="text" startIcon={<ArrowBackIosIcon />}>
					Back to stations
				</Button>
				<Grid container justifyContent="center">
					<PlaylistCard
						title={title}
						imageURL={imageURL}
						description={description}
						genre={genre}
						trackCount={trackCount}
						followerCount={followerCount}
						playlistId={playlistId}
						isDetailsPage={true}
					/>
				</Grid>
			</Stack>
		</Grid>
	);
};

export default PlaylistCardDetailsView;

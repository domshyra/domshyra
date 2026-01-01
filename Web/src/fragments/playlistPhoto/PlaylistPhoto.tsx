import AspectRatio from "@mui/joy/AspectRatio";
import CardMedia from "@mui/material/CardMedia";
import ImageIcon from "@mui/icons-material/Image";
import { useGetPlaylistQuery } from "@redux/services/spotifyApi";

type PlaylistPhotoProps = {
	playlistId: string;
};

const PlaylistPhoto = ({ playlistId }: PlaylistPhotoProps) => {
	const { data, isLoading, isFetching } = useGetPlaylistQuery(playlistId);
	const { imageURL, title } = data || {};
	return (
		<CardMedia>
			{isLoading || isFetching ? (
				<AspectRatio sx={{ width: "100%" }}>
					<div>
						<ImageIcon sx={{ fontSize: "3rem", opacity: 0.2 }} />
					</div>
				</AspectRatio>
			) : (
				<>
					<AspectRatio ratio="1/1" objectFit="cover" sx={{ overflow: "hidden", width: "100%" }}>
						<img src={imageURL} alt={`${title} image`} />
					</AspectRatio>
				</>
			)}
		</CardMedia>
	);
};

export default PlaylistPhoto;

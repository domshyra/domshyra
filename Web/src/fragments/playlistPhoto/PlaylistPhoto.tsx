import AspectRatio from "@mui/joy/AspectRatio";
import CardMedia from "@mui/material/CardMedia";
import { Skeleton } from "@mui/material";

type PlaylistPhotoProps = {
	imageURL: string | undefined;
	title: string | undefined;
	cardWidth: number;
	loading?: boolean;
};

export const PlaylistPhoto = ({ cardWidth, imageURL, title, loading }: PlaylistPhotoProps) => {
	return (
		<CardMedia sx={{ width: cardWidth }}>
			{loading ? (
				<Skeleton variant="rectangular" height="75%" />
			) : (
				<AspectRatio ratio="4/3" objectFit="contain">
					<img src={imageURL} alt={`${title} image`} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
				</AspectRatio>
			)}
		</CardMedia>
	);
};

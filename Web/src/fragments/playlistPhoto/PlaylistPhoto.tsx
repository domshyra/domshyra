import AspectRatio from "@mui/joy/AspectRatio";
import CardMedia from "@mui/material/CardMedia";

type PlaylistPhotoProps = {
	imageURL: string | undefined;
	title: string | undefined;
	cardWidth: number;
};

export const PlaylistPhoto = ({ cardWidth, imageURL, title }: PlaylistPhotoProps) => {
	return (
		<CardMedia sx={{ width: cardWidth }}>
			<AspectRatio ratio="4/3" objectFit="contain">
				<img src={imageURL} alt={`${title} image`} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
			</AspectRatio>
		</CardMedia>
	);
};

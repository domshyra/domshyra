import AspectRatio from "@mui/joy/AspectRatio";
import CardMedia from "@mui/material/CardMedia";
import ImageIcon from "@mui/icons-material/Image";

type PlaylistPhotoProps = {
	imageURL: string | undefined;
	title: string | undefined;
	loading?: boolean;
};

const PlaylistPhoto = ({ imageURL, title, loading }: PlaylistPhotoProps) => {
	return (
		<CardMedia>
			{loading ? (
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

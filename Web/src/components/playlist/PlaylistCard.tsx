import PlaylistCardView from "./PlaylistCardView";
import { playlist } from "@_types/playlist";

type PlaylistCardProps = playlist & {
	loading?: boolean;
};

const PlaylistCard = (props: PlaylistCardProps) => {
	const sectionWidth = 215;
	const cardWidth = sectionWidth * 2;
	return <PlaylistCardView {...props} sectionWidth={sectionWidth} cardWidth={cardWidth} />;
};

export default PlaylistCard;

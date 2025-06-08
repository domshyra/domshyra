import PlaylistCardView from "./PlaylistCardView";
import { playlist } from "@_types/playlist";

const PlaylistCard = (props: playlist) => {
		const sectionWidth = 215;
		const cardWidth = sectionWidth * 2;
		return <PlaylistCardView {...props} sectionWidth={sectionWidth} cardWidth={cardWidth} />;
};

export default PlaylistCard;

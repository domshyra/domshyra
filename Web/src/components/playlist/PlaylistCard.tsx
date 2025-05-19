import PlaylistCardView from "./PlaylistCardView";
import { playlist } from "@_types/playlist";

const PlaylistCard = (props: playlist) => {
	return <PlaylistCardView {...props} />;
};

export default PlaylistCard;

import PlaylistCardDetails from "./PlaylistCardDetails";
import { useGetPlaylistQuery } from "@redux/services/spotifyApi";
import { useParams } from "react-router-dom";

const PlaylistDetails = () => {
	const { playlistId } = useParams<{ playlistId: string }>();
	if (!playlistId) throw Error("Playlist id not found");

	const { data: playlistDetails } = useGetPlaylistQuery(playlistId);

	return <PlaylistCardDetails {...playlistDetails} playlistId={playlistId} />;
};

export default PlaylistDetails;

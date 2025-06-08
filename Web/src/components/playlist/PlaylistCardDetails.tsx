import PlaylistCardDetailsView from "./PlaylistCardDetailsView";
import { useEffect } from "react";
import { useGetPlaylistQuery } from "@redux/services/spotifyApi";
import { useParams } from "react-router-dom";

const PlaylistDetails = () => {
	const { id: playlistId } = useParams<{ id: string }>();
	if (!playlistId) throw Error("Playlist id not found");

	const { data: playlistDetails, error } = useGetPlaylistQuery(playlistId);

	useEffect(() => {
		if (error) {
			if ("data" in error) {
				console.error("Error fetching playlist details:", error.data);
			} else {
				console.error("Error fetching playlist details:", error);
			}
		}
	}, [error]);

	return <PlaylistCardDetailsView {...playlistDetails} playlistId={playlistId} />;
};

export default PlaylistDetails;

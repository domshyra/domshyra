import { useEffect, useState } from "react";

import PlaylistCardDetails from "./PlaylistCardDetails";
import { spotifyApi } from "../redux/services/spotifyApi";
import { useGetRatingQuery } from "../redux/services/playlistRatingApi";
import { useParams } from "react-router-dom";

const PlaylistDetails = () => {
    
	const { spotifyId } = useParams();
	if (!spotifyId) throw Error("Playlist id not found");

    //Here we are using the useQuery hook from the generated api because we don't know if we've loaded the playlist yet from the index page
	const { data: playlists, isLoading: playlistsIsLoading } = spotifyApi.endpoints.getPlaylists.useQuery();

	const { data: rating, isLoading: ratingIsLoading } = useGetRatingQuery(spotifyId);

    const [playlist, setPlaylist] = useState(null)

    useEffect(() => {
        if (!playlistsIsLoading) {
            const spotifyPlaylist = playlists.find((playlist) => playlist.spotifyId === spotifyId);
            setPlaylist({...spotifyPlaylist})
        }
      return () => {
        
      }
    }, [playlists, playlistsIsLoading, spotifyId])
    
	return <PlaylistCardDetails {...playlist} ratingIsLoading={ratingIsLoading} playlistRating={rating} spotifyId={spotifyId} />;
};
export default PlaylistDetails;
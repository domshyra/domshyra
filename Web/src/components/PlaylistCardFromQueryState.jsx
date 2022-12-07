import * as React from "react";

import PlaylistCard from "./PlaylistCard";
import { PropTypes } from "prop-types";
import { playlistRatingApi } from "../redux/services/playlistRatingApi";
import { useEffect } from "react";
import { useState } from "react";

const PlaylistCardFromQueryState = (props) => {
	const { spotifyId } = props;
	const [playlistRating, setPlaylistRating] = useState(null);
	
	//*This is the way
	const { data: ratings, isLoading: ratingIsLoading } = playlistRatingApi.endpoints.getRatings.useQueryState();

	useEffect(() => {
		console.log(ratings);
		if (!ratingIsLoading) {
			const rating = ratings.find((rating) => rating.spotifyId === spotifyId);
			setPlaylistRating(rating);
		}
	}, [ratings, ratingIsLoading, spotifyId]);

	return <PlaylistCard {...props} playlistRating={playlistRating} ratingIsLoading={ratingIsLoading} />;
};
PlaylistCardFromQueryState.propType = {
	title: PropTypes.string,
	anchorId: PropTypes.string,
	description: PropTypes.string,
	genre: PropTypes.string,
	spotifyMusicLink: PropTypes.string,
	imageURL: PropTypes.string,
	spotifyId: PropTypes.string,
	trackAndFollowerText: PropTypes.string,
};

export default PlaylistCardFromQueryState;

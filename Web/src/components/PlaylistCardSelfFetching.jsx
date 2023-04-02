import * as React from "react";

import PlaylistCard from "./PlaylistCard";
import { PropTypes } from "prop-types";
import { useGetRatingQuery } from "../redux/services/playlistRatingApi";

const PlaylistCardSelfFetching = (props) => {

	//? This is a way to get this to work on a record by record bases, but lets pull from the cache instead.
	const {data: playlistRating, isLoading: ratingIsLoading} = useGetRatingQuery(props.playlistId);

	return (
		<PlaylistCard {...props} playlistRating={playlistRating} ratingIsLoading={ratingIsLoading} />
	);
};
PlaylistCardSelfFetching.propType = {
	title: PropTypes.string,
	anchorId: PropTypes.string,
	description: PropTypes.string,
	genre: PropTypes.string,
	spotifyMusicLink: PropTypes.string,
	imageURL: PropTypes.string,
	playlistId: PropTypes.string,
	trackAndFollowerText: PropTypes.string,
};

export default PlaylistCardSelfFetching;

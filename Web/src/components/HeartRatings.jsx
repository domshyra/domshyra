import { IconButton, Rating, Skeleton } from "@mui/material";
import { useAddRatingMutation, useDeleteRatingMutation, useUpdateRatingMutation } from "../redux/services/playlistRatingApi";

import { Box } from "@mui/system";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import HeartBrokenIcon from "@mui/icons-material/HeartBroken";
import { PropTypes } from "prop-types";
import { styled } from "@mui/material/styles";
import { useState } from "react";

const StyledRating = styled(Rating)({
	"& .MuiRating-iconFilled": {
		color: "#ff6d75",
	},
	"& .MuiRating-iconHover": {
		color: "#ff3d47",
	},
});

const HeartRatings = ({ title, rating, playlistId, ratingId }) => {
	const [value, setValue] = useState(rating);

	const [updateRating, { isLoading: isUpdating }] = useUpdateRatingMutation();
	const [addRating, { isLoading: isAdding }] = useAddRatingMutation();
	const [deleteRating] = useDeleteRatingMutation();

	function doChange(event, rating) {
		if (!ratingId) {
			// create a new rating
			addRating({ playlistId, rating })
				.then((result) => {
					// handle the success!
					console.log("Adding rating", result);
				})
				.catch((error) => console.error("Adding Error", error));
		} else {
			// update the rating
			updateRating({ playlistId, rating, id: ratingId })
				.then((result) => {
					// handle the success!
					console.log("Updating rating", result);
				})
				.catch((error) => console.error("Updating Error", error));
		}
		setValue(rating);
	}

	return (
		<Box
			sx={{
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			<StyledRating
				name={`${title}-rating`}
				defaultValue={0}
				value={value}
				size="small"
				icon={<FavoriteIcon fontSize="inherit" />}
				emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
				onChange={(e, value) => doChange(e, value)}
			/>
			<IconButton
				disabled={isAdding || isUpdating || !ratingId}
				size="small"
				onClick={() =>
					deleteRating({ id: ratingId })
						.then((result) => {
							// handle the success!
							console.log("deleting rating", result);
							setValue(0);
						})
						.catch((error) => console.error("Delete Error", error))
				}
				edge="end"
				sx={{ ml: 1 }}
			>
				<HeartBrokenIcon sx={{ width: 18, height: 18 }} />
			</IconButton>
		</Box>
	);
};
HeartRatings.propType = {
	title: PropTypes.string.isRequired,
	playlistId: PropTypes.string.isRequired,
};

function renderHeart(ratingIsLoading, title, playlistRating, playlistId) {
	return () => {
		if (process.env.NODE_ENV !== 'development') {
			return null;
		}

		if (!ratingIsLoading) {
			return (
				<HeartRatings title={title} rating={playlistRating?.rating ?? 0} playlistId={playlistId} ratingId={playlistRating?.id} />
			);
		}
		return (
			<Skeleton variant="rectangular" width={100} height={20} />
		);
	};
}
export default HeartRatings;
export { HeartRatings, renderHeart}
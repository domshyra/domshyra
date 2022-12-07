import { useAddRatingMutation, useUpdateRatingMutation } from "../redux/services/playlistRatingApi";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { PropTypes } from "prop-types";
import { Rating } from "@mui/material";
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

const HeartRatings = ({ title, rating, spotifyId, ratingId }) => {
	const [value, setValue] = useState(rating)
	
	const [updateRating, { isLoading: isUpdating }] = useUpdateRatingMutation()
	const [addRating, { isLoading: isAdding }] = useAddRatingMutation()

	function doChange(event, rating) {
		if (!ratingId) {
			// create a new rating
			addRating({ spotifyId, rating })
              .then((result) => {
                // handle the success!
                console.log('Adding rating', result)
              })
              .catch((error) => console.error('Adding Error', error))
		} else {
			// update the rating
			updateRating({ spotifyId, rating, id: ratingId, })
			.then((result) => {
			  // handle the success!
			  console.log('Updating rating', result)
			})
			.catch((error) => console.error('Updating Error', error))
		}
		setValue(rating);
	}

	return (
		<StyledRating
			name={`${title}-rating`}
			defaultValue={0}
			value={value}
			size="small"
			icon={<FavoriteIcon fontSize="inherit" />}
			emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
			onChange={(e, value) => doChange(e, value)}
		/>
	);
};
HeartRatings.propType = {
	title: PropTypes.string.isRequired,
	spotifyId: PropTypes.string.isRequired,
};
export default HeartRatings;

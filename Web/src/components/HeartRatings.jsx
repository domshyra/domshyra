import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Rating } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledRating = styled(Rating)({
	"& .MuiRating-iconFilled": {
		color: "#ff6d75",
	},
	"& .MuiRating-iconHover": {
		color: "#ff3d47",
	},
});

const HeartRatings = ({ title, rating }) => {
	return (
		<StyledRating
			name={`${title}-rating`}
			defaultValue={0}
			value={rating}
			size="small"
			icon={<FavoriteIcon fontSize="inherit" />}
			emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
		/>
	);
};

export default HeartRatings;

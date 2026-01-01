import { Box, Button, Skeleton, Stack, Tooltip } from "@mui/material";
import { useEffect, useRef, useState } from "react";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import { PlaylistCardProps } from "./PlaylistCardProps";
import PlaylistPhoto from "@fragments/playlistPhoto/PlaylistPhoto";
import SpotifyLink from "@fragments/spotify/SpotifyLink";
import Typography from "@mui/material/Typography";
import { stations } from "@constants/routes";
import { useNavigate } from "react-router-dom";

const PlaylistCard = ({
	title,
	imageURL,
	description,
	genre,
	trackAndFollowerText,
	playlistId,
	loading,
	trackCount,
	followerCount,
	isDetailsPage,
}: PlaylistCardProps) => {
	const sectionWidth = 215;
	const cardWidth = sectionWidth * 2;
	const nav = useNavigate();
	const [contentHeight, setContentHeight] = useState<number | null>(null);
	const footerRef = useRef<HTMLDivElement>(null);
	const cardRef = useRef<HTMLDivElement>(null);
	const photoRef = useRef<HTMLDivElement>(null);
	const trackCountFollowerCountText = trackAndFollowerText
		? trackAndFollowerText
		: loading
			? ""
			: `${trackCount ?? 0} tracks${followerCount ? `, ${followerCount} followers` : ""}`;

	const photoHeightAfterLoad = photoRef.current?.offsetHeight ?? 0;

	useEffect(() => {
		if (footerRef.current && cardRef.current && photoHeightAfterLoad) {
			const footerHeight = footerRef.current.offsetHeight;
			const cardHeight = cardRef.current.offsetHeight;
			setContentHeight(cardHeight - footerHeight);
		}
	}, [footerRef, cardRef, photoHeightAfterLoad]);

	return (
		<Card sx={{ width: cardWidth, minHeight: 200 }} className="Cardbk" ref={cardRef}>
			<Stack direction={{ xs: "column", md: isDetailsPage ? "column" : "row" }} sx={{ height: contentHeight ? contentHeight : "auto" }}>
				<Box sx={{ display: "flex", flexDirection: "column", width: { xs: "100%", md: isDetailsPage ? "100%" : "50%" } }}>
					<CardContent sx={{ flex: "1 0 auto" }}>
						<Typography
							sx={{ cursor: "pointer" }}
							component="div"
							variant="h5"
							color="primary"
							onClick={() => nav(`${stations}/${playlistId}`, { state: { title } })} // Navigate to playlist details
						>
							{loading ? <Skeleton /> : title}
						</Typography>
						<Typography variant="subtitle2" color="text.secondary" component="div">
							{loading ? <Skeleton width="100%" /> : description}
						</Typography>
						<Typography component="div" variant="caption" color="text.secondary" fontWeight="light" flexWrap="wrap">
							{loading ? <Skeleton /> : genre}
						</Typography>
					</CardContent>
				</Box>
				<Box sx={{ display: "block", width: { xs: "100%", md: isDetailsPage ? "100%" : "50%" } }}>
					<PlaylistPhoto imageURL={imageURL} title={title} loading={loading} />
				</Box>
			</Stack>
			<Box sx={{ display: "flex", flexDirection: "column" }} ref={footerRef}>
				<Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center", justifyContent: "space-between", px: 1, width: "100%" }}>
					<Tooltip title={genre} placement="bottom-start" arrow>
						<Button aria-label="genre" color="secondary" size="small" startIcon={<MusicNoteIcon />}>
							Genre
						</Button>
					</Tooltip>
					<Typography variant="caption" color="text.secondary.light" noWrap align="right">
						{loading ? <Skeleton width={25} /> : trackCountFollowerCountText}
					</Typography>
					<SpotifyLink playlistId={playlistId} loading={loading ?? false} />
				</Box>
				<Box sx={{ display: { xs: "block", md: "none" }, alignItems: "center", width: "100%" }}>
					<Box
						sx={{
							display: "flex",
							alignItems: "center",
							justifyContent: "space-between",
							pl: 1,
							pr: 2,
							width: "100%",
						}}
					>
						<Typography variant="caption" color="text.secondary.light" noWrap align="left">
							{loading ? <Skeleton width={25} /> : trackCountFollowerCountText}
						</Typography>
						<SpotifyLink playlistId={playlistId} loading={loading ?? false} />
					</Box>
				</Box>
			</Box>
		</Card>
	);
};

export default PlaylistCard;

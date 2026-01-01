export type PlaylistCardProps = {
	anchorId?: string;
	description?: string;
	genre?: string;
	imageURL?: string;
	playlistId: string;
	spotifyMusicLink?: string;
	title?: string;
	trackAndFollowerText?: string;
	trackCount?: number;
	followerCount?: number;
	loading?: boolean;
	isDetailsPage?: boolean;
};

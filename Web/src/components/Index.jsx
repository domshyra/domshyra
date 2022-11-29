import React, { useEffect, useState } from "react";

import { useGetPlaylistsQuery } from "../redux/services/spotifyApi";

const Index = () => {

	const { data, isLoading } = useGetPlaylistsQuery();
	const [playlists, setPlaylists] = useState([])

	  useEffect(() => {
			if (!isLoading && data) {
				setPlaylists(data);
			}
		}, [data, isLoading]);

	const rows = (data) => {
		if (!data) {
			return null;
		}
		return data.map((item) => (
			<tr key={item.spotifyId}>
				<td>{item.title}</td>
				<td>{item.description}</td>
				<td>{item.genre}</td>
				<td>{item.trackAndFollowerText}</td>
			</tr>
		));
	};

	return (
		<div>
			<table className="table table-hover">
				<thead>
					<tr>
						<th>Title</th>
						<th>Description</th>
						<th>Genre</th>
						<th>Track count</th>
					</tr>
				</thead>
				<tbody>
					{rows(playlists)}
				</tbody>
			</table>
		</div>
	);
};

export default Index;

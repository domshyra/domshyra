import React, { useEffect, useState } from "react";

import Config from "../config";
import useFetch from "../hooks/useFetch";

const Index = () => {
	// const { data, loading, error } = useFetch("spotify", []);
	const [displayRows, setDisplayRows] = useState(null)
	const [playlists, setPlaylists] = useState([])

	// useEffect(() => {
	// 	console.log(data);
	// 	if (!loading && data) {
	// 		setDisplayRows(rows(data));
	// 	}
	// }, [data, loading]);

	  useEffect(() => {
			const fetchPlaylists = async () => {
				const rsp = await fetch(`${Config.baseApiUrl}spotify`);
				const playlists = await rsp.json();
				setPlaylists(playlists);
			};
			fetchPlaylists();
		}, []);

	const rows = (data) => {
		if (!data) {
			return null;
		}
		debugger
		return data.map((item) => (
			<tr key={item.spotifyId}>
				<td>{item.title}</td>
				<td>{item.description}</td>
				<td>{item.genre}</td>
				<td>{item.trackAndFollowerText}</td>
			</tr>
		));
	};

	// if (loading) {
	// 	return <div>Loading...</div>;
	// }

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

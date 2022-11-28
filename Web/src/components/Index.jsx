import React, { useEffect, useState } from "react";

import useFetch from "../hooks/useFetch";

const Index = () => {
	const { data, loading, error } = useFetch("spotify", []);
	const [displayRows, setDisplayRows] = useState(null)

	useEffect(() => {
		console.log(data);
		debugger
		if (!loading && data) {
			setDisplayRows(rows(data));
		}
	}, [data, loading]);

	const rows = (data) => {
		if (!data) {
			return null;
		}
		debugger
		return data.map((item) => (
			<tr key={item.spotifyId}>
				<td>{item.title}</td>
				<td>{item.description}</td>
				<td>{item.trackAndFollowerText}</td>
			</tr>
		));
	};

	if (loading) {
		return <div>Loading...</div>;
	}

	return (
		<div>
			<table className="table table-hover">
				<thead>
					<tr>
						<th>Title</th>
						<th>Description</th>
						<th>Track count</th>
					</tr>
				</thead>
				<tbody>
					{displayRows}
				</tbody>
			</table>
		</div>
	);
};

export default Index;

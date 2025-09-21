import { Box, Breadcrumbs as MuiBreadCrumbs, Typography } from "@mui/material";
import { Params, useMatches } from "react-router-dom";

import React from "react";

interface IMatches {
	id: string;
	pathname: string;
	params: Params<string>;
	data: unknown;
	handle: unknown;
}

type HandleType = {
	crumb: (param?: string) => React.ReactNode;
};

const BreadCrumbs = () => {
	const matches: IMatches[] = useMatches();
	const crumbs = matches
		.filter((match) => Boolean(match.handle && (match.handle as HandleType).crumb))
		.map((match) => {
			const crumb = (match.handle as HandleType).crumb(match.params.id as string | undefined);
			return crumb as React.ReactNode;
		});

	const currentCrumb = crumbs.pop();

	const crumbsToRender = crumbs.map((crumb, index) => (
		<Typography color="inherit" key={index}>
			{crumb}
		</Typography>
	));

	return (
		<Box sx={{ width: "100%", mb: 1 }}>
			<MuiBreadCrumbs aria-label="breadcrumb" separator="-">
				{crumbsToRender}
				<Typography>{currentCrumb}</Typography>
			</MuiBreadCrumbs>
		</Box>
	);
};

export default BreadCrumbs;

import { Box, Breadcrumbs as MuiBreadCrumbs, Typography, useTheme } from "@mui/material";
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
	const theme = useTheme();
	const matches: IMatches[] = useMatches();
	const crumbs = matches
		.filter((match) => Boolean(match.handle && (match.handle as HandleType).crumb))
		.map((match) => {
			const crumb = (match.handle as HandleType).crumb(match.params.id as string | undefined);
			return crumb as React.ReactNode;
		});

	const currentCrumb = crumbs.pop();

	const crumbsToRender = crumbs.map((crumb, index) => (
		<Typography color={theme.palette.primary.main} key={index}>
			{crumb}
		</Typography>
	));

	return (
		<Box sx={{ width: "100%", mb: -2 }}>
			<MuiBreadCrumbs aria-label="breadcrumb" separator="-">
				{crumbsToRender}
				<Typography>{currentCrumb}</Typography>
			</MuiBreadCrumbs>
		</Box>
	);
};

export default BreadCrumbs;

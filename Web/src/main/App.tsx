import { RouteObject, RouterProvider, createBrowserRouter } from "react-router-dom";
import { about, account, notFound, root, settings, stationsWithId, work } from "@constants/routes";

import About from "@pages/about/About";
import CrumbLink from "src/fragments/breadcrumbs/CrumbLink";
import Layout from "./Layout";
import Login from "@pages/login/LoginPage";
import NotFound from "@pages/NotFound";
import PlaylistDetails from "@components/playlist/PlaylistCardDetails";
import Radio from "@pages/Radio";
import Settings from "@pages/settings/Settings";
import Work from "@pages/work/Work";

const routes: RouteObject[] = [
	{
		Component: Layout,
		children: [
			{
				path: root,

				children: [
					{ Component: Radio, index: true },
					{
						Component: PlaylistDetails,
						path: stationsWithId,
						handle: {
							crumb: () => <CrumbLink to={root} text="Radio" />,
						},
					},
				],
			},
			{
				path: about,
				Component: About,
				children: [
					{
						path: work,
						Component: Work,
						handle: {
							crumb: () => <CrumbLink to={about} text="About" />,
						},
					},
				],
			},
			{ path: account, Component: Login },
			{ path: settings, Component: Settings },
			{ path: notFound, Component: NotFound },
		],
	},
];

/**
 * The router configuration for the whole application.
 */
const router = createBrowserRouter(routes);

function App() {
	return <RouterProvider router={router} />;
}

export default App;

import { RouteObject, RouterProvider, createBrowserRouter } from "react-router-dom";
import { account, notFound, root, settings, stations, stationsWithId, work } from "@constants/routes";

import About from "@pages/about/About";
import CrumbLink from "src/fragments/breadcrumbs/CrumbLink";
import Layout from "./Layout";
import Login from "@pages/login/LoginPage";
import NotFound from "@pages/NotFound";
import Settings from "@pages/settings/Settings";
import StationDetails from "@pages/stationDetails/StationDetails";
import Stations from "@pages/Stations";
import Work from "@pages/work/Work";

const routes: RouteObject[] = [
	{
		Component: Layout,
		children: [
			{
				path: stations,

				children: [
					{ Component: Stations, index: true },
					{
						Component: StationDetails,
						path: stationsWithId,
						handle: {
							crumb: () => <CrumbLink to={stations} text="Stations" />,
						},
					},
				],
			},
			{
				path: root,
				Component: About,
				children: [
					{
						path: work,
						Component: Work,
						handle: {
							crumb: () => <CrumbLink to={root} text="About" />,
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

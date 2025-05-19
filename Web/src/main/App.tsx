import { RouteObject, RouterProvider, createBrowserRouter } from "react-router-dom";
import { account, notFound, root, settings } from "@constants/routes";

import CrumbLink from "src/fragments/breadcrumbs/CrumbLink";
import Layout from "./Layout";
import Login from "@pages/login/LoginPage";
import NotFound from "@pages/NotFound";
import Radio from "@pages/Radio";
import Settings from "@pages/settings/Settings";

const routes: RouteObject[] = [
	{
		Component: Layout,
		children: [
			{
				path: root,
				handle: {
					crumb: () => <CrumbLink to={root} text="Home" />,
				},
				Component: Radio,
			},
			{
				path: account,
				Component: Login,
			},
			{
				path: settings,
				Component: Settings,
			},
			{
				path: notFound,
				Component: NotFound,
			},
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

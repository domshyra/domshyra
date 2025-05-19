import { FormProvider, useForm } from "react-hook-form";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { Store, UnknownAction } from "@reduxjs/toolkit";

import { Provider as ReduxProvider } from "react-redux";
import type { RouteObject } from "react-router-dom";
import { isValidElement } from "react";
import { render } from "@testing-library/react";

/* istanbul ignore next */
/**
 * This is used to render a component with a router for tests
 * @param children
 * @param routes
 * @returns
 */
export function renderWithRouter(children: JSX.Element, routes = []) {
	const options: RouteObject = isValidElement(children) ? { element: children, path: "/" } : (children as RouteObject);

	const router = createMemoryRouter([options, ...routes], {
		initialEntries: [options.path ?? "/"],
		initialIndex: 1,
	});

	return render(<RouterProvider router={router} />);
}

/* istanbul ignore next */
/**
 * This is used to render a component with a router and redux for tests
 * @param component - The component to render / under test
 * @param store - The redux store
 * @param methods - optional form methods if none are provided then useForm is used
 * @param routes - optional routes
 * @returns The wrapped component and the redux context, form context and router context
 * @example
 * ```tsx
 * const { wrapper, methods } = renderWithProviders(<Component />, store);
 * ```
 */
export const renderWithProviders = (
	component: JSX.Element,
	store: Store<unknown, UnknownAction, unknown>,
	methods: ReturnType<typeof useForm> | null = null,
	routes = []
) => {
	let methodsToUse = methods;
	const Wrapper = () => {
		const formMethods = useForm();
		methodsToUse = methods ?? formMethods;

		return (
			<ReduxProvider store={store}>
				<FormProvider {...methodsToUse}>{component}</FormProvider>
			</ReduxProvider>
		);
	};
	return { wrapper: renderWithRouter(<Wrapper />, routes), methods: methodsToUse };
};

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { Account } from "@_types/authorization";
import { baseApiUrl } from "@constants/common";

//if using the MapIdentityApi it adds account to the api url, but if not it will not add it
//?https://redux-toolkit.js.org/rtk-query/usage/queries
export const accountApi = createApi({
	baseQuery: fetchBaseQuery({ baseUrl: baseApiUrl }),
	reducerPath: "accountApi",
	endpoints: (build) => ({
		register: build.mutation<Account, Account>({
			query: (body) => ({
				url: "/register",
				method: "POST",
				body: { ...body, email: body.email.toLowerCase() },
			}),
		}),
		login: build.mutation<Account, Account>({
			query: (body) => ({
				url: "/login?useCookies=false&useSessionCookies=false",
				method: "POST",
				body,
			}),
		}),
		sitePasswordPage: build.mutation<void, string>({
			query: (password) => ({
				url: "Password",
				method: "POST",
				body: JSON.stringify(password),
				headers: new Headers({
					"Content-Type": "application/json-patch+json",
				}),
			}),
		}),
	}),
	tagTypes: ["account"],
});

export const { useLoginMutation, useRegisterMutation, useSitePasswordPageMutation } = accountApi;

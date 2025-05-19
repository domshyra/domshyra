import { AuthenticationResult, IdTokenClaims, SilentRequest } from "@azure/msal-browser";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { useCallback, useEffect } from "react";

import { AuthorizationState } from "@_types/authorization";
import { defaultScope } from "@authentication/msalConfig";
import { getExpirationTimes } from "@tools/datetime";
import { isLocalOrDevEnvironment } from "@tools/env";
import { setAuthorization } from "@redux/slices/authorization";
import { setTokenForSelenium } from "@tools/selenium";
import { useAppInsightsContext } from "@microsoft/applicationinsights-react-js";
import { useMsal } from "@azure/msal-react";
import { useState } from "react";

/**
 * Sets up the authentication for the app from MSAL and handles token expiration.
 */
export default function useAuthentication() {
	const { online } = useAppSelector((state: { connectionStatus: { online: boolean } }) => state.connectionStatus);
	const authorization = useAppSelector((state: { authorization: AuthorizationState }) => state.authorization);
	const [initialized, setInitialized] = useState<boolean>(false);
	const dispatch = useAppDispatch();

	const { instance, accounts } = useMsal();

	const appInsights = useAppInsightsContext();
	const [expiresOn, setExpiresOn] = useState<null | string>(null);

	const authorize = useCallback(
		(auth: AuthenticationResult) => {
			const transformedAuth: AuthorizationState = {
				accessToken: auth.accessToken,
				expiresOn: JSON.stringify(auth.expiresOn),
				extExpiresOn: JSON.stringify(auth.extExpiresOn),
				fromCache: auth.fromCache,
				name: (auth.idTokenClaims as IdTokenClaims).name,
				scopes: auth.scopes,
				uniqueId: auth.uniqueId,
				username: auth.account.username,
				userRoles: (auth.idTokenClaims as IdTokenClaims).roles,
			};

			dispatch(setAuthorization(transformedAuth));
		},
		[dispatch]
	);
	
	// Initialize MSAL instance
	useEffect(() => {
		const initializeMsal = async () => {
			instance.initialize().then(() => {
				setInitialized(true);
			}); 
		};

		initializeMsal();
	}, [instance]);

	/**
	 * Acquire a token for the user
	 */
	const acquireToken = useCallback(async () => {
		if (!online) {
			appInsights.trackEvent({
				name: "Token Attempt while offline",
				properties: {
					name: accounts[0].name ?? "No Account set up yet",
				},
			});
			return;
		}
		const accessTokenConfig: SilentRequest = {
			scopes: [defaultScope],
			account: accounts[0],
		};
		try {
			//MSAL uses a cache to store tokens based on specific parameters including scopes, resource and authority, and will retrieve the token from the cache when needed.
			//It also can perform silent renewal of those tokens when they have expired. MSAL exposes this functionality through the acquireTokenSilent method.
			const tokenResponse = await instance.acquireTokenSilent(accessTokenConfig);
			//This will only be set if the token is not in the cache
			authorize({ ...tokenResponse });
			console.log("Token acquired", tokenResponse.accessToken);
			if (!tokenResponse.fromCache) {
				setExpiresOn(JSON.stringify(tokenResponse.expiresOn));
				appInsights.trackEvent({
					name: "Token Acquired",
					properties: {
						token: tokenResponse.accessToken,
						expiresOn: tokenResponse.expiresOn?.toLocaleString(),
						fromCache: tokenResponse.fromCache,
						username: tokenResponse.account.username,
					},
				});
			} else {
				//Token can be in the msal cache, but we haven't set it in the hook state store
				if (expiresOn === null) {
					setExpiresOn(JSON.stringify(tokenResponse.expiresOn));
				}
				appInsights.trackEvent({
					name: "Token Still in cache",
					properties: {
						token: tokenResponse.accessToken,
						expiresOn: tokenResponse.expiresOn?.toLocaleString(),
						fromCache: tokenResponse.fromCache,
						username: tokenResponse.account.username,
					},
				});
			}
		} catch (error: any) {
			console.log("Failed to acquire Token");
			console.error(error);
			appInsights.trackException({ exception: error });
		}
	}, [online, accounts, appInsights, instance, authorize, expiresOn]);

	// Acquire a token if there is no token or the token has expired
	//This should be called via navs in ProtectedRoute
	useEffect(() => {
		if (authorization?.accessToken === null && online) {
			appInsights.trackEvent({ name: "New Token for redux" });
			console.log("New Token for redux");
			acquireToken();
		}
	}, [accounts, instance, accounts.length, authorization?.accessToken, authorization.expiresOn, appInsights, acquireToken, online]);

	// Set up a timeout to acquire a new token before the current one expires
	useEffect(() => {
		if (expiresOn) {
			const { currentTime, timeToExpireInMilliseconds, expiresOnDt } = getExpirationTimes(expiresOn);

			appInsights.trackEvent({
				name: "Token timeout set",
				properties: { willTimeoutAt: new Date(currentTime.getTime() + timeToExpireInMilliseconds).toLocaleString() },
			});
			const timeout = setTimeout(() => {
				acquireToken();
				appInsights.trackEvent({
					name: "Token has expired",
					properties: { triggeredBy: "setTimeout", expiresOn: expiresOnDt.toLocaleString() },
				});
			}, timeToExpireInMilliseconds);
			return () => {
				clearTimeout(timeout);
				appInsights.trackEvent({
					name: "Token timeout cleared",
					properties: { triggeredBy: "cleanup", expiresOn: expiresOnDt.toLocaleString() },
				});
			};
		}
	}, [expiresOn, acquireToken, appInsights]);

	useEffect(() => {
		const selenium = async () => {
			if (isLocalOrDevEnvironment() && initialized) {
				setTokenForSelenium();
			}
		};
		selenium();
	}, [initialized]);
}



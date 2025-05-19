import { AuthenticationScheme, ExternalTokenResponse, LoadTokenOptions, PublicClientApplication, SilentRequest } from "@azure/msal-browser";
import { MsalAccessTokenEntity, MsalAccountEntity, MsalCredentialEntity, MsalRefreshTokenEntity } from "@_types/authorization";
import { msalConfig, scopes, tenantId } from "@authentication/msalConfig";

/**
 * Sets the token for Selenium testing.
 *
 */
function setTokenForSelenium() {
	//Used for Msal to get a token in dev/local for testing
	const seleniumIdToken: MsalCredentialEntity = JSON.parse(window.sessionStorage.getItem("seleniumIdTokenKey") ?? "{}");
	const seleniumAccount: MsalAccountEntity = JSON.parse(window.sessionStorage.getItem("seleniumAccountKey") ?? "{}");
	const seleniumAccessToken: MsalAccessTokenEntity = JSON.parse(window.sessionStorage.getItem("seleniumAccessTokenKey") ?? "{}");
	const seleniumRefreshToken: MsalRefreshTokenEntity = JSON.parse(window.sessionStorage.getItem("seleniumRefreshTokenKey") ?? "{}");

	//We need to have default and User.Read for scopes for this to work
	if (
		Object.keys(seleniumIdToken).length !== 0 &&
		Object.keys(seleniumAccount).length !== 0 &&
		Object.keys(seleniumAccessToken).length !== 0 &&
		Object.keys(seleniumRefreshToken).length !== 0
	) {
		const silentRequest: SilentRequest = {
			scopes: scopes,
			authority: `https://login.microsoftonline.com/${tenantId}`,
			account: {
				authorityType: seleniumAccount.authorityType,
				environment: seleniumAccount.environment,
				homeAccountId: seleniumAccount.homeAccountId,
				idToken: seleniumIdToken.secret,
				idTokenClaims: seleniumAccount.idTokenClaims,
				localAccountId: seleniumAccount.localAccountId,
				name: seleniumAccount.name,
				tenantId: tenantId,
				username: seleniumAccount.username,
			},
		};

		const serverResponse: ExternalTokenResponse = {
			access_token: seleniumAccessToken.secret,
			expires_in: 3599,
			id_token: seleniumIdToken.secret,
			refresh_token: seleniumRefreshToken.secret,
			scope: scopes.join(" "),
			token_type: AuthenticationScheme.BEARER,
			client_info: seleniumAccount.clientInfo,
		};

		const loadTokenOptions: LoadTokenOptions = {
			clientInfo: seleniumAccount.clientInfo,
			extendedExpiresOn: 6599,
		};

		// old code from v2
		// const pcaOld = new PublicClientApplication({
		// 	auth: { clientId: clientId },
		// });
		const pca = new PublicClientApplication(msalConfig);

		try {
			pca.getTokenCache().loadExternalTokens(silentRequest, serverResponse, loadTokenOptions);
			window.sessionStorage.removeItem("seleniumIdTokenKey");
			window.sessionStorage.removeItem("seleniumAccountKey");
			window.sessionStorage.removeItem("seleniumAccessTokenKey");
			window.sessionStorage.removeItem("seleniumRefreshTokenKey");
		} catch (error: any) {
			console.error(error);
		}
	}
}

export { setTokenForSelenium };


import {
	AadTokenResponse,
	MsalAccessTokenEntity,
	MsalAccountEntity,
	MsalCredentialEntity,
	MsalRefreshTokenEntity,
	msJwtPayload,
} from "@_types/authorization";
import {
	AuthenticationScheme,
	ExternalTokenResponse,
	IdTokenClaims,
	LoadTokenOptions,
	PublicClientApplication,
	SilentRequest,
} from "@azure/msal-browser";
import { clientId, msalConfig, readScope, scopes, tenantId } from "@authentication/msalConfig";

import { jwtDecode } from "jwt-decode";

const target = ["openid", "profile", "offline_access", readScope.toLowerCase()].join(" ");

/**
 * Logs in with a bearer token.
 * @param token - The token to log in with.
 */
const loginWithBearerToken = async (token: AadTokenResponse) => {
	const idToken = jwtDecode<msJwtPayload>(token.id_token);
	const localAccountId = idToken.oid;
	const realm = idToken.tid;
	const homeAccountId = `${localAccountId}.${realm}`;
	const username = idToken.preferred_username;
	const name = idToken.name;

	const claimsDictionary: { [key: string]: any } = {} as { [key in keyof msJwtPayload]: any };

	Object.keys(idToken).forEach((key) => {
		if (key === "roles") {
			if (claimsDictionary[key]) {
				claimsDictionary[key] = [...claimsDictionary[key], idToken[key]];
			} else {
				claimsDictionary[key] = [idToken[key]];
			}
		} else {
			claimsDictionary[key] = idToken[key as keyof msJwtPayload];
		}
	});

	const seleniumIdToken: MsalCredentialEntity = buildIdTokenEntity(token.id_token, homeAccountId, realm);
	const seleniumAccount: MsalAccountEntity = buildAccountEntity(homeAccountId, realm, localAccountId, username, name, claimsDictionary);
	const seleniumAccessToken: MsalAccessTokenEntity = buildAccessTokenEntity(token, homeAccountId, realm);
	const seleniumRefreshToken: MsalRefreshTokenEntity = buildRefreshTokenEntity(token.refresh_token, token.expires_in, homeAccountId, realm);

	window.sessionStorage.setItem("seleniumIdTokenKey", JSON.stringify(seleniumIdToken));
	window.sessionStorage.setItem("seleniumAccountKey", JSON.stringify(seleniumAccount));
	window.sessionStorage.setItem("seleniumAccessTokenKey", JSON.stringify(seleniumAccessToken));
	window.sessionStorage.setItem("seleniumRefreshTokenKey", JSON.stringify(seleniumRefreshToken));
};

/**
 * Builds an access token entity.
 * @param tokenResponse - The token response from the authentication server.
 * @param homeAccountId - The home account ID.
 * @param realm - The realm (tenant ID).
 * @returns An object representing the access token entity.
 */
const buildAccessTokenEntity = (tokenResponse: AadTokenResponse, homeAccountId: string, realm: string): MsalAccessTokenEntity => {
	const cachedAt = Math.floor(Date.now() / 1000).toString();
	const expiresOn = (Math.floor(Date.now() / 1000) + tokenResponse.expires_in).toString();
	const extendedExpiresOn = (Math.floor(Date.now() / 1000) + tokenResponse.ext_expires_in).toString();

	return {
		homeAccountId: homeAccountId,
		clientId: clientId,
		realm: realm,
		secret: tokenResponse.access_token,
		credentialType: "AccessToken",
		environment: "login.windows.net",
		target: target,
		cachedAt: cachedAt,
		expiresOn: expiresOn,
		extendedExpiresOn: extendedExpiresOn,
		tokenType: "Bearer",
	};
};

/**
 * Builds an account entity.
 * @param homeAccountId - The home account ID.
 * @param realm - The realm (tenant ID).
 * @param localAccountId - The local account ID.
 * @param username - The username.
 * @param name - The name of the user.
 * @param claims - The claims associated with the account.
 * @returns An object representing the account entity.
 */
const buildAccountEntity = (
	homeAccountId: string,
	realm: string,
	localAccountId: string,
	username: string,
	name: string,
	claims: IdTokenClaims & {
		[key: string]: unknown;
	}
): MsalAccountEntity => {
	const clientInfo = btoa(JSON.stringify({ uid: localAccountId, utid: realm }));

	return {
		homeAccountId: homeAccountId,
		clientId: clientId,
		realm: realm,
		secret: "",
		credentialType: "Account",
		environment: "login.windows.net",
		target: target,
		localAccountId: localAccountId,
		username: username,
		authorityType: "MSSTS",
		name: name,
		clientInfo: clientInfo,
		idTokenClaims: claims,
		tenantProfiles: buildTenantProfile(realm, localAccountId, name),
	};
};

const buildTenantProfile = (tenantId: string, localAccountId: string, name: string) => {
	return new Map([
		[tenantId, { isHomeTenant: true, tenantId: tenantId, localAccountId: localAccountId, name: name, environment: "login.windows.net" }],
	]);
};

/**
 * Builds a refresh token entity.
 * @param refreshToken - The refresh token.
 * @param expiresIn - The expiration time in seconds.
 * @param homeAccountId - The home account ID.
 * @param realm - The realm (tenant ID).
 * @returns An object representing the refresh token entity.
 */
const buildRefreshTokenEntity = (refreshToken: string, expiresIn: number, homeAccountId: string, realm: string): MsalRefreshTokenEntity => {
	const expiresOn = (Math.floor(Date.now() / 1000) + expiresIn).toString();

	return {
		homeAccountId: homeAccountId,
		clientId: clientId,
		realm: realm,
		secret: refreshToken,
		credentialType: "RefreshToken",
		environment: "login.windows.net",
		target: target,
		expiresOn: expiresOn,
	};
};

/**
 * Builds an ID token entity.
 * @param idToken - The ID token.
 * @param homeAccountId - The home account ID.
 * @param realm - The realm (tenant ID).
 * @returns An object representing the ID token entity.
 */
const buildIdTokenEntity = (idToken: string, homeAccountId: string, realm: string): MsalCredentialEntity => {
	return {
		homeAccountId: homeAccountId,
		clientId: clientId,
		realm: realm,
		secret: idToken,
		credentialType: "IdToken",
		environment: "login.windows.net",
		target: target,
	};
};

const checkForSeleniumTokensInSessionStorage = () => {
	//Used for Msal to get a token in dev/local for testing
	const {
		seleniumIdToken,
		seleniumAccount,
		seleniumAccessToken,
		seleniumRefreshToken,
	}: {
		seleniumIdToken: MsalCredentialEntity;
		seleniumAccount: MsalAccountEntity;
		seleniumAccessToken: MsalAccessTokenEntity;
		seleniumRefreshToken: MsalRefreshTokenEntity;
	} = retrieveAuthenticationTokens();

	//We need to have default and User.Read for scopes for this to work
	if (
		Object.keys(seleniumIdToken).length !== 0 &&
		Object.keys(seleniumAccount).length !== 0 &&
		Object.keys(seleniumAccessToken).length !== 0 &&
		Object.keys(seleniumRefreshToken).length !== 0
	) {
		return true;
	}
	return false;
};

function retrieveAuthenticationTokens() {
	const seleniumIdToken: MsalCredentialEntity = JSON.parse(window.sessionStorage.getItem("seleniumIdTokenKey") ?? "{}");
	const seleniumAccount: MsalAccountEntity = JSON.parse(window.sessionStorage.getItem("seleniumAccountKey") ?? "{}");
	const seleniumAccessToken: MsalAccessTokenEntity = JSON.parse(window.sessionStorage.getItem("seleniumAccessTokenKey") ?? "{}");
	const seleniumRefreshToken: MsalRefreshTokenEntity = JSON.parse(window.sessionStorage.getItem("seleniumRefreshTokenKey") ?? "{}");
	return { seleniumIdToken, seleniumAccount, seleniumAccessToken, seleniumRefreshToken };
}

/**
 * Sets the token for Selenium testing.
 *
 */
async function setTokenForSelenium() {
	if (!checkForSeleniumTokensInSessionStorage()) {
		return null;
	}
	//Used for Msal to get a token in dev/local for testing
	const {
		seleniumIdToken,
		seleniumAccount,
		seleniumAccessToken,
		seleniumRefreshToken,
	}: {
		seleniumIdToken: MsalCredentialEntity;
		seleniumAccount: MsalAccountEntity;
		seleniumAccessToken: MsalAccessTokenEntity;
		seleniumRefreshToken: MsalRefreshTokenEntity;
	} = retrieveAuthenticationTokens();

	//We need to have default and User.Read for scopes for this to work
	console.log("Setting token for Selenium");
	const silentRequest: SilentRequest = {
		scopes: scopes,
		authority: `https://login.microsoftonline.com/${tenantId}`,
		account: {
			homeAccountId: seleniumAccount.homeAccountId,
			environment: seleniumAccount.environment,
			tenantId: tenantId,
			username: seleniumAccount.username,
			localAccountId: seleniumAccount.localAccountId,
			name: seleniumAccount.name,
			authorityType: seleniumAccount.authorityType,
			idTokenClaims: seleniumAccount.idTokenClaims,
			idToken: seleniumIdToken.secret,
			tenantProfiles: buildTenantProfile(tenantId, seleniumAccount.localAccountId, seleniumAccount.name), //note: this is build because JS doesn't support this property when Json.stringify is called
		},
	};

	const serverResponse: ExternalTokenResponse = {
		id_token: seleniumIdToken.secret,
		token_type: AuthenticationScheme.BEARER,
		scope: scopes.join(" "),
		access_token: seleniumAccessToken.secret,
		refresh_token: seleniumRefreshToken.secret,
		expires_in: 3599,
		client_info: seleniumAccount.clientInfo,
	};

	const loadTokenOptions: LoadTokenOptions = {
		clientInfo: seleniumAccount.clientInfo,
		extendedExpiresOn: 6599,
	};

	const pca = new PublicClientApplication(msalConfig);

	try {
		await pca.initialize();
		pca.getAllAccounts();
		const authenticationResult = await pca.getTokenCache().loadExternalTokens(silentRequest, serverResponse, loadTokenOptions);

		window.sessionStorage.removeItem("seleniumIdTokenKey");
		window.sessionStorage.removeItem("seleniumAccountKey");
		window.sessionStorage.removeItem("seleniumAccessTokenKey");
		window.sessionStorage.removeItem("seleniumRefreshTokenKey");
		console.log("Tokens set for Selenium");

		return authenticationResult;
	} catch (error: any) {
		console.error(error);
	}

	return null;
}

export { buildTenantProfile, checkForSeleniumTokensInSessionStorage, loginWithBearerToken, retrieveAuthenticationTokens, setTokenForSelenium };




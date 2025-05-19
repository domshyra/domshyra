import { IdTokenClaims, TenantProfile } from "@azure/msal-browser";

export type Account = {
	email: string;
	password: string;
};

export type AuthorizationState = {
	accessToken: string | null;
	fromCache: boolean;
	expiresOn: string | null;
	scopes: Array<string>;
	uniqueId: string | null;
	userRoles: Array<string> | undefined;
	name: string | null | undefined;
	username: string | null;
	extExpiresOn: string | null;
};

export interface MsalCredentialEntity {
	homeAccountId: string;
	clientId: string;
	realm: string;
	secret: string;
	credentialType: string;
	environment: string;
	target: string;
}

export interface MsalAccessTokenEntity extends MsalCredentialEntity {
	cachedAt: string;
	expiresOn: string;
	extendedExpiresOn: string;
	tokenType: string;
}

export interface MsalRefreshTokenEntity extends MsalCredentialEntity {
	expiresOn: string;
}

export interface MsalAccountEntity extends MsalCredentialEntity {
	localAccountId: string;
	username: string;
	authorityType: string;
	name: string;
	clientInfo: string;
	idTokenClaims: IdTokenClaims & {
		[key: string]: string | number | string[] | object | undefined | unknown;
	};
	tenantProfiles: Map<string, TenantProfile>;
}

export interface AadTokenResponse {
	access_token: string;
	expires_in: number;
	ext_expires_in: number;
	token_type: string;
	id_token: string;
	refresh_token: string;
}

export interface msJwtPayload {
	aud: string;
	exp: number;
	iss: string;
	iat: number;
	nbf: number;
	sub: string;
	oid: string;
	preferred_username: string;
	tid: string;
	name: string;
	roles: string[];
}

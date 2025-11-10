import { Social } from "@components/socalis/SocialButtons";

/**
 * The base URL for the API, sourced from environment variables.
 *
 * @constant {string} baseApiUrl - The base URL for the API.
 */
export const baseApiUrl = import.meta.env.VITE_BASE_API_URL;

export const appName = "domshyra";

//#region Social Links
export const githubUrl = "https://github.com/domshyra/domshyra";
export const githubAccountUrl = "https://github.com/domshyra/";
export const linkedInAccountUrl = "https://www.linkedin.com/in/domshyra/";
export const stackOverflowAccountUrl = "https://stackoverflow.com/users/759645/domshyra";
export const spotifyAccountUrl = "https://open.spotify.com/user/domshyra";

export const githubSvgIcon =
	"M237.9 461.4C237.9 463.4 235.6 465 232.7 465C229.4 465.3 227.1 463.7 227.1 461.4C227.1 459.4 229.4 457.8 232.3 457.8C235.3 457.5 237.9 459.1 237.9 461.4zM206.8 456.9C206.1 458.9 208.1 461.2 211.1 461.8C213.7 462.8 216.7 461.8 217.3 459.8C217.9 457.8 216 455.5 213 454.6C210.4 453.9 207.5 454.9 206.8 456.9zM251 455.2C248.1 455.9 246.1 457.8 246.4 460.1C246.7 462.1 249.3 463.4 252.3 462.7C255.2 462 257.2 460.1 256.9 458.1C256.6 456.2 253.9 454.9 251 455.2zM316.8 72C178.1 72 72 177.3 72 316C72 426.9 141.8 521.8 241.5 555.2C254.3 557.5 258.8 549.6 258.8 543.1C258.8 536.9 258.5 502.7 258.5 481.7C258.5 481.7 188.5 496.7 173.8 451.9C173.8 451.9 162.4 422.8 146 415.3C146 415.3 123.1 399.6 147.6 399.9C147.6 399.9 172.5 401.9 186.2 425.7C208.1 464.3 244.8 453.2 259.1 446.6C261.4 430.6 267.9 419.5 275.1 412.9C219.2 406.7 162.8 398.6 162.8 302.4C162.8 274.9 170.4 261.1 186.4 243.5C183.8 237 175.3 210.2 189 175.6C209.9 169.1 258 202.6 258 202.6C278 197 299.5 194.1 320.8 194.1C342.1 194.1 363.6 197 383.6 202.6C383.6 202.6 431.7 169 452.6 175.6C466.3 210.3 457.8 237 455.2 243.5C471.2 261.2 481 275 481 302.4C481 398.9 422.1 406.6 366.2 412.9C375.4 420.8 383.2 435.8 383.2 459.3C383.2 493 382.9 534.7 382.9 542.9C382.9 549.4 387.5 557.3 400.2 555C500.2 521.8 568 426.9 568 316C568 177.3 455.5 72 316.8 72zM169.2 416.9C167.9 417.9 168.2 420.2 169.9 422.1C171.5 423.7 173.8 424.4 175.1 423.1C176.4 422.1 176.1 419.8 174.4 417.9C172.8 416.3 170.5 415.6 169.2 416.9zM158.4 408.8C157.7 410.1 158.7 411.7 160.7 412.7C162.3 413.7 164.3 413.4 165 412C165.7 410.7 164.7 409.1 162.7 408.1C160.7 407.5 159.1 407.8 158.4 408.8zM190.8 444.4C189.2 445.7 189.8 448.7 192.1 450.6C194.4 452.9 197.3 453.2 198.6 451.6C199.9 450.3 199.3 447.3 197.3 445.4C195.1 443.1 192.1 442.8 190.8 444.4zM179.4 429.7C177.8 430.7 177.8 433.3 179.4 435.6C181 437.9 183.7 438.9 185 437.9C186.6 436.6 186.6 434 185 431.7C183.6 429.4 181 428.4 179.4 429.7z";
export const linkedInSvgIcon =
	"M196.3 512L103.4 512L103.4 212.9L196.3 212.9L196.3 512zM149.8 172.1C120.1 172.1 96 147.5 96 117.8C96 103.5 101.7 89.9 111.8 79.8C121.9 69.7 135.6 64 149.8 64C164 64 177.7 69.7 187.8 79.8C197.9 89.9 203.6 103.6 203.6 117.8C203.6 147.5 179.5 172.1 149.8 172.1zM543.9 512L451.2 512L451.2 366.4C451.2 331.7 450.5 287.2 402.9 287.2C354.6 287.2 347.2 324.9 347.2 363.9L347.2 512L254.4 512L254.4 212.9L343.5 212.9L343.5 253.7L344.8 253.7C357.2 230.2 387.5 205.4 432.7 205.4C526.7 205.4 544 267.3 544 347.7L544 512L543.9 512z";
export const stackOverflowIcon =
	"M419 375L223.3 333.7L215.1 373L410.8 414L419 375zM470 288L316.5 159.7L291 190.5L444.5 318.8L470 288zM438.8 327.7L257.5 243L240.8 279.5L422 364L438.8 327.7zM390.3 96L358.3 120L477.6 280.3L509.6 256.3L390.3 96zM410.8 424L210.8 424L210.8 463.7L410.8 463.7L410.8 424zM450.5 504L171 504L171 384L131 384L131 544L490.5 544L490.5 384L450.5 384L450.5 504z";
export const spotifySvgIcon =
	"M320 72C183 72 72 183 72 320C72 457 183 568 320 568C457 568 568 457 568 320C568 183 457 72 320 72zM420.7 436.9C416.5 436.9 413.9 435.6 410 433.3C347.6 395.7 275 394.1 203.3 408.8C199.4 409.8 194.3 411.4 191.4 411.4C181.7 411.4 175.6 403.7 175.6 395.6C175.6 385.3 181.7 380.4 189.2 378.8C271.1 360.7 354.8 362.3 426.2 405C432.3 408.9 435.9 412.4 435.9 421.5C435.9 430.6 428.8 436.9 420.7 436.9zM447.6 371.3C442.4 371.3 438.9 369 435.3 367.1C372.8 330.1 279.6 315.2 196.7 337.7C191.9 339 189.3 340.3 184.8 340.3C174.1 340.3 165.4 331.6 165.4 320.9C165.4 310.2 170.6 303.1 180.9 300.2C208.7 292.4 237.1 286.6 278.7 286.6C343.6 286.6 406.3 302.7 455.7 332.1C463.8 336.9 467 343.1 467 351.8C466.9 362.6 458.5 371.3 447.6 371.3zM478.6 295.1C473.4 295.1 470.2 293.8 465.7 291.2C394.5 248.7 267.2 238.5 184.8 261.5C181.2 262.5 176.7 264.1 171.9 264.1C158.7 264.1 148.6 253.8 148.6 240.5C148.6 226.9 157 219.2 166 216.6C201.2 206.3 240.6 201.4 283.5 201.4C356.5 201.4 433 216.6 488.9 249.2C496.7 253.7 501.8 259.9 501.8 271.8C501.8 285.4 490.8 295.1 478.6 295.1z";
export const socialList: Social[] = [
	{
		label: "GitHub",
		style: {
			backgroundColor: "#24292e",
			color: "#ffffff",
		},
		svg: githubSvgIcon,
		url: githubAccountUrl,
	},
	{
		label: "LinkedIn",
		style: {
			backgroundColor: "#0077b5",
			color: "#ffffff",
		},
		svg: linkedInSvgIcon,
		url: linkedInAccountUrl,
	},
	{
		label: "Stack Overflow",
		style: {
			backgroundColor: "#f48024",
			color: "#ffffff",
		},
		svg: stackOverflowIcon,
		url: stackOverflowAccountUrl,
	},
	{
		label: "Spotify",
		style: {
			backgroundColor: "#1db954",
			color: "#ffffff",
		},
		svg: spotifySvgIcon,
		url: spotifyAccountUrl,
	},
];
//#endregion

//#region Companies
export const currieAndBrown = "Currie & Brown";
export const jCrew = "J. Crew";
export const wsrb = "WSRB";
export const arvixe = "Arvixe";
//#endregion

//#region languages
export const cSharp = "C#";
export const javaScript = "JavaScript";
export const typeScript = "TypeScript";
export const sql = "SQL";
export const hcl = "HCL";
//#endregion
//#region frameworks
export const dotNet = ".NET (Framework & Core)";
export const react = "React (Hooks, Redux, RTK Query)";
export const entityFramework = "Entity Framework (Code-First)";
//#endregion
//#region testing
export const selenium = "Selenium";
export const jest = "Jest";
export const vitestLabel = "Vitest";
export const xunit = "Xunit";
export const reactTestingLibrary = "React Testing Library";
//#endregion
//#region cloud
export const microsoftAzure = "Microsoft Azure (App Services, CosmosDB, SQL Server, Pipelines, Blob Storage)";
export const terraform = "Terraform";
export const azureDevOps = "Azure DevOps (CI/CD pipelines, YAML releases)";
export const sentryIo = "Sentry.io";
//#endregion

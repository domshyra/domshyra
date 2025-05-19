import { ApplicationInsights } from "@microsoft/applicationinsights-web";
import { ReactPlugin } from "@microsoft/applicationinsights-react-js";

const reactPlugin = new ReactPlugin();
const appInsights = new ApplicationInsights({
	config: {
		connectionString: import.meta.env.VITE_APPLICATION_INSIGHTS_CONNECTION,
		enableAutoRouteTracking: true,
		enableCorsCorrelation: true,
		enableRequestHeaderTracking: true,
		enableResponseHeaderTracking: true,
		extensions: [reactPlugin],
		correlationHeaderExcludedDomains: [import.meta.env.VITE_BASE_API_URL],
	},
});
appInsights.loadAppInsights();

export { appInsights, reactPlugin };

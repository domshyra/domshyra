import { ApplicationInsights } from "@microsoft/applicationinsights-web";
import { ReactPlugin } from "@microsoft/applicationinsights-react-js";

let reactPlugin = new ReactPlugin();
let appInsights = new ApplicationInsights({
	config: {
		connectionString: "STRG HERE",
		enableAutoRouteTracking: true,
		extensions: [reactPlugin],
        disableAjaxTracking: false,
        autoTrackPageVisitTime: true,
        enableCorsCorrelation: true,
        enableRequestHeaderTracking: true,
        enableResponseHeaderTracking: true
	},
});
appInsights.loadAppInsights();

export { reactPlugin, appInsights };
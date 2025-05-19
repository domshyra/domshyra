import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

import App from "./main/App";
// import { AppInsightsContext } from "@microsoft/applicationinsights-react-js";
import { MsalProvider } from "@azure/msal-react";
import Offline from "./components/offline/Offline";
import { PersistGate } from "redux-persist/integration/react";
import { PublicClientApplication } from "@azure/msal-browser";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider as ReduxProvider } from "react-redux";
import { msalConfig } from "./authentication/msalConfig";
import persistStore from "redux-persist/es/persistStore";
// import { reactPlugin } from "./tools/applicationInsights";
import reportWebVitals from "./main/reportWebVitals";
import setupStore from "@redux/store";

const store = setupStore({});
const msalInstance = new PublicClientApplication(msalConfig);
const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
const persitor = persistStore(store);

root.render(
	<React.StrictMode>
		<ReduxProvider store={store}>
			<PersistGate loading={null} persistor={persitor}>
				{/* <AppInsightsContext.Provider value={reactPlugin}> */}
				<MsalProvider instance={msalInstance}>
					<Offline>
						<App />
					</Offline>
				</MsalProvider>
				{/* </AppInsightsContext.Provider> */}
			</PersistGate>
		</ReduxProvider>
	</React.StrictMode>
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;

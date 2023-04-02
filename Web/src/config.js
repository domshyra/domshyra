const Config = {
	baseApiUrl: isProdEnv() ? "https://domshyraapi.azurewebsites.net/" : "https://localhost:7167/",
};

const currencyFormatter = Intl.NumberFormat("en-US", {
	style: "currency",
	currency: "USD",
	maximumFractionDigits: 0,
});
function isProdEnv() {
	return process.env.NODE_ENV !== "development";
}

export default Config;
export { currencyFormatter, isProdEnv };

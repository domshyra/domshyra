import dayjs, { Dayjs } from "dayjs";

import duration from "dayjs/plugin/duration";
import localizedFormat from "dayjs/plugin/localizedFormat";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(localizedFormat);
dayjs.extend(relativeTime);
dayjs.extend(duration);

//For more formats see: https://day.js.org/docs/en/display/format
const formatType = "llll";

/**
 * Parses a dayjs relative time string from a JSON date string
 * @param {string} at
 * @returns
 */
export function parseRelativeDateTime(at: string) {
	const date = new Date(JSON.parse(at));
	return dayjs(date).fromNow();
}

export function getSkillLengthString(start: Dayjs, end?: Dayjs): string {
	const endDate = end || dayjs();
	const years = endDate.diff(start, "year");
	const months = endDate.diff(start.add(years, "year"), "month");
	let lengthString = "";
	if (years > 0) {
		lengthString += `${years} year${years > 1 ? "s" : ""}`;
	}
	if (months > 0) {
		if (lengthString.length > 0) lengthString += " ";
		lengthString += `${months} month${months > 1 ? "s" : ""}`;
	}
	return lengthString;
}

export function getTimeLength(start: Date, end?: Date) {
	const endDate = end || new Date();
	const startDayJs = dayjs(start);
	const endDayJs = dayjs(endDate);
	return endDayJs.diff(startDayJs);
}
export function getTimeLengthInYearsAndMonths(start: Date | Dayjs, end?: Date | Dayjs) {
	const endDate = end || new Date();
	const startDayJs = dayjs.isDayjs(start) ? start : dayjs(start);
	const endDayJs = dayjs.isDayjs(endDate) ? endDate : dayjs(endDate);
	const years = endDayJs.diff(startDayJs, "year");
	const months = endDayJs.diff(startDayJs.add(years, "year"), "month");
	return { years, months };
}

export function getTimeSpanDisplayString(start: Date | Dayjs, end?: Date | Dayjs): string {
	const format = "MMM/YY";
	const span = getTimeLengthInYearsAndMonths(start, end);
	return (
		`${formatDateTime(start, format)} - ${end ? formatDateTime(end, format) : "Present"} · ` +
		(span.years > 0 ? `${span.years} yr${span.years > 1 ? "s" : ""} ` : "") +
		(span.months > 0 ? `${span.months} mo${span.months > 1 ? "s" : ""} ` : "")
	);
}

/**
 * Formats a dayjs date time string
 * @param date
 * @param formatTypeParam
 * @returns {string}
 */
export function formatDateTime(date: Date | Dayjs, formatTypeParam?: string): string {
	const format = formatTypeParam || formatType;
	if (dayjs.isDayjs(date)) {
		return date.format(format);
	}
	return dayjs(date).format(format);
}

/**
 * Formats a dayjs date time string from a JSON date string
 * @param at
 * @returns {string}
 */
export function parseDateTimeFromJsonAndFormat(at: string, formatTypeParam?: string): string {
	const date = new Date(JSON.parse(at));
	const format = formatTypeParam || formatType;
	return formatDateTime(date, format);
}

/**
 * Calculates the time remaining until the given expiration date.
 *
 * @param {string} expiresOn - The expiration date in string format.
 * @returns An object containing the current time, time to expire in milliseconds, and the expiration date.
 */
export function getExpirationTimes(expiresOn: string) {
	const expiresOnDt = new Date(JSON.parse(expiresOn));
	const currentTime = new Date();
	const expiresOnDtDayJs = dayjs(expiresOnDt);
	const currentTimeDayJs = dayjs(currentTime);
	const timeToExpireInMilliseconds = expiresOnDtDayJs.diff(currentTimeDayJs);
	return { currentTime, timeToExpireInMilliseconds, expiresOnDt };
}

/**
 * Check if a given date is in a valid JavaScript Date format
 * @param date
 * @returns {boolean}
 */
export const isValidDate = (date: string | number | Date | dayjs.Dayjs): boolean => {
	return dayjs(date).isValid();
};

/**
 * Get the relative time from a given date
 * @param date
 * @returns {string}
 */
export const getRelativeTime = (date: string | number | Date | dayjs.Dayjs | null): string => {
	return dayjs(date).fromNow();
};

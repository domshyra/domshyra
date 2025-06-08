import { describe, expect, it } from "vitest";
import { formatDateTime, getExpirationTimes, getRelativeTime, isValidDate, parseDateTimeFromJsonAndFormat, parseRelativeDateTime } from "./datetime";

describe("datetime.ts", () => {
	it("should parse relative date time correctly", () => {
		const date = new Date();
		const jsonString = JSON.stringify(date);
		const result = parseRelativeDateTime(jsonString);
		expect(result).toMatch(/seconds? ago/);
	});

	it("should format date time correctly", () => {
		const date = new Date(Date.UTC(2025, 0, 1, 12, 0, 0));
		const result = formatDateTime(date, "YYYY-MM-DD");
		expect(result).toBe("2025-01-01");
	});

	it("should parse and format date time from JSON correctly", () => {
		const date = new Date(Date.UTC(2025, 0, 1, 12, 0, 0));
		const jsonString = JSON.stringify(date);
		const result = parseDateTimeFromJsonAndFormat(jsonString, "YYYY-MM-DD");
		expect(result).toBe("2025-01-01");
	});

	it("should calculate expiration times correctly", () => {
		const futureDate = new Date(Date.now() + 10000); // 10 seconds in the future
		const jsonString = JSON.stringify(futureDate);
		const { timeToExpireInMilliseconds } = getExpirationTimes(jsonString);
		expect(timeToExpireInMilliseconds).toBeGreaterThan(0);
	});

	it("should validate date correctly", () => {
		const validDate = "2023-01-01";
		const invalidDate = "invalid-date";
		expect(isValidDate(validDate)).toBe(true);
		expect(isValidDate(invalidDate)).toBe(false);
	});

	it("should get relative time correctly", () => {
		const date = new Date(Date.now() - 10000); // 10 seconds ago
		const result = getRelativeTime(date);
		expect(result).toMatch(/seconds? ago/);
	});
});

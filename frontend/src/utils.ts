import { TestTagApi, type MainTestResponse } from "./api";

export function testFetch(): Promise<MainTestResponse> {
	const api = new TestTagApi();

	const result: Promise<MainTestResponse> = api.testGet();

	return result;
}

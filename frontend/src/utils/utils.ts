import { TestTag1Api, type MainTestResponse } from "../api";

export function testFetch(): Promise<MainTestResponse> {
  const api = new TestTag1Api();

  const result: Promise<MainTestResponse> = api.testGet();

  return result;
}

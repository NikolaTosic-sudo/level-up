export function testFetch(): Promise<{ message: string }> {
	const result: Promise<{ message: string }> = fetch("http://localhost:8080/test").then((res) =>
		res.json()
	)

	return result;
}

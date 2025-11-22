import { createFileRoute } from "@tanstack/react-router";
import App from "../App";
import { testFetch } from "../utils";

export const Route = createFileRoute("/")({
	component: App,
	loader: async ({ context }) => {
		await context.queryClient.ensureQueryData({
			queryKey: ["repoData"],
			queryFn: testFetch,
		});
	},
});

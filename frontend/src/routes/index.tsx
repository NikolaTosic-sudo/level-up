import { createFileRoute } from "@tanstack/react-router";
import { testFetch } from "../utils";

export const Route = createFileRoute("/")({
	component: IndexComponent,
	loader: async ({ context }) => {
		await context.queryClient.ensureQueryData({
			queryKey: ["repoData"],
			queryFn: testFetch,
		});
	},
});

function IndexComponent() {
	return <div>Hello index</div>
}

import { createFileRoute } from "@tanstack/react-router";
import ProfileCreation from "../components/profileCreation/ProfileCreation";

export const Route = createFileRoute("/profile-creation")({
	component: ProfileCreation,
});

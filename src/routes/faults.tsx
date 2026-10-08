import { createFileRoute } from "@tanstack/react-router";
import { FaultApp } from "@/components/fault-app";

export const Route = createFileRoute("/faults")({ component: FaultsPage });

function FaultsPage() {
  return <FaultApp />;
}

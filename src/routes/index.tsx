import { createFileRoute, useRouter } from "@tanstack/react-router";
import { CircuitMap } from "@/components/schematic";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const router = useRouter();
  return (
    <main className="px-4 py-4 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <h1 className="sr-only">The circuit</h1>
        <CircuitMap
          study
          onOpenMode={(id) => {
            router.history.push(`/faults?m=${id}`);
          }}
        />
      </div>
    </main>
  );
}

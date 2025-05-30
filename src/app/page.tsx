import Link from "next/link";

import { EditTask } from "~/app/_components/post";
import { api, HydrateClient } from "~/trpc/server";
import { ListingTasks } from "./_components/listing";

export default async function Home() {
  void api.post.getTasks.prefetch();

  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
            <span className="text-[hsl(280,100%,70%)]">Gerenciador de Tarefas</span> App
          </h1>

          <div className="flex gap-8 container items-center justify-center">
            <EditTask task={null} />
            <ListingTasks />
          </div>
        </div>
      </main>
    </HydrateClient>
  );
}

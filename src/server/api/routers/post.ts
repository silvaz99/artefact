import type { UUID } from "crypto";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

// Mocked DB
export interface Task {
  id: UUID;
  titulo: string;
  descricao?: string;
  dataCriacao?: number;
}
const posts: Task[] = [
  {
    id: "00000000-0000-0000-0000-000000000001",
    titulo: "Hello World",
  },
];

export const postRouter = createTRPCRouter({
  create: publicProcedure
    .input(z.object({ name: z.string().min(1), description: z.string().optional() }))
    .mutation(async ({ input }) => {
      const post: Task = {
        id: crypto.randomUUID() as UUID,
        titulo: input.name,
        descricao: input.description,
        dataCriacao: Date.now(),
      };
      posts.push(post);
      return post;
    }),

  getTasks: publicProcedure.query(() => {
    return posts;
  }),

  updateTask: publicProcedure
    .input(
      z.object({ id: z.string().uuid(), name: z.string().min(1), description: z.string().optional() }))
    .mutation(async ({ input }) => {
      const postIndex = posts.findIndex((post) => post.id === input.id);
      if (postIndex === -1) {
        throw new Error("Post not found");
      }
      const updatedPost: Task = {
        id: input.id as UUID,
        titulo: input.name,
        descricao: input.description,
        dataCriacao: Date.now(),
      };
      posts[postIndex] = updatedPost;
      return updatedPost;
    }),

    deleteTask: publicProcedure.input(z.object({ id: z.string().uuid() })).mutation(async ({ input }) => {
      const postIndex = posts.findIndex((post) => post.id === input.id);
      if (postIndex === -1) {
        throw new Error("Post not found");
      }
      posts.splice(postIndex, 1);
      return { success: true };
    }
  ),
});

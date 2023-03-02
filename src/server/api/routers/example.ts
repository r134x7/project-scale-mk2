import { z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const exampleRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.example.findMany();
  }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),

  // tested and no unsafe type any return error appeared...
  post: protectedProcedure
      .input(
        z.object({
          id: z.string(),
        })
      )
      .mutation(({ input, ctx }) => {
    return ctx.prisma.example.create({
      data: {
        id: input.id,
      }
    })
  })
});

import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";

// need to create a mutation
export const newAmbitionRouter = createTRPCRouter({
  createAmbition: protectedProcedure
      .input(z.object({ text: z.string() }))
      .mutation(({ input }) => {

        // need to figure out how to mutate the user's ambition model...
          return {
            something: input,
          }
    }) 
});

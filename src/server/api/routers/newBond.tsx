import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";

// need to create a mutation
export const newBondRouter = createTRPCRouter({
  createBond: protectedProcedure
      .input(z.object({ 
        userId: z.string(),
        ambitionId: z.string(), 
        name: z.string(),
        bond: z.string(),
      }))
      .mutation(({ input, ctx }) => {

        return ctx.prisma.bonds.create({
          data: {
            userId: input.userId,
            ambitionId: input.name,
            name: input.name,
            bond: input.bond,
          }
        })
    }) 
});

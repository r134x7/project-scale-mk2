import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";

// need to create a mutation
export const newBondRouter = createTRPCRouter({
  createBond: protectedProcedure
      .input(z.object({ 
        bondName: z.string(),
        partnerId: z.string(),
      }))
      .mutation(({ input, ctx }) => {

        return ctx.prisma.bonds.create({
          data: {
            userId: ctx.session.user.id,
            partnerId: input.partnerId,
            bondName: input.bondName,
          }
        })
    }) 
});

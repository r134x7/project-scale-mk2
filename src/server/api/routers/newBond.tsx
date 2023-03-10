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
        /*
          bond is tied to the user,
          partnerId will query the ambitionId of the other person...
          .............
          
        */

        return ctx.prisma.bonds.create({
          data: {
            userId: ctx.session.user.id,
            partnerId: input.partnerId,
            bondName: input.bondName,
            friendCode: Math.floor(Math.random() * (999999-100000) + 100000).toString(),
          }
        })
    }) 
});

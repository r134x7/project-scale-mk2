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

          need to create another model? Message
          user creates a bond.
          sends a request to another user (using username but I don't know how duplicate usernames will be dealt with...)
          
          message is created for other user
          user will find in "inbox" a request. If they accept then user's bond gets a Boolean change, a bond is created for the other user... ambitions are shared... the inbox request gets deleted after request is accepted/declined, if declined the boolean doesn't change.
          
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

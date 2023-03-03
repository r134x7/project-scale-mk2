import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";

// need to create a mutation
export const newAmbitionRouter = createTRPCRouter({
  createAmbition: protectedProcedure
      .input(z.object({ 
        name: z.string(), 
        endValue: z.number(),
        dailyPlan: z.string(),
      }))
      .mutation(async ({ input, ctx }) => {

        return await ctx.prisma.ambitions.create({
          data: {
            userId: ctx.session.user.id,
            name: input.name,
            endValue: input.endValue,
            dailyPlan: input.dailyPlan,
            },
        })
    }) 
});

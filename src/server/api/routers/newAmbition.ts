import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";

// need to create a mutation
export const newAmbitionRouter = createTRPCRouter({
  createAmbition: protectedProcedure
      .input(z.object({ 
        // userId: z.string(),
        name: z.string(), 
        endValue: z.number(),
        dailyPlan: z.string(),
      }))
      .mutation(({ input, ctx }) => {

        return ctx.prisma.ambitions.create({
          data: {
            // userId: input.userId,
            name: input.name,
            endValue: input.endValue,
            dailyPlan: input.dailyPlan,
            userId: {
                connect: {
                  id: ctx.session.user.id,
                },
              },
            },
        })
    }) 
});

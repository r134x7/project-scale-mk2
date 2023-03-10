import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";

// need to create a mutation
export const newAmbitionRouter = createTRPCRouter({
  // POST
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
    }),

  // GET BY ID
  getAmbitionById: protectedProcedure
    .input(z.object({
      id: z.string()
    }))
    .query(({ input, ctx }) => {
        return ctx.prisma.ambitions.findUnique({
          where: {
            id: input.id,
          },
        })
    }),
  
  // GET ALL
  getAmbitions: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.ambitions.findMany({
      where: {
        userId: ctx.session.user.id
      }
    })
  }),
      
  // DELETE
  deleteAmbitions: protectedProcedure
    .input(z.object({
      id: z.string()
    }))
    .mutation(({ input, ctx }) => {
      return ctx.prisma.ambitions.delete({
        where: {
          id: input.id,
        }
      })
    })
  
  // UPDATE
});

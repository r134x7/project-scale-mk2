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
            userName: ctx.session.user.name,
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

  // GET MANY BY MANY IDS
  // need to include retrieving records as well
  getManyAmbitionsByIds: protectedProcedure
    .input(z.object({
      id: z.string().array()
    }))
    .query(({ input, ctx }) => {
      return ctx.prisma.ambitions.findMany({
        where: {
          id: { in: input.id },
        },
        include: {
          record: true,
        }
      })
    }),
  
  // GET ALL
  getAmbitions: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.ambitions.findMany({
      where: {
        userId: ctx.session.user.id
      },
      // include: {
      //   record: true,
      // }
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
    }),
  
  // UPDATE
  updateAmbitions: protectedProcedure
    .input(z.object({
      id: z.string(),
      endValue: z.number(),
      dailyPlan: z.string(),
    }))
    .mutation(({ input, ctx }) => {
      return ctx.prisma.ambitions.update({
        where: {
          id: input.id
        },
        data: {
          endValue: input.endValue,
          dailyPlan: input.dailyPlan,
        }
      })
    })
});

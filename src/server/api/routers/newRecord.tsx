import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const newRecordRouter = createTRPCRouter({
  // POST
  createRecord: protectedProcedure
      .input(z.object({ 
        ambitionId: z.string(),
        createdAt: z.date(),
        value: z.number(),
        journal: z.string(),
      }))
      .mutation(({ input, ctx }) => {

        // need to see where to query the ambitionId...
        return ctx.prisma.record.create({
          data: {
            ambitionId: input.ambitionId,
            createdAt: input.createdAt,
            value: input.value,
            journal: input.journal,
          },
        })
    }),
    
    // GET ALL
    getRecords: protectedProcedure
      .input(z.object({
        ambitionId: z.string(),
      }))
      .query(({ input, ctx }) => {
        return ctx.prisma.record.findMany({
          where: {
            ambitionId: input.ambitionId
          }
        })
      })
});

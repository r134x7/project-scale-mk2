import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const newRecordRouter = createTRPCRouter({
  createRecord: protectedProcedure
      .input(z.object({ 
        ambitionId: z.string(),
        value: z.number(),
        journal: z.string(),
      }))
      .mutation(({ input, ctx }) => {

        // need to see where to query the ambitionId...
        return ctx.prisma.record.create({
          data: {
            ambitionId: input.ambitionId,
            value: input.value,
            journal: input.journal,
          },
        })
    }) 
});

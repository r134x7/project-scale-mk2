import { createTRPCRouter } from "./trpc";
import { newAmbitionRouter } from "./routers/newAmbition";
import { newRecordRouter } from "./routers/newRecord";
import { newBondRouter } from "./routers/newBond";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  newAmbition: newAmbitionRouter,
  newRecord: newRecordRouter,
  newBond: newBondRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

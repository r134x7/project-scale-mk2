import { createTRPCRouter } from "./trpc";
import { exampleRouter } from "./routers/example";
import { newAmbitionRouter } from "./routers/newAmbition";
import { newRecordRouter } from "./routers/newRecord";
import { newBondRouter } from "./routers/newBond";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  newAmbition: newAmbitionRouter,
  newRecord: newRecordRouter,
  newBond: newBondRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

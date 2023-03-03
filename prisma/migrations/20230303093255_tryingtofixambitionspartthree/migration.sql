/*
  Warnings:

  - You are about to drop the column `userId` on the `Ambitions` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Ambitions" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "endValue" REAL NOT NULL,
    "dailyPlan" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Ambitions" ("createdAt", "dailyPlan", "endValue", "id", "name", "updatedAt") SELECT "createdAt", "dailyPlan", "endValue", "id", "name", "updatedAt" FROM "Ambitions";
DROP TABLE "Ambitions";
ALTER TABLE "new_Ambitions" RENAME TO "Ambitions";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

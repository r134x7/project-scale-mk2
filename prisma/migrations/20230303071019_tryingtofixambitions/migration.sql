/*
  Warnings:

  - Made the column `dailyPlan` on table `Ambitions` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `Ambitions` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Ambitions" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "endValue" REAL NOT NULL,
    "dailyPlan" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Ambitions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Ambitions" ("createdAt", "dailyPlan", "endValue", "id", "name", "updatedAt", "userId") SELECT "createdAt", "dailyPlan", "endValue", "id", "name", "updatedAt", "userId" FROM "Ambitions";
DROP TABLE "Ambitions";
ALTER TABLE "new_Ambitions" RENAME TO "Ambitions";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

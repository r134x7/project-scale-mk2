/*
  Warnings:

  - You are about to drop the `Example` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `userName` on table `Ambitions` required. This step will fail if there are existing NULL values in that column.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Example";
PRAGMA foreign_keys=on;

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
    "userName" TEXT NOT NULL,
    CONSTRAINT "Ambitions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Ambitions" ("createdAt", "dailyPlan", "endValue", "id", "name", "updatedAt", "userId", "userName") SELECT "createdAt", "dailyPlan", "endValue", "id", "name", "updatedAt", "userId", "userName" FROM "Ambitions";
DROP TABLE "Ambitions";
ALTER TABLE "new_Ambitions" RENAME TO "Ambitions";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

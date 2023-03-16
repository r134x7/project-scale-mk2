/*
  Warnings:

  - You are about to drop the column `friendCode` on the `Bonds` table. All the data in the column will be lost.
  - Added the required column `ambitionId` to the `Bonds` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Bonds" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "bondName" TEXT NOT NULL,
    "partnerId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ambitionId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Bonds_ambitionId_fkey" FOREIGN KEY ("ambitionId") REFERENCES "Ambitions" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Bonds_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Bonds" ("bondName", "createdAt", "id", "partnerId", "userId") SELECT "bondName", "createdAt", "id", "partnerId", "userId" FROM "Bonds";
DROP TABLE "Bonds";
ALTER TABLE "new_Bonds" RENAME TO "Bonds";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

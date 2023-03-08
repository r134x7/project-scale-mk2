/*
  Warnings:

  - You are about to drop the column `ambitionId` on the `Bonds` table. All the data in the column will be lost.
  - You are about to drop the column `bond` on the `Bonds` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Bonds` table. All the data in the column will be lost.
  - Added the required column `bondName` to the `Bonds` table without a default value. This is not possible if the table is not empty.
  - Added the required column `partnerId` to the `Bonds` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Bonds" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "bondName" TEXT NOT NULL,
    "partnerId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Bonds_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Bonds" ("createdAt", "id", "userId") SELECT "createdAt", "id", "userId" FROM "Bonds";
DROP TABLE "Bonds";
ALTER TABLE "new_Bonds" RENAME TO "Bonds";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

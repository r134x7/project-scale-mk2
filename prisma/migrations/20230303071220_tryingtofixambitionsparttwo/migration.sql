-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Bonds" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "ambitionId" TEXT NOT NULL,
    "name" TEXT,
    "bond" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Bonds_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Bonds" ("ambitionId", "bond", "createdAt", "id", "name", "userId") SELECT "ambitionId", "bond", "createdAt", "id", "name", "userId" FROM "Bonds";
DROP TABLE "Bonds";
ALTER TABLE "new_Bonds" RENAME TO "Bonds";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

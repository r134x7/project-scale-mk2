-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Record" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "ambitionId" TEXT NOT NULL,
    "value" REAL NOT NULL,
    "journal" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Record" ("ambitionId", "createdAt", "id", "journal", "value") SELECT "ambitionId", "createdAt", "id", "journal", "value" FROM "Record";
DROP TABLE "Record";
ALTER TABLE "new_Record" RENAME TO "Record";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

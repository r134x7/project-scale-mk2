-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Record" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "value" REAL NOT NULL,
    "journal" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ambitionId" TEXT NOT NULL,
    CONSTRAINT "Record_ambitionId_fkey" FOREIGN KEY ("ambitionId") REFERENCES "Ambitions" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Record" ("ambitionId", "createdAt", "id", "journal", "value") SELECT "ambitionId", "createdAt", "id", "journal", "value" FROM "Record";
DROP TABLE "Record";
ALTER TABLE "new_Record" RENAME TO "Record";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

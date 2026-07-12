/*
  Warnings:

  - Added the required column `request` to the `Trip` table without a default value. This is not possible if the table is not empty.
  - Added the required column `response` to the `Trip` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Trip` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Trip" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "destination" TEXT NOT NULL,
    "startDate" DATETIME,
    "endDate" DATETIME,
    "budget" INTEGER,
    "travelers" INTEGER NOT NULL DEFAULT 1,
    "status" TEXT NOT NULL DEFAULT 'PLANNING',
    "request" JSONB NOT NULL,
    "response" JSONB NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Trip_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Trip" ("budget", "createdAt", "destination", "endDate", "id", "startDate", "status", "travelers", "updatedAt") SELECT "budget", "createdAt", "destination", "endDate", "id", "startDate", "status", "travelers", "updatedAt" FROM "Trip";
DROP TABLE "Trip";
ALTER TABLE "new_Trip" RENAME TO "Trip";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

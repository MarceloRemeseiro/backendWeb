/*
  Warnings:

  - You are about to drop the column `Texto` on the `TempsJunts` table. All the data in the column will be lost.
  - Added the required column `texto` to the `TempsJunts` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_TempsJunts" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "titulo" TEXT NOT NULL,
    "subtitulo" TEXT,
    "imagen" TEXT NOT NULL,
    "texto" TEXT NOT NULL,
    "fecha" DATETIME NOT NULL,
    "web" BOOLEAN NOT NULL DEFAULT true,
    "link" TEXT
);
INSERT INTO "new_TempsJunts" ("fecha", "id", "imagen", "link", "subtitulo", "titulo", "web") SELECT "fecha", "id", "imagen", "link", "subtitulo", "titulo", "web" FROM "TempsJunts";
DROP TABLE "TempsJunts";
ALTER TABLE "new_TempsJunts" RENAME TO "TempsJunts";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

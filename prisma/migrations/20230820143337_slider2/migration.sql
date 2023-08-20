/*
  Warnings:

  - You are about to drop the column `subtitulo` on the `Slider2` table. All the data in the column will be lost.
  - You are about to drop the column `titulo` on the `Slider2` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Slider2" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "imagen" TEXT NOT NULL,
    "link" TEXT,
    "web" BOOLEAN NOT NULL DEFAULT true,
    "orden" INTEGER NOT NULL DEFAULT 1
);
INSERT INTO "new_Slider2" ("id", "imagen", "link", "orden", "web") SELECT "id", "imagen", "link", "orden", "web" FROM "Slider2";
DROP TABLE "Slider2";
ALTER TABLE "new_Slider2" RENAME TO "Slider2";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

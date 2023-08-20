/*
  Warnings:

  - You are about to drop the column `orden` on the `Slider2` table. All the data in the column will be lost.
  - You are about to drop the column `orden` on the `Slider1` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Slider2" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "imagen" TEXT NOT NULL,
    "link" TEXT,
    "web" BOOLEAN NOT NULL DEFAULT true
);
INSERT INTO "new_Slider2" ("id", "imagen", "link", "web") SELECT "id", "imagen", "link", "web" FROM "Slider2";
DROP TABLE "Slider2";
ALTER TABLE "new_Slider2" RENAME TO "Slider2";
CREATE TABLE "new_Slider1" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "titulo" TEXT,
    "subtitulo" TEXT,
    "imagen" TEXT NOT NULL,
    "link" TEXT,
    "web" BOOLEAN NOT NULL DEFAULT true
);
INSERT INTO "new_Slider1" ("id", "imagen", "link", "subtitulo", "titulo", "web") SELECT "id", "imagen", "link", "subtitulo", "titulo", "web" FROM "Slider1";
DROP TABLE "Slider1";
ALTER TABLE "new_Slider1" RENAME TO "Slider1";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

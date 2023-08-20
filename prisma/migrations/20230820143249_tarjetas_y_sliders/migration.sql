/*
  Warnings:

  - You are about to drop the `TajetaDer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TajetaIzq` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "TajetaDer";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "TajetaIzq";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Tajetas" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "titulo" TEXT NOT NULL,
    "subtitulo" TEXT NOT NULL,
    "imagen" TEXT NOT NULL,
    "texto" TEXT NOT NULL,
    "web" BOOLEAN NOT NULL DEFAULT true,
    "orden" INTEGER NOT NULL DEFAULT 1,
    "link" TEXT
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Slider1" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "titulo" TEXT,
    "subtitulo" TEXT,
    "imagen" TEXT NOT NULL,
    "link" TEXT,
    "web" BOOLEAN NOT NULL DEFAULT true,
    "orden" INTEGER NOT NULL DEFAULT 1
);
INSERT INTO "new_Slider1" ("id", "imagen", "link", "orden", "subtitulo", "titulo") SELECT "id", "imagen", "link", "orden", "subtitulo", "titulo" FROM "Slider1";
DROP TABLE "Slider1";
ALTER TABLE "new_Slider1" RENAME TO "Slider1";
CREATE TABLE "new_Slider2" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "titulo" TEXT,
    "subtitulo" TEXT,
    "imagen" TEXT NOT NULL,
    "link" TEXT,
    "web" BOOLEAN NOT NULL DEFAULT true,
    "orden" INTEGER NOT NULL DEFAULT 1
);
INSERT INTO "new_Slider2" ("id", "imagen", "link", "orden", "subtitulo", "titulo") SELECT "id", "imagen", "link", "orden", "subtitulo", "titulo" FROM "Slider2";
DROP TABLE "Slider2";
ALTER TABLE "new_Slider2" RENAME TO "Slider2";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

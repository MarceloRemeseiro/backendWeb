/*
  Warnings:

  - You are about to drop the column `web` on the `Series` table. All the data in the column will be lost.
  - You are about to drop the column `web` on the `Slider1` table. All the data in the column will be lost.
  - You are about to drop the column `web` on the `Slider2` table. All the data in the column will be lost.
  - You are about to drop the column `web` on the `TajetaDer` table. All the data in the column will be lost.
  - You are about to drop the column `web` on the `TajetaIzq` table. All the data in the column will be lost.
  - You are about to drop the column `web` on the `Actividades` table. All the data in the column will be lost.
  - You are about to drop the column `web` on the `TempJunts` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Series" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "titulo" TEXT,
    "subtitulo" TEXT,
    "imagen" TEXT NOT NULL,
    "link" TEXT
);
INSERT INTO "new_Series" ("id", "imagen", "link", "subtitulo", "titulo") SELECT "id", "imagen", "link", "subtitulo", "titulo" FROM "Series";
DROP TABLE "Series";
ALTER TABLE "new_Series" RENAME TO "Series";
CREATE TABLE "new_Slider1" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "titulo" TEXT,
    "subtitulo" TEXT,
    "imagen" TEXT NOT NULL,
    "link" TEXT
);
INSERT INTO "new_Slider1" ("id", "imagen", "link", "subtitulo", "titulo") SELECT "id", "imagen", "link", "subtitulo", "titulo" FROM "Slider1";
DROP TABLE "Slider1";
ALTER TABLE "new_Slider1" RENAME TO "Slider1";
CREATE TABLE "new_Slider2" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "titulo" TEXT,
    "subtitulo" TEXT,
    "imagen" TEXT NOT NULL,
    "link" TEXT
);
INSERT INTO "new_Slider2" ("id", "imagen", "link", "subtitulo", "titulo") SELECT "id", "imagen", "link", "subtitulo", "titulo" FROM "Slider2";
DROP TABLE "Slider2";
ALTER TABLE "new_Slider2" RENAME TO "Slider2";
CREATE TABLE "new_TajetaDer" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "titulo" TEXT NOT NULL,
    "subtitulo" TEXT NOT NULL,
    "imagen" TEXT NOT NULL,
    "link" TEXT
);
INSERT INTO "new_TajetaDer" ("id", "imagen", "link", "subtitulo", "titulo") SELECT "id", "imagen", "link", "subtitulo", "titulo" FROM "TajetaDer";
DROP TABLE "TajetaDer";
ALTER TABLE "new_TajetaDer" RENAME TO "TajetaDer";
CREATE TABLE "new_TajetaIzq" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "titulo" TEXT NOT NULL,
    "subtitulo" TEXT NOT NULL,
    "imagen" TEXT NOT NULL,
    "link" TEXT
);
INSERT INTO "new_TajetaIzq" ("id", "imagen", "link", "subtitulo", "titulo") SELECT "id", "imagen", "link", "subtitulo", "titulo" FROM "TajetaIzq";
DROP TABLE "TajetaIzq";
ALTER TABLE "new_TajetaIzq" RENAME TO "TajetaIzq";
CREATE TABLE "new_Actividades" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "titulo" TEXT NOT NULL,
    "subtitulo" TEXT NOT NULL,
    "imagen" TEXT NOT NULL,
    "Texto" TEXT NOT NULL,
    "link" TEXT
);
INSERT INTO "new_Actividades" ("Texto", "id", "imagen", "link", "subtitulo", "titulo") SELECT "Texto", "id", "imagen", "link", "subtitulo", "titulo" FROM "Actividades";
DROP TABLE "Actividades";
ALTER TABLE "new_Actividades" RENAME TO "Actividades";
CREATE TABLE "new_TempJunts" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "titulo" TEXT NOT NULL,
    "subtitulo" TEXT NOT NULL,
    "imagen" TEXT NOT NULL,
    "Texto" TEXT NOT NULL,
    "fecha" DATETIME NOT NULL,
    "link" TEXT
);
INSERT INTO "new_TempJunts" ("Texto", "fecha", "id", "imagen", "link", "subtitulo", "titulo") SELECT "Texto", "fecha", "id", "imagen", "link", "subtitulo", "titulo" FROM "TempJunts";
DROP TABLE "TempJunts";
ALTER TABLE "new_TempJunts" RENAME TO "TempJunts";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

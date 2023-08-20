-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Slider1" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "titulo" TEXT,
    "subtitulo" TEXT,
    "imagen" TEXT NOT NULL,
    "link" TEXT,
    "web" BOOLEAN NOT NULL
);
INSERT INTO "new_Slider1" ("id", "imagen", "link", "subtitulo", "titulo", "web") SELECT "id", "imagen", "link", "subtitulo", "titulo", "web" FROM "Slider1";
DROP TABLE "Slider1";
ALTER TABLE "new_Slider1" RENAME TO "Slider1";
CREATE TABLE "new_Actividades" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "titulo" TEXT NOT NULL,
    "subtitulo" TEXT NOT NULL,
    "imagen" TEXT NOT NULL,
    "Texto" TEXT NOT NULL,
    "link" TEXT,
    "web" BOOLEAN NOT NULL
);
INSERT INTO "new_Actividades" ("Texto", "id", "imagen", "link", "subtitulo", "titulo", "web") SELECT "Texto", "id", "imagen", "link", "subtitulo", "titulo", "web" FROM "Actividades";
DROP TABLE "Actividades";
ALTER TABLE "new_Actividades" RENAME TO "Actividades";
CREATE TABLE "new_TajetaDer" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "titulo" TEXT NOT NULL,
    "subtitulo" TEXT NOT NULL,
    "imagen" TEXT NOT NULL,
    "link" TEXT,
    "web" BOOLEAN NOT NULL
);
INSERT INTO "new_TajetaDer" ("id", "imagen", "link", "subtitulo", "titulo", "web") SELECT "id", "imagen", "link", "subtitulo", "titulo", "web" FROM "TajetaDer";
DROP TABLE "TajetaDer";
ALTER TABLE "new_TajetaDer" RENAME TO "TajetaDer";
CREATE TABLE "new_TajetaIzq" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "titulo" TEXT NOT NULL,
    "subtitulo" TEXT NOT NULL,
    "imagen" TEXT NOT NULL,
    "link" TEXT,
    "web" BOOLEAN NOT NULL
);
INSERT INTO "new_TajetaIzq" ("id", "imagen", "link", "subtitulo", "titulo", "web") SELECT "id", "imagen", "link", "subtitulo", "titulo", "web" FROM "TajetaIzq";
DROP TABLE "TajetaIzq";
ALTER TABLE "new_TajetaIzq" RENAME TO "TajetaIzq";
CREATE TABLE "new_Slider2" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "titulo" TEXT,
    "subtitulo" TEXT,
    "imagen" TEXT NOT NULL,
    "link" TEXT,
    "web" BOOLEAN NOT NULL
);
INSERT INTO "new_Slider2" ("id", "imagen", "link", "subtitulo", "titulo", "web") SELECT "id", "imagen", "link", "subtitulo", "titulo", "web" FROM "Slider2";
DROP TABLE "Slider2";
ALTER TABLE "new_Slider2" RENAME TO "Slider2";
CREATE TABLE "new_TempJunts" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "titulo" TEXT NOT NULL,
    "subtitulo" TEXT NOT NULL,
    "imagen" TEXT NOT NULL,
    "Texto" TEXT NOT NULL,
    "fecha" DATETIME NOT NULL,
    "link" TEXT,
    "web" BOOLEAN NOT NULL
);
INSERT INTO "new_TempJunts" ("Texto", "fecha", "id", "imagen", "link", "subtitulo", "titulo", "web") SELECT "Texto", "fecha", "id", "imagen", "link", "subtitulo", "titulo", "web" FROM "TempJunts";
DROP TABLE "TempJunts";
ALTER TABLE "new_TempJunts" RENAME TO "TempJunts";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

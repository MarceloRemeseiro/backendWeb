-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Series" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "titulo" TEXT,
    "subtitulo" TEXT,
    "imagen" TEXT NOT NULL,
    "link" TEXT,
    "web" BOOLEAN NOT NULL DEFAULT true,
    "orden" INTEGER NOT NULL DEFAULT 1
);
INSERT INTO "new_Series" ("id", "imagen", "link", "subtitulo", "titulo") SELECT "id", "imagen", "link", "subtitulo", "titulo" FROM "Series";
DROP TABLE "Series";
ALTER TABLE "new_Series" RENAME TO "Series";
CREATE TABLE "new_Slider2" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "titulo" TEXT,
    "subtitulo" TEXT,
    "imagen" TEXT NOT NULL,
    "link" TEXT,
    "orden" INTEGER NOT NULL DEFAULT 1
);
INSERT INTO "new_Slider2" ("id", "imagen", "link", "subtitulo", "titulo") SELECT "id", "imagen", "link", "subtitulo", "titulo" FROM "Slider2";
DROP TABLE "Slider2";
ALTER TABLE "new_Slider2" RENAME TO "Slider2";
CREATE TABLE "new_Slider1" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "titulo" TEXT,
    "subtitulo" TEXT,
    "imagen" TEXT NOT NULL,
    "link" TEXT,
    "orden" INTEGER NOT NULL DEFAULT 1
);
INSERT INTO "new_Slider1" ("id", "imagen", "link", "subtitulo", "titulo") SELECT "id", "imagen", "link", "subtitulo", "titulo" FROM "Slider1";
DROP TABLE "Slider1";
ALTER TABLE "new_Slider1" RENAME TO "Slider1";
CREATE TABLE "new_Actividades" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "titulo" TEXT NOT NULL,
    "textoTarjeta" TEXT,
    "imagen" TEXT NOT NULL,
    "texto" TEXT,
    "boton" BOOLEAN NOT NULL,
    "web" BOOLEAN NOT NULL,
    "orden" INTEGER NOT NULL DEFAULT 1
);
INSERT INTO "new_Actividades" ("boton", "id", "imagen", "orden", "texto", "textoTarjeta", "titulo", "web") SELECT "boton", "id", "imagen", "orden", "texto", "textoTarjeta", "titulo", "web" FROM "Actividades";
DROP TABLE "Actividades";
ALTER TABLE "new_Actividades" RENAME TO "Actividades";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

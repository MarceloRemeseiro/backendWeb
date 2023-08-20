/*
  Warnings:

  - You are about to drop the column `textoTargeta` on the `Actividades` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Actividades" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "titulo" TEXT NOT NULL,
    "textoTarjeta" TEXT,
    "imagen" TEXT NOT NULL,
    "texto" TEXT,
    "link" TEXT
);
INSERT INTO "new_Actividades" ("id", "imagen", "link", "texto", "titulo") SELECT "id", "imagen", "link", "texto", "titulo" FROM "Actividades";
DROP TABLE "Actividades";
ALTER TABLE "new_Actividades" RENAME TO "Actividades";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

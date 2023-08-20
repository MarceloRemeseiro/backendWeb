/*
  Warnings:

  - You are about to drop the column `subtitulo` on the `Actividades` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Actividades" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "titulo" TEXT NOT NULL,
    "textoTargeta" TEXT,
    "imagen" TEXT NOT NULL,
    "texto" TEXT,
    "link" BOOLEAN NOT NULL
);
INSERT INTO "new_Actividades" ("id", "imagen", "link", "texto", "titulo") SELECT "id", "imagen", "link", "texto", "titulo" FROM "Actividades";
DROP TABLE "Actividades";
ALTER TABLE "new_Actividades" RENAME TO "Actividades";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

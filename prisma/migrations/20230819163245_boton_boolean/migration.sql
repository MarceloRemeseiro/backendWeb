/*
  Warnings:

  - You are about to alter the column `boton` on the `Actividades` table. The data in that column could be lost. The data in that column will be cast from `String` to `Boolean`.
  - Made the column `boton` on table `Actividades` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Actividades" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "titulo" TEXT NOT NULL,
    "textoTarjeta" TEXT,
    "imagen" TEXT NOT NULL,
    "texto" TEXT,
    "boton" BOOLEAN NOT NULL
);
INSERT INTO "new_Actividades" ("boton", "id", "imagen", "texto", "textoTarjeta", "titulo") SELECT "boton", "id", "imagen", "texto", "textoTarjeta", "titulo" FROM "Actividades";
DROP TABLE "Actividades";
ALTER TABLE "new_Actividades" RENAME TO "Actividades";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

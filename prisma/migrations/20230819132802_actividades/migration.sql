/*
  Warnings:

  - You are about to drop the column `Texto` on the `Actividades` table. All the data in the column will be lost.
  - You are about to alter the column `link` on the `Actividades` table. The data in that column could be lost. The data in that column will be cast from `String` to `Boolean`.
  - Made the column `link` on table `Actividades` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Actividades" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "titulo" TEXT NOT NULL,
    "subtitulo" TEXT NOT NULL,
    "imagen" TEXT NOT NULL,
    "texto" TEXT,
    "link" BOOLEAN NOT NULL
);
INSERT INTO "new_Actividades" ("id", "imagen", "link", "subtitulo", "titulo") SELECT "id", "imagen", "link", "subtitulo", "titulo" FROM "Actividades";
DROP TABLE "Actividades";
ALTER TABLE "new_Actividades" RENAME TO "Actividades";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

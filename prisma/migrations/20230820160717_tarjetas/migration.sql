/*
  Warnings:

  - You are about to drop the `Tajetas` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Tajetas";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Tarjetas" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "titulo" TEXT NOT NULL,
    "subtitulo" TEXT NOT NULL,
    "imagen" TEXT NOT NULL,
    "texto" TEXT NOT NULL,
    "web" BOOLEAN NOT NULL DEFAULT true,
    "link" TEXT
);

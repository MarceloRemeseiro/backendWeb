-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Actividades" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "titulo" TEXT NOT NULL,
    "textoTarjeta" TEXT,
    "imagen" TEXT NOT NULL,
    "texto" TEXT,
    "boton" BOOLEAN NOT NULL,
    "orden" INTEGER NOT NULL DEFAULT 1
);
INSERT INTO "new_Actividades" ("boton", "id", "imagen", "texto", "textoTarjeta", "titulo") SELECT "boton", "id", "imagen", "texto", "textoTarjeta", "titulo" FROM "Actividades";
DROP TABLE "Actividades";
ALTER TABLE "new_Actividades" RENAME TO "Actividades";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

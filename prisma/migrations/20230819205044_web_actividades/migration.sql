-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Actividades" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "titulo" TEXT NOT NULL,
    "textoTarjeta" TEXT,
    "imagen" TEXT NOT NULL,
    "texto" TEXT,
    "boton" BOOLEAN NOT NULL DEFAULT false,
    "web" BOOLEAN NOT NULL DEFAULT true,
    "orden" INTEGER NOT NULL DEFAULT 1
);
INSERT INTO "new_Actividades" ("boton", "id", "imagen", "orden", "texto", "textoTarjeta", "titulo") SELECT "boton", "id", "imagen", "orden", "texto", "textoTarjeta", "titulo" FROM "Actividades";
DROP TABLE "Actividades";
ALTER TABLE "new_Actividades" RENAME TO "Actividades";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

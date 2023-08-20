-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_TempsJunts" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "titulo" TEXT NOT NULL,
    "subtitulo" TEXT,
    "imagen" TEXT NOT NULL,
    "Texto" TEXT NOT NULL,
    "fecha" DATETIME NOT NULL,
    "web" BOOLEAN NOT NULL DEFAULT true,
    "link" TEXT
);
INSERT INTO "new_TempsJunts" ("Texto", "fecha", "id", "imagen", "link", "subtitulo", "titulo", "web") SELECT "Texto", "fecha", "id", "imagen", "link", "subtitulo", "titulo", "web" FROM "TempsJunts";
DROP TABLE "TempsJunts";
ALTER TABLE "new_TempsJunts" RENAME TO "TempsJunts";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

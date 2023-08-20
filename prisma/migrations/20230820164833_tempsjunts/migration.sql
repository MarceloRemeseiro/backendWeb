-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_TempJunts" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "titulo" TEXT NOT NULL,
    "subtitulo" TEXT NOT NULL,
    "imagen" TEXT NOT NULL,
    "Texto" TEXT NOT NULL,
    "fecha" DATETIME NOT NULL,
    "web" BOOLEAN NOT NULL DEFAULT true,
    "link" TEXT
);
INSERT INTO "new_TempJunts" ("Texto", "fecha", "id", "imagen", "link", "subtitulo", "titulo") SELECT "Texto", "fecha", "id", "imagen", "link", "subtitulo", "titulo" FROM "TempJunts";
DROP TABLE "TempJunts";
ALTER TABLE "new_TempJunts" RENAME TO "TempJunts";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateTable
CREATE TABLE "Slider1" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "titulo" TEXT,
    "subtitulo" TEXT,
    "imagen" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "web" BOOLEAN NOT NULL
);

-- CreateTable
CREATE TABLE "Slider2" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "titulo" TEXT,
    "subtitulo" TEXT,
    "imagen" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "web" BOOLEAN NOT NULL
);

-- CreateTable
CREATE TABLE "TajetaIzq" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "titulo" TEXT NOT NULL,
    "subtitulo" TEXT NOT NULL,
    "imagen" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "web" BOOLEAN NOT NULL
);

-- CreateTable
CREATE TABLE "TajetaDer" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "titulo" TEXT NOT NULL,
    "subtitulo" TEXT NOT NULL,
    "imagen" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "web" BOOLEAN NOT NULL
);

-- CreateTable
CREATE TABLE "Actividades" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "titulo" TEXT NOT NULL,
    "subtitulo" TEXT NOT NULL,
    "imagen" TEXT NOT NULL,
    "Texto" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "web" BOOLEAN NOT NULL
);

-- CreateTable
CREATE TABLE "TempJunts" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "titulo" TEXT NOT NULL,
    "subtitulo" TEXT NOT NULL,
    "imagen" TEXT NOT NULL,
    "Texto" TEXT NOT NULL,
    "fecha" DATETIME NOT NULL,
    "link" TEXT NOT NULL,
    "web" BOOLEAN NOT NULL
);

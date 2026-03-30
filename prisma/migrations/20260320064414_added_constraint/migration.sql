/*
  Warnings:

  - A unique constraint covering the columns `[UserId,movieId]` on the table `WatchlistItem` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "WatchlistItem_UserId_movieId_key" ON "WatchlistItem"("UserId", "movieId");

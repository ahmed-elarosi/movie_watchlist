/*
  Warnings:

  - You are about to drop the column `UserId` on the `WatchlistItem` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,movieId]` on the table `WatchlistItem` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `WatchlistItem` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "WatchlistItem" DROP CONSTRAINT "WatchlistItem_UserId_fkey";

-- DropIndex
DROP INDEX "WatchlistItem_UserId_movieId_key";

-- AlterTable
ALTER TABLE "WatchlistItem" DROP COLUMN "UserId",
ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "WatchlistItem_userId_movieId_key" ON "WatchlistItem"("userId", "movieId");

-- AddForeignKey
ALTER TABLE "WatchlistItem" ADD CONSTRAINT "WatchlistItem_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

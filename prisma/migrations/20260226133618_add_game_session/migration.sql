/*
  Warnings:

  - A unique constraint covering the columns `[sessionId]` on the table `GameScore` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `sessionId` to the `GameScore` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "GameScore" ADD COLUMN     "sessionId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "GameSession" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "level" INTEGER NOT NULL,
    "gridSize" INTEGER NOT NULL,
    "timeLimit" INTEGER NOT NULL,
    "bombs" INTEGER NOT NULL,
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completed" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "GameSession_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "GameSession_userId_idx" ON "GameSession"("userId");

-- CreateIndex
CREATE INDEX "GameSession_startedAt_idx" ON "GameSession"("startedAt");

-- CreateIndex
CREATE UNIQUE INDEX "GameScore_sessionId_key" ON "GameScore"("sessionId");

-- AddForeignKey
ALTER TABLE "GameSession" ADD CONSTRAINT "GameSession_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameScore" ADD CONSTRAINT "GameScore_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "GameSession"("id") ON DELETE CASCADE ON UPDATE CASCADE;

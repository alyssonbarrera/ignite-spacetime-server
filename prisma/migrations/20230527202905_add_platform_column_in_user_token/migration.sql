/*
  Warnings:

  - Added the required column `platform` to the `UserToken` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserToken" ADD COLUMN     "platform" TEXT NOT NULL;

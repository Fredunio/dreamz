/*
  Warnings:

  - You are about to drop the column `image` on the `Dream` table. All the data in the column will be lost.
  - You are about to drop the `Comment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CommentLike` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Entity` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `EntityToTag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `EntityType` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Like` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Tag` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_entityId_fkey";

-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_parentId_fkey";

-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_userId_fkey";

-- DropForeignKey
ALTER TABLE "CommentLike" DROP CONSTRAINT "CommentLike_commentId_fkey";

-- DropForeignKey
ALTER TABLE "CommentLike" DROP CONSTRAINT "CommentLike_userId_fkey";

-- DropForeignKey
ALTER TABLE "Dream" DROP CONSTRAINT "Dream_id_fkey";

-- DropForeignKey
ALTER TABLE "Dreamon" DROP CONSTRAINT "Dreamon_id_fkey";

-- DropForeignKey
ALTER TABLE "Entity" DROP CONSTRAINT "Entity_type_fkey";

-- DropForeignKey
ALTER TABLE "EntityToTag" DROP CONSTRAINT "EntityToTag_entityId_fkey";

-- DropForeignKey
ALTER TABLE "EntityToTag" DROP CONSTRAINT "EntityToTag_tagName_fkey";

-- DropForeignKey
ALTER TABLE "Like" DROP CONSTRAINT "Like_entityId_fkey";

-- DropForeignKey
ALTER TABLE "Like" DROP CONSTRAINT "Like_userId_fkey";

-- AlterTable
ALTER TABLE "Dream" DROP COLUMN "image",
ADD COLUMN     "imageName" TEXT;

-- AlterTable
ALTER TABLE "Dreamon" ADD COLUMN     "isPrivate" BOOLEAN NOT NULL DEFAULT false;

-- DropTable
DROP TABLE "Comment";

-- DropTable
DROP TABLE "CommentLike";

-- DropTable
DROP TABLE "Entity";

-- DropTable
DROP TABLE "EntityToTag";

-- DropTable
DROP TABLE "EntityType";

-- DropTable
DROP TABLE "Like";

-- DropTable
DROP TABLE "Tag";

-- CreateTable
CREATE TABLE "DreamLike" (
    "userId" TEXT NOT NULL,
    "dreamId" TEXT NOT NULL,

    CONSTRAINT "DreamLike_pkey" PRIMARY KEY ("userId","dreamId")
);

-- CreateTable
CREATE TABLE "DreamonLike" (
    "userId" TEXT NOT NULL,
    "dreamonId" TEXT NOT NULL,

    CONSTRAINT "DreamonLike_pkey" PRIMARY KEY ("userId","dreamonId")
);

-- CreateTable
CREATE TABLE "DreamTag" (
    "name" VARCHAR(20) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DreamTag_pkey" PRIMARY KEY ("name")
);

-- CreateTable
CREATE TABLE "DreamToDreamTag" (
    "dreamId" TEXT NOT NULL,
    "tagId" TEXT NOT NULL,

    CONSTRAINT "DreamToDreamTag_pkey" PRIMARY KEY ("dreamId","tagId")
);

-- CreateTable
CREATE TABLE "DreamComment" (
    "id" TEXT NOT NULL,
    "content" VARCHAR(500) NOT NULL,
    "dreamId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "parentId" TEXT,

    CONSTRAINT "DreamComment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DreamCommentLike" (
    "userId" TEXT NOT NULL,
    "commentId" TEXT NOT NULL,

    CONSTRAINT "DreamCommentLike_pkey" PRIMARY KEY ("userId","commentId")
);

-- CreateIndex
CREATE UNIQUE INDEX "DreamTag_name_key" ON "DreamTag"("name");

-- AddForeignKey
ALTER TABLE "DreamLike" ADD CONSTRAINT "DreamLike_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DreamLike" ADD CONSTRAINT "DreamLike_dreamId_fkey" FOREIGN KEY ("dreamId") REFERENCES "Dream"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DreamonLike" ADD CONSTRAINT "DreamonLike_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DreamonLike" ADD CONSTRAINT "DreamonLike_dreamonId_fkey" FOREIGN KEY ("dreamonId") REFERENCES "Dreamon"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DreamToDreamTag" ADD CONSTRAINT "DreamToDreamTag_dreamId_fkey" FOREIGN KEY ("dreamId") REFERENCES "Dream"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DreamToDreamTag" ADD CONSTRAINT "DreamToDreamTag_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "DreamTag"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DreamComment" ADD CONSTRAINT "DreamComment_dreamId_fkey" FOREIGN KEY ("dreamId") REFERENCES "Dream"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DreamComment" ADD CONSTRAINT "DreamComment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DreamComment" ADD CONSTRAINT "DreamComment_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "DreamComment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DreamCommentLike" ADD CONSTRAINT "DreamCommentLike_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DreamCommentLike" ADD CONSTRAINT "DreamCommentLike_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "DreamComment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

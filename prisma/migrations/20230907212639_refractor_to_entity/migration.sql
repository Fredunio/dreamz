-- CreateTable
CREATE TABLE "Entity" (
    "entityId" STRING NOT NULL,
    "type" STRING NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Entity_pkey" PRIMARY KEY ("entityId")
);

-- CreateTable
CREATE TABLE "EntityType" (
    "typeName" STRING NOT NULL,

    CONSTRAINT "EntityType_pkey" PRIMARY KEY ("typeName")
);

-- CreateTable
CREATE TABLE "Dream" (
    "id" STRING NOT NULL,
    "name" STRING NOT NULL,
    "story" STRING NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" STRING NOT NULL,
    "categoryId" STRING NOT NULL
);

-- CreateTable
CREATE TABLE "Dreamon" (
    "id" STRING NOT NULL,
    "name" STRING NOT NULL,
    "image" STRING,
    "description" STRING NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" STRING NOT NULL,
    "categoryId" STRING NOT NULL
);

-- CreateTable
CREATE TABLE "Like" (
    "userId" STRING NOT NULL,
    "entityId" STRING NOT NULL,

    CONSTRAINT "Like_pkey" PRIMARY KEY ("userId","entityId")
);

-- CreateTable
CREATE TABLE "Tag" (
    "id" STRING NOT NULL,
    "name" STRING NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comment" (
    "id" STRING NOT NULL,
    "content" STRING NOT NULL,
    "entityId" STRING NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" STRING NOT NULL,
    "parentId" STRING,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CommentLike" (
    "userId" STRING NOT NULL,
    "commentId" STRING NOT NULL,

    CONSTRAINT "CommentLike_pkey" PRIMARY KEY ("userId","commentId")
);

-- CreateTable
CREATE TABLE "DreamCategory" (
    "id" STRING NOT NULL,
    "name" STRING NOT NULL,

    CONSTRAINT "DreamCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DreamonCategory" (
    "id" STRING NOT NULL,
    "name" STRING NOT NULL,

    CONSTRAINT "DreamonCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_EntityToTag" (
    "A" STRING NOT NULL,
    "B" STRING NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Dream_id_key" ON "Dream"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Dreamon_id_key" ON "Dreamon"("id");

-- CreateIndex
CREATE UNIQUE INDEX "_EntityToTag_AB_unique" ON "_EntityToTag"("A", "B");

-- CreateIndex
CREATE INDEX "_EntityToTag_B_index" ON "_EntityToTag"("B");

-- AddForeignKey
ALTER TABLE "Entity" ADD CONSTRAINT "Entity_type_fkey" FOREIGN KEY ("type") REFERENCES "EntityType"("typeName") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dream" ADD CONSTRAINT "Dream_id_fkey" FOREIGN KEY ("id") REFERENCES "Entity"("entityId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dream" ADD CONSTRAINT "Dream_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dream" ADD CONSTRAINT "Dream_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "DreamCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dreamon" ADD CONSTRAINT "Dreamon_id_fkey" FOREIGN KEY ("id") REFERENCES "Entity"("entityId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dreamon" ADD CONSTRAINT "Dreamon_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dreamon" ADD CONSTRAINT "Dreamon_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "DreamonCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_entityId_fkey" FOREIGN KEY ("entityId") REFERENCES "Entity"("entityId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_entityId_fkey" FOREIGN KEY ("entityId") REFERENCES "Entity"("entityId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Comment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommentLike" ADD CONSTRAINT "CommentLike_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommentLike" ADD CONSTRAINT "CommentLike_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "Comment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EntityToTag" ADD CONSTRAINT "_EntityToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "Entity"("entityId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EntityToTag" ADD CONSTRAINT "_EntityToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

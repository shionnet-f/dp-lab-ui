-- CreateTable
CREATE TABLE "EventLog" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ts" BIGINT NOT NULL,
    "page" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "meta" JSONB NOT NULL,
    "payload" JSONB NOT NULL
);

-- CreateIndex
CREATE INDEX "EventLog_createdAt_idx" ON "EventLog"("createdAt");

-- CreateIndex
CREATE INDEX "EventLog_page_idx" ON "EventLog"("page");

-- CreateIndex
CREATE INDEX "EventLog_type_idx" ON "EventLog"("type");

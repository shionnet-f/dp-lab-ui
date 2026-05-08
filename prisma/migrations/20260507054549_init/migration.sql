-- CreateTable
CREATE TABLE "EventLog" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "sessionId" TEXT,
    "participantId" TEXT,
    "phase" TEXT,
    "taskVersion" TEXT,
    "trialId" TEXT,
    "setIndex" INTEGER,
    "page" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "ts" BIGINT NOT NULL,
    "meta" JSONB NOT NULL,
    "payload" JSONB NOT NULL
);

-- CreateIndex
CREATE INDEX "EventLog_sessionId_idx" ON "EventLog"("sessionId");

-- CreateIndex
CREATE INDEX "EventLog_participantId_idx" ON "EventLog"("participantId");

-- CreateIndex
CREATE INDEX "EventLog_phase_idx" ON "EventLog"("phase");

-- CreateIndex
CREATE INDEX "EventLog_trialId_idx" ON "EventLog"("trialId");

-- CreateIndex
CREATE INDEX "EventLog_page_idx" ON "EventLog"("page");

-- CreateIndex
CREATE INDEX "EventLog_type_idx" ON "EventLog"("type");

-- CreateIndex
CREATE INDEX "EventLog_createdAt_idx" ON "EventLog"("createdAt");

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_EventLog" (
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
INSERT INTO "new_EventLog" ("createdAt", "id", "meta", "page", "participantId", "payload", "phase", "sessionId", "setIndex", "taskVersion", "trialId", "ts", "type") SELECT "createdAt", "id", "meta", "page", "participantId", "payload", "phase", "sessionId", "setIndex", "taskVersion", "trialId", "ts", "type" FROM "EventLog";
DROP TABLE "EventLog";
ALTER TABLE "new_EventLog" RENAME TO "EventLog";
CREATE INDEX "EventLog_sessionId_idx" ON "EventLog"("sessionId");
CREATE INDEX "EventLog_participantId_idx" ON "EventLog"("participantId");
CREATE INDEX "EventLog_phase_idx" ON "EventLog"("phase");
CREATE INDEX "EventLog_trialId_idx" ON "EventLog"("trialId");
CREATE INDEX "EventLog_page_idx" ON "EventLog"("page");
CREATE INDEX "EventLog_type_idx" ON "EventLog"("type");
CREATE INDEX "EventLog_createdAt_idx" ON "EventLog"("createdAt");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

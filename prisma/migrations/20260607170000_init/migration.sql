CREATE TABLE "Universe" (
  "id" TEXT NOT NULL,
  "slug" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "scenario" TEXT NOT NULL,
  "summary" TEXT NOT NULL,
  "generatedContent" JSONB NOT NULL,
  "divergenceScore" INTEGER NOT NULL,
  "chaosScore" INTEGER NOT NULL,
  "winner" TEXT,
  "parentUniverseId" TEXT,
  "promptVersion" TEXT NOT NULL,
  "model" TEXT NOT NULL,
  "views" INTEGER NOT NULL DEFAULT 0,
  "shares" INTEGER NOT NULL DEFAULT 0,
  "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMPTZ(3) NOT NULL,

  CONSTRAINT "Universe_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "Universe_slug_key" ON "Universe"("slug");
CREATE INDEX "Universe_createdAt_idx" ON "Universe"("createdAt");
CREATE INDEX "Universe_views_idx" ON "Universe"("views");
CREATE INDEX "Universe_shares_idx" ON "Universe"("shares");
CREATE INDEX "Universe_divergenceScore_idx" ON "Universe"("divergenceScore");
CREATE INDEX "Universe_chaosScore_idx" ON "Universe"("chaosScore");
CREATE INDEX "Universe_parentUniverseId_idx" ON "Universe"("parentUniverseId");
CREATE INDEX "Universe_chaosScore_divergenceScore_createdAt_idx" ON "Universe"("chaosScore", "divergenceScore", "createdAt");
CREATE INDEX "Universe_parentUniverseId_createdAt_idx" ON "Universe"("parentUniverseId", "createdAt");

ALTER TABLE "Universe"
  ADD CONSTRAINT "Universe_parentUniverseId_fkey"
  FOREIGN KEY ("parentUniverseId") REFERENCES "Universe"("id")
  ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE "Universe" ENABLE ROW LEVEL SECURITY;

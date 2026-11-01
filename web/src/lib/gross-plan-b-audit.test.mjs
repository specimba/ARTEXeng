import { GROSS_PLAN_B_RECORDS, grossPlanBCounts, grossPlanBRecord } from "./gross-plan-b-audit.ts";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const AUGUST_IDS = [
  "master-authority-20260817",
  "authority-does-not-increase",
  "lifecycle-stages-not-collapsed",
  "roadmap-candidate-20260823",
  "acceptance-independent-verifier",
  "models-do-not-authorize",
  "cooperative-channel-not-proof",
];

const OBSERVED_IDS = ["e3-receipt-chain", "nexus-osv5-review", "requested-v7-sources-absent"];

test("august drive sentences stay needs-review and do not change observed rows", () => {
  const counts = grossPlanBCounts();
  assert.equal(counts.observed, OBSERVED_IDS.length);
  assert.equal(counts.needsReview, GROSS_PLAN_B_RECORDS.length - OBSERVED_IDS.length);
  assert.equal(GROSS_PLAN_B_RECORDS.length, 18);

  for (const id of AUGUST_IDS) {
    const record = grossPlanBRecord(id);
    assert.ok(record, id);
    assert.equal(record.status, "needs-review");
    assert.equal(record.sessionId, "not stated in this file");
    assert.match(record.sourceFile, /2026-08-17|2026-08-23/);
    assert.match(record.timeLabel, /Aug 2026/);
    assert.ok(record.impact.length > 0);
    assert.ok(record.adapted.length > 0);
    assert.ok(record.unused.length > 0);
  }

  assert.deepEqual(
    GROSS_PLAN_B_RECORDS.filter((record) => record.status === "observed").map((record) => record.id),
    OBSERVED_IDS,
  );
  assert.equal(grossPlanBRecord("missing-august-id"), undefined);
});

const REQUIRED_FIELDS = [
  "id",
  "title",
  "lane",
  "sourceFile",
  "sessionId",
  "timeLabel",
  "status",
  "impact",
  "riskClass",
  "citation",
  "adapted",
  "unused",
];

test("grossPlanBCounts matches the array and every record has required fields", () => {
  const counts = grossPlanBCounts();
  const ids = GROSS_PLAN_B_RECORDS.map((record) => record.id);
  assert.equal(counts.observed + counts.needsReview, GROSS_PLAN_B_RECORDS.length);
  assert.equal(new Set(ids).size, ids.length);

  let observed = 0;
  let needsReview = 0;
  for (const record of GROSS_PLAN_B_RECORDS) {
    for (const field of REQUIRED_FIELDS) {
      assert.equal(typeof record[field], "string", `${record.id}.${field}`);
      assert.equal(record[field].trim().length > 0, true, `${record.id}.${field}`);
    }
    assert.equal(record.lane === "GROSS" || record.lane === "PLAN B", true, record.id);
    assert.equal(record.status === "observed" || record.status === "needs-review", true, record.id);
    if (record.status === "observed") observed += 1;
    else needsReview += 1;
    assert.equal(grossPlanBRecord(record.id)?.id, record.id);
  }

  for (const id of AUGUST_IDS) {
    assert.equal(ids.includes(id), true, id);
    assert.equal(grossPlanBRecord(id)?.status, "needs-review");
  }
  for (const id of OBSERVED_IDS) {
    assert.equal(grossPlanBRecord(id)?.status, "observed");
  }

  assert.equal(counts.observed, observed);
  assert.equal(counts.needsReview, needsReview);
  assert.equal(counts.observed, OBSERVED_IDS.length);
  assert.equal(grossPlanBRecord("missing-august-id"), undefined);
});

test("register list, unknown ids, and the sidebar entry are wired", () => {
  const webSrc = join(dirname(fileURLToPath(import.meta.url)), "..");
  const list = readFileSync(join(webSrc, "app/(main)/function/gross-plan-b/page.tsx"), "utf8");
  const detail = readFileSync(join(webSrc, "app/(main)/function/gross-plan-b/detail/page.tsx"), "utf8");
  const sidebar = readFileSync(join(webSrc, "navigation/sidebar/sidebar-items.ts"), "utf8");

  assert.match(list, /grossPlanBCounts\(\)/);
  assert.match(list, /href=\{`\/function\/gross-plan-b\/detail\?id=\$\{record\.id\}`\}/);
  assert.match(detail, /grossPlanBRecord\(params\.get\("id"\) \?\? ""\)/);
  assert.match(detail, /That audit id is not in the seeded register\./);
  assert.match(sidebar, /id: "gross-plan-b", title: "GROSS \/ PLAN B", url: "\/function\/gross-plan-b"/);
});

test("august rows do not store procedures, payloads, keys, or marker values", () => {
  const blob = AUGUST_IDS.map((id) => JSON.stringify(grossPlanBRecord(id))).join("\n");
  const forbidden = ["DB_STDOUT", "NXS-", "sk-", "api_key", "https://", "http://", "Frida", "prompt injection"];
  for (const needle of forbidden) {
    assert.equal(blob.includes(needle), false, needle);
  }
});

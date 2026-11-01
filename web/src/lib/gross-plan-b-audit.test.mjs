import { GROSS_PLAN_B_RECORDS, grossPlanBCounts, grossPlanBRecord } from "./gross-plan-b-audit.ts";
import assert from "node:assert/strict";
import test from "node:test";

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

test("august rows do not store procedures, payloads, keys, or marker values", () => {
  const blob = AUGUST_IDS.map((id) => JSON.stringify(grossPlanBRecord(id))).join("\n");
  const forbidden = ["DB_STDOUT", "NXS-", "sk-", "api_key", "https://", "http://", "Frida", "prompt injection"];
  for (const needle of forbidden) {
    assert.equal(blob.includes(needle), false, needle);
  }
});

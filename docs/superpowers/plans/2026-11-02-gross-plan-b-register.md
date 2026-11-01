# GROSS / PLAN B Register Increment Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Lock the existing 11-row GROSS / PLAN B register with a `node:test` file, then append seven `needs-review` rows whose sentences were read from the 17 August master and the 23 August roadmap.

**Architecture:** One seeded array, `GROSS_PLAN_B_RECORDS`, remains the register. `web/src/app/(main)/function/gross-plan-b/page.tsx` already maps that array and `grossPlanBCounts()`. `web/src/app/(main)/function/gross-plan-b/detail/page.tsx` already loads one row with `grossPlanBRecord(id)`. This increment does not add a page, a route, a sidebar item, a second ledger, or a capture watcher. The list at `/function/gross-plan-b` and the detail query `?id=` pick up new rows because they read the same array. `isObserved` stays a non-exported helper used only by `grossPlanBCounts`. New rows use status `needs-review` only, so the three observed ids stay `e3-receipt-chain`, `nexus-osv5-review`, and `requested-v7-sources-absent`.

**Tech Stack:** Next.js and TypeScript under `web/`. The web package has no vitest, jest, or `npm test` script. Existing library tests are `node:test` modules: `web/src/lib/activity-merge.test.mjs` and `web/src/lib/chat-mentions.test.mjs`. On Node v22.23.4, `node --test src/lib/activity-merge.test.mjs` from `web/` exits 0. Use that runner for `web/src/lib/gross-plan-b-audit.test.mjs`. A `MODULE_TYPELESS_PACKAGE_JSON` warning is already printed for those `.ts` imports and is not a failure. Do not add a test dependency and do not edit `web/package.json`.

## Global Constraints

- Session log outranks companion notes, which outrank clones. Clones are not the GROSS or PLAN B project.
- Every new claim needs source file, time, status observed or needs-review, one-line impact, and kept vs unused.
- Parent session.v4.jsonl is ~40MB and was only read to 10MB. Do not infer from unread bytes.
- NEXUS OS v7 is NOT established. 27 Oct v7 archives and three catch notes were absent from that folder.
- Do not copy prompts, payloads, keys, canary material, concealment steps, or repository URL lists into the plan's product code or into the register.
- Refused repos (name the class only): l1b3rt4s, heretic, obliteratus, g0dm0d3, sparse-jailbreak, payloadsallthethings, p4rs3lt0ngv3, saeg, pentest-product-demo, st3gg, t3mp3st.
- The six-lane proposal and the May public staging sentence are NOT settled doctrine. Do not add them as observed.
- Do not treat implemented capture watchers, a finished live exercise, or a reviewed E-3 witness body as settled. The E-3 row already records a VALID verdict citation only.
- Status on every row is only `observed` or `needs-review`. Do not add a third status. Do not change `isObserved`.
- Do not edit `web/src/app/(main)/function/gross-plan-b/page.tsx`, `web/src/app/(main)/function/gross-plan-b/detail/page.tsx`, or `web/src/navigation/sidebar/sidebar-items.ts`.
- Do not open a second ledger, a dashboard shell, or a capture watcher.
- Do not mix English agent-card copy from PR #1 into this change.
- The two August sources were read in full on this pass. `NEXUS_GROSS_PLANB_AEEG_MASTER_AUTHORITY_2026-08-17.md` is Drive file `1teLH3xVRjgUqUpMaH0sMVfgaB8CuHkqq` (3775 lines, read returned `truncated: false`). `REFERENCE_NEXUS_SECURITY_PROGRAM_EXECUTION_ROADMAP_2026-08-23.md` is Drive file `12Px63kzFlEvWBwJoVqbnkFVSPPPjypoK` (830 lines, read returned `truncated: false`). `list_folder` on `1dCa5s8TNUX7VLVZSvZYjnDRtQfXfz_BV` did not list either filename, and an exact-name search restricted to that folder id returned no file. The ids above came from a global title search. Citations must say that. Do not write that either file was a child of that folder.
- Neither August file states session `138e2cce-132d-48cb-8d29-0683b30d2d2e`. New rows use `sessionId: "not stated in this file"`. Leave `GROSS_PLAN_B_SESSION_ID` unchanged.
- Base commit for this work is `b5ef25d` on `cursor/gross-plan-b-audit-3219`. `GROSS_PLAN_B_RECORDS` has these 11 ids, in order: `parent-session-log`, `e3-receipt-chain`, `plan-b-layers`, `plan-b-drafts`, `mat-audit-20260723`, `repo-sweep`, `supabase-note`, `vault-intel-20260609`, `nexus-osv5-review`, `requested-v7-sources-absent`, `child-research-20261017`.

## File structure

- Create `web/src/lib/gross-plan-b-audit.test.mjs`. It imports `GROSS_PLAN_B_RECORDS`, `GROSS_PLAN_B_REFUSED`, `GROSS_PLAN_B_SESSION_ID`, `grossPlanBCounts`, and `grossPlanBRecord` from `./gross-plan-b-audit.ts`.
- Modify `web/src/lib/gross-plan-b-audit.ts` only in Task 2, by appending seven `GrossPlanBRecord` objects to `GROSS_PLAN_B_RECORDS` before the array's closing `];`.
- Leave `GrossPlanBRecord`, `GrossPlanBStatus`, `grossPlanBRecord`, `grossPlanBCounts`, `isObserved`, and `GROSS_PLAN_B_REFUSED` signatures as they are.

---

### Task 1: Lock the seeded register shape

**Files:**
- Create: `web/src/lib/gross-plan-b-audit.test.mjs`
- Modify: none
- Test: `web/src/lib/gross-plan-b-audit.test.mjs`

**Interfaces:**
- Consumes: `GROSS_PLAN_B_SESSION_ID: string`, `GROSS_PLAN_B_RECORDS: readonly GrossPlanBRecord[]`, `GROSS_PLAN_B_REFUSED: readonly string[]`, `grossPlanBRecord(id: string): GrossPlanBRecord | undefined`, `grossPlanBCounts(): { observed: number; needsReview: number }` from `web/src/lib/gross-plan-b-audit.ts`.
- Produces: a passing test file that later tasks extend. It does not export anything.

- [ ] **Step 1: Write the seeded-register test**

Create `web/src/lib/gross-plan-b-audit.test.mjs` with this exact content:

```javascript
import {
  GROSS_PLAN_B_RECORDS,
  GROSS_PLAN_B_REFUSED,
  GROSS_PLAN_B_SESSION_ID,
  grossPlanBCounts,
  grossPlanBRecord,
} from "./gross-plan-b-audit.ts";
import assert from "node:assert/strict";
import test from "node:test";

const SEEDED_IDS = [
  "parent-session-log",
  "e3-receipt-chain",
  "plan-b-layers",
  "plan-b-drafts",
  "mat-audit-20260723",
  "repo-sweep",
  "supabase-note",
  "vault-intel-20260609",
  "nexus-osv5-review",
  "requested-v7-sources-absent",
  "child-research-20261017",
];

const OBSERVED_IDS = ["e3-receipt-chain", "nexus-osv5-review", "requested-v7-sources-absent"];

const REQUIRED_TEXT = ["sourceFile", "timeLabel", "impact", "citation", "adapted", "unused"];

test("grossPlanBCounts matches the seeded array and every row is sourced", () => {
  const counts = grossPlanBCounts();
  const ids = GROSS_PLAN_B_RECORDS.map((record) => record.id);
  assert.equal(new Set(ids).size, ids.length);
  assert.equal(counts.observed + counts.needsReview, GROSS_PLAN_B_RECORDS.length);
  assert.equal(GROSS_PLAN_B_SESSION_ID, "138e2cce-132d-48cb-8d29-0683b30d2d2e");
  assert.deepEqual(
    [...GROSS_PLAN_B_REFUSED],
    [
      "l1b3rt4s",
      "heretic",
      "obliteratus",
      "g0dm0d3",
      "sparse-jailbreak",
      "payloadsallthethings",
      "p4rs3lt0ngv3",
      "saeg",
      "pentest-product-demo",
      "st3gg",
      "t3mp3st",
    ],
  );

  for (const id of SEEDED_IDS) {
    assert.equal(ids.includes(id), true, id);
  }

  const observed = [];
  for (const record of GROSS_PLAN_B_RECORDS) {
    assert.equal(record.status === "observed" || record.status === "needs-review", true, record.id);
    for (const field of REQUIRED_TEXT) {
      assert.equal(typeof record[field], "string", `${record.id}.${field}`);
      assert.equal(record[field].trim().length > 0, true, `${record.id}.${field}`);
    }
    assert.equal(record.title.trim().length > 0, true, record.id);
    assert.equal(record.lane === "GROSS" || record.lane === "PLAN B", true, record.id);
    assert.equal(record.riskClass.trim().length > 0, true, record.id);
    assert.equal(record.sessionId.trim().length > 0, true, record.id);
    if (record.status === "observed") observed.push(record.id);
  }

  assert.deepEqual(observed, OBSERVED_IDS);
  assert.equal(counts.observed, OBSERVED_IDS.length);
  assert.equal(counts.needsReview, GROSS_PLAN_B_RECORDS.length - OBSERVED_IDS.length);
  assert.equal(grossPlanBRecord("parent-session-log")?.id, "parent-session-log");
  assert.equal(grossPlanBRecord("missing-register-id"), undefined);
});
```

- [ ] **Step 2: Run the test**

Run from `web/`:

```bash
node --test src/lib/gross-plan-b-audit.test.mjs
```

Expected: exit code 0. The output includes `# tests 1`, `# pass 1`, `# fail 0`. A `MODULE_TYPELESS_PACKAGE_JSON` warning may appear and does not fail the run. This test already passes against commit `b5ef25d` because the 11 rows exist. It must still pass after Task 2 appends `needs-review` rows, because the length and the needs-review count are derived from `GROSS_PLAN_B_RECORDS` and the observed id list stays the three ids above.

- [ ] **Step 3: Commit**

From the repository root:

```bash
git add web/src/lib/gross-plan-b-audit.test.mjs
git commit -m "test: lock GROSS / PLAN B register field shape"
```

---

### Task 2: Append the seven August needs-review rows

**Files:**
- Modify: `web/src/lib/gross-plan-b-audit.ts` (append inside `GROSS_PLAN_B_RECORDS`, immediately after the `child-research-20261017` object and before `];`)
- Modify: `web/src/lib/gross-plan-b-audit.test.mjs`
- Test: `web/src/lib/gross-plan-b-audit.test.mjs`

**Interfaces:**
- Consumes: the Task 1 test and the `GrossPlanBRecord` fields `id`, `title`, `lane`, `sourceFile`, `sessionId`, `timeLabel`, `status`, `impact`, `riskClass`, `citation`, `adapted`, `unused`.
- Produces: seven extra array entries. `grossPlanBRecord` returns each one. `grossPlanBCounts()` returns `{ observed: 3, needsReview: 15 }` once `GROSS_PLAN_B_RECORDS.length` is 18.

- [ ] **Step 1: Write the failing August-row test**

Replace `web/src/lib/gross-plan-b-audit.test.mjs` with the Task 1 file plus the code below. Keep the Task 1 imports, `SEEDED_IDS`, `OBSERVED_IDS`, `REQUIRED_TEXT`, and the test `grossPlanBCounts matches the seeded array and every row is sourced`. Append these two tests at the end of the file:

```javascript
const AUGUST_ROWS = [
  {
    id: "master-authority-20260817",
    title: "17 August master is a parent only after live revalidation",
    lane: "GROSS",
    sourceFile: "NEXUS_GROSS_PLANB_AEEG_MASTER_AUTHORITY_2026-08-17.md",
    sessionId: "not stated in this file",
    timeLabel: "17 Aug 2026 (document date)",
    status: "needs-review",
    impact: "This file is a design parent, and its prose does not outrank a live checkout.",
    riskClass: "design authority",
    citation:
      "Global title search returned Drive file 1teLH3xVRjgUqUpMaH0sMVfgaB8CuHkqq. It was not a direct child of folder 1dCa5s8TNUX7VLVZSvZYjnDRtQfXfz_BV. Heading ARCHIVIST / NEXUS-GROSS-PLANB-AEEG-MASTER-002. Status line: CANONICAL PARENT DOCUMENT — implementation-ready after live-state revalidation. The file says no prose in the file outranks live runtime evidence, and it names four levels: historical evidence, current design authority, live runtime truth, and implementation receipt.",
    adapted: "Document date, self-described status, the four level names, and the live-runtime rule.",
    unused: "The implementation-run checklist, the origin conversation link, and mission steps.",
  },
  {
    id: "authority-does-not-increase",
    title: "A transformation must not increase source authority",
    lane: "GROSS",
    sourceFile: "NEXUS_GROSS_PLANB_AEEG_MASTER_AUTHORITY_2026-08-17.md",
    sessionId: "not stated in this file",
    timeLabel: "17 Aug 2026 (document date)",
    status: "needs-review",
    impact: "A summary, tool result, or model judgment is not recorded as a new grant of authority.",
    riskClass: "authority monotonicity",
    citation:
      'The same file states: "No transformation may increase the authority of its source." Section 52 states: "But none of them may grant themselves authority."',
    adapted: "Those two sentences.",
    unused: "Grant, ticket, and lease construction.",
  },
  {
    id: "lifecycle-stage-not-inferred",
    title: "A later data-lifecycle stage is not inferred from an earlier one",
    lane: "GROSS",
    sourceFile: "NEXUS_GROSS_PLANB_AEEG_MASTER_AUTHORITY_2026-08-17.md",
    sessionId: "not stated in this file",
    timeLabel: "17 Aug 2026 (document date)",
    status: "needs-review",
    impact: "Local staging is not treated as transmission, remote receipt, retention, or training use.",
    riskClass: "evidence ceiling",
    citation:
      "Section 4.1 says every data-handling claim names the exact stage, and a later stage is not inferred solely from an earlier one. Section 3.2 says the May evidence did not, by itself, establish that staged, transmitted, accepted, stored, retained, accessed, and used for training are the same claim.",
    adapted: "The non-inference rule and the stage names that must stay distinct.",
    unused:
      "The affirmative May staging sentence, which stays an unsettled proposal. Canary construction and watcher timing were not copied.",
  },
  {
    id: "roadmap-candidate-20260823",
    title: "23 August roadmap is a planning candidate, not one settled sequence",
    lane: "PLAN B",
    sourceFile: "REFERENCE_NEXUS_SECURITY_PROGRAM_EXECUTION_ROADMAP_2026-08-23.md",
    sessionId: "not stated in this file",
    timeLabel: "23 Aug 2026 (document date)",
    status: "needs-review",
    impact: "Neither gate list in this file is doctrine, and a worker completion claim does not promote a gate.",
    riskClass: "unsettled execution sequence",
    citation:
      "Global title search returned Drive file 12Px63kzFlEvWBwJoVqbnkFVSPPPjypoK. It was not a direct child of folder 1dCa5s8TNUX7VLVZSvZYjnDRtQfXfz_BV. Status line: Planning authority candidate; implementation begins only after Gate 0 live revalidation. Parent authority is the 17 August master filename. The file says no later gate may be promoted merely because a worker says it is complete. Section 0 and section 20 do not name the same gate sequence.",
    adapted:
      "The candidate status, the parent filename, the worker-completion rule, and the disagreement between the two lists.",
    unused:
      "Both gate lists, diagnostic commands, sentinel text, case numbers, and the five publication lanes. Those lanes were not recorded as a six-lane plan.",
  },
  {
    id: "acceptance-bars-differ",
    title: "Implemented and verified are separate acceptance bars",
    lane: "PLAN B",
    sourceFile: "REFERENCE_NEXUS_SECURITY_PROGRAM_EXECUTION_ROADMAP_2026-08-23.md",
    sessionId: "not stated in this file",
    timeLabel: "23 Aug 2026 (document date)",
    status: "needs-review",
    impact: "Code plus a same-run worker check is not recorded as independent verification.",
    riskClass: "evidence integrity",
    citation:
      "Section 21 says IMPLEMENTED requires code, tests, integration, and a live runtime receipt. VERIFIED requires an independent verifier or objective oracle, and the worker must not define the verifier during the same run. A failed run is evidence.",
    adapted: "Those two bars and the failed-run statement.",
    unused: "The stop-condition list and marker-registry checks.",
  },
  {
    id: "models-do-not-authorize",
    title: "Models advise and do not authorize",
    lane: "GROSS",
    sourceFile:
      "NEXUS_GROSS_PLANB_AEEG_MASTER_AUTHORITY_2026-08-17.md; REFERENCE_NEXUS_SECURITY_PROGRAM_EXECUTION_ROADMAP_2026-08-23.md",
    sessionId: "not stated in this file",
    timeLabel: "17 Aug 2026 and 23 Aug 2026 (document dates)",
    status: "needs-review",
    impact:
      "A classifier allow, or a report that the task succeeded, is not an authority increase or an effect-integrity proof.",
    riskClass: "authority monotonicity",
    citation:
      'Roadmap Law 7 says: "They do not create permissions." The same file says: "Models advise; TrustKernel authorizes." Law 6 says: "The intended task and an undesired hidden effect can both succeed." The 17 August master says models, agents, and semantic auditors are never their own authorization or evidence authority.',
    adapted: "Those role and law statements.",
    unused: "Training measures, detector names, and harness adaptation steps.",
  },
  {
    id: "cooperative-channel-not-proof",
    title: "A cooperative audit channel is not independent proof",
    lane: "PLAN B",
    sourceFile: "REFERENCE_NEXUS_SECURITY_PROGRAM_EXECUTION_ROADMAP_2026-08-23.md",
    sessionId: "not stated in this file",
    timeLabel: "23 Aug 2026 (document date)",
    status: "needs-review",
    impact: "A subject's own description of a workflow does not replace an independent observation.",
    riskClass: "evidence integrity",
    citation:
      "Section 2.2 names a Collaborative Audit Channel and says it improves experiment repeatability and ethics, but it does not replace independent proof.",
    adapted: "The channel name and that limit.",
    unused: "The ask-and-compare steps and the instrumentation placement list.",
  },
];

test("august drive sentences are needs-review rows", () => {
  assert.equal(GROSS_PLAN_B_RECORDS.length, 18);
  assert.deepEqual(grossPlanBCounts(), { observed: 3, needsReview: 15 });
  for (const expected of AUGUST_ROWS) {
    assert.deepEqual(grossPlanBRecord(expected.id), expected);
  }
  const observed = GROSS_PLAN_B_RECORDS.filter((record) => record.status === "observed").map(
    (record) => record.id,
  );
  assert.deepEqual(observed, OBSERVED_IDS);
});

test("august rows do not store procedures, payloads, keys, or the unsettled May sentence", () => {
  const stored = AUGUST_ROWS.map((row) => {
    const record = grossPlanBRecord(row.id);
    assert.ok(record, row.id);
    return JSON.stringify(record);
  });
  const blob = stored.join("\n");
  const forbidden = [
    "https://",
    "http://",
    "sk-",
    "api_key",
    "DB_STDOUT",
    "chatgpt.com",
    "broad, opaque local staging",
    "upload_queue",
  ];
  for (const needle of forbidden) {
    assert.equal(blob.includes(needle), false, needle);
  }
});
```

- [ ] **Step 2: Run the test to verify the new assertions fail**

Run from `web/`:

```bash
node --test src/lib/gross-plan-b-audit.test.mjs
```

Expected: exit code 1. The test `grossPlanBCounts matches the seeded array and every row is sourced` passes. The test `august drive sentences are needs-review rows` fails because `grossPlanBRecord("master-authority-20260817")` is `undefined` and `GROSS_PLAN_B_RECORDS.length` is 11, not 18.

- [ ] **Step 3: Append the seven records**

In `web/src/lib/gross-plan-b-audit.ts`, replace the closing of `GROSS_PLAN_B_RECORDS` so the `child-research-20261017` object stays the eleventh entry and these seven objects follow it. The replacement tail is:

```typescript
    unused:
      "Tool matrices, commands, and search queries. Reverse-engineering and exploit-class detail stopped at the risk class.",
  },
  {
    id: "master-authority-20260817",
    title: "17 August master is a parent only after live revalidation",
    lane: "GROSS",
    sourceFile: "NEXUS_GROSS_PLANB_AEEG_MASTER_AUTHORITY_2026-08-17.md",
    sessionId: "not stated in this file",
    timeLabel: "17 Aug 2026 (document date)",
    status: "needs-review",
    impact: "This file is a design parent, and its prose does not outrank a live checkout.",
    riskClass: "design authority",
    citation:
      "Global title search returned Drive file 1teLH3xVRjgUqUpMaH0sMVfgaB8CuHkqq. It was not a direct child of folder 1dCa5s8TNUX7VLVZSvZYjnDRtQfXfz_BV. Heading ARCHIVIST / NEXUS-GROSS-PLANB-AEEG-MASTER-002. Status line: CANONICAL PARENT DOCUMENT — implementation-ready after live-state revalidation. The file says no prose in the file outranks live runtime evidence, and it names four levels: historical evidence, current design authority, live runtime truth, and implementation receipt.",
    adapted: "Document date, self-described status, the four level names, and the live-runtime rule.",
    unused: "The implementation-run checklist, the origin conversation link, and mission steps.",
  },
  {
    id: "authority-does-not-increase",
    title: "A transformation must not increase source authority",
    lane: "GROSS",
    sourceFile: "NEXUS_GROSS_PLANB_AEEG_MASTER_AUTHORITY_2026-08-17.md",
    sessionId: "not stated in this file",
    timeLabel: "17 Aug 2026 (document date)",
    status: "needs-review",
    impact: "A summary, tool result, or model judgment is not recorded as a new grant of authority.",
    riskClass: "authority monotonicity",
    citation:
      'The same file states: "No transformation may increase the authority of its source." Section 52 states: "But none of them may grant themselves authority."',
    adapted: "Those two sentences.",
    unused: "Grant, ticket, and lease construction.",
  },
  {
    id: "lifecycle-stage-not-inferred",
    title: "A later data-lifecycle stage is not inferred from an earlier one",
    lane: "GROSS",
    sourceFile: "NEXUS_GROSS_PLANB_AEEG_MASTER_AUTHORITY_2026-08-17.md",
    sessionId: "not stated in this file",
    timeLabel: "17 Aug 2026 (document date)",
    status: "needs-review",
    impact: "Local staging is not treated as transmission, remote receipt, retention, or training use.",
    riskClass: "evidence ceiling",
    citation:
      "Section 4.1 says every data-handling claim names the exact stage, and a later stage is not inferred solely from an earlier one. Section 3.2 says the May evidence did not, by itself, establish that staged, transmitted, accepted, stored, retained, accessed, and used for training are the same claim.",
    adapted: "The non-inference rule and the stage names that must stay distinct.",
    unused:
      "The affirmative May staging sentence, which stays an unsettled proposal. Canary construction and watcher timing were not copied.",
  },
  {
    id: "roadmap-candidate-20260823",
    title: "23 August roadmap is a planning candidate, not one settled sequence",
    lane: "PLAN B",
    sourceFile: "REFERENCE_NEXUS_SECURITY_PROGRAM_EXECUTION_ROADMAP_2026-08-23.md",
    sessionId: "not stated in this file",
    timeLabel: "23 Aug 2026 (document date)",
    status: "needs-review",
    impact: "Neither gate list in this file is doctrine, and a worker completion claim does not promote a gate.",
    riskClass: "unsettled execution sequence",
    citation:
      "Global title search returned Drive file 12Px63kzFlEvWBwJoVqbnkFVSPPPjypoK. It was not a direct child of folder 1dCa5s8TNUX7VLVZSvZYjnDRtQfXfz_BV. Status line: Planning authority candidate; implementation begins only after Gate 0 live revalidation. Parent authority is the 17 August master filename. The file says no later gate may be promoted merely because a worker says it is complete. Section 0 and section 20 do not name the same gate sequence.",
    adapted:
      "The candidate status, the parent filename, the worker-completion rule, and the disagreement between the two lists.",
    unused:
      "Both gate lists, diagnostic commands, sentinel text, case numbers, and the five publication lanes. Those lanes were not recorded as a six-lane plan.",
  },
  {
    id: "acceptance-bars-differ",
    title: "Implemented and verified are separate acceptance bars",
    lane: "PLAN B",
    sourceFile: "REFERENCE_NEXUS_SECURITY_PROGRAM_EXECUTION_ROADMAP_2026-08-23.md",
    sessionId: "not stated in this file",
    timeLabel: "23 Aug 2026 (document date)",
    status: "needs-review",
    impact: "Code plus a same-run worker check is not recorded as independent verification.",
    riskClass: "evidence integrity",
    citation:
      "Section 21 says IMPLEMENTED requires code, tests, integration, and a live runtime receipt. VERIFIED requires an independent verifier or objective oracle, and the worker must not define the verifier during the same run. A failed run is evidence.",
    adapted: "Those two bars and the failed-run statement.",
    unused: "The stop-condition list and marker-registry checks.",
  },
  {
    id: "models-do-not-authorize",
    title: "Models advise and do not authorize",
    lane: "GROSS",
    sourceFile:
      "NEXUS_GROSS_PLANB_AEEG_MASTER_AUTHORITY_2026-08-17.md; REFERENCE_NEXUS_SECURITY_PROGRAM_EXECUTION_ROADMAP_2026-08-23.md",
    sessionId: "not stated in this file",
    timeLabel: "17 Aug 2026 and 23 Aug 2026 (document dates)",
    status: "needs-review",
    impact:
      "A classifier allow, or a report that the task succeeded, is not an authority increase or an effect-integrity proof.",
    riskClass: "authority monotonicity",
    citation:
      'Roadmap Law 7 says: "They do not create permissions." The same file says: "Models advise; TrustKernel authorizes." Law 6 says: "The intended task and an undesired hidden effect can both succeed." The 17 August master says models, agents, and semantic auditors are never their own authorization or evidence authority.',
    adapted: "Those role and law statements.",
    unused: "Training measures, detector names, and harness adaptation steps.",
  },
  {
    id: "cooperative-channel-not-proof",
    title: "A cooperative audit channel is not independent proof",
    lane: "PLAN B",
    sourceFile: "REFERENCE_NEXUS_SECURITY_PROGRAM_EXECUTION_ROADMAP_2026-08-23.md",
    sessionId: "not stated in this file",
    timeLabel: "23 Aug 2026 (document date)",
    status: "needs-review",
    impact: "A subject's own description of a workflow does not replace an independent observation.",
    riskClass: "evidence integrity",
    citation:
      "Section 2.2 names a Collaborative Audit Channel and says it improves experiment repeatability and ethics, but it does not replace independent proof.",
    adapted: "The channel name and that limit.",
    unused: "The ask-and-compare steps and the instrumentation placement list.",
  },
];
```

Copy each object into the TypeScript array exactly as written in `AUGUST_ROWS`. Do not add an eighth row. Do not change the first eleven objects. Do not export a second array.

- [ ] **Step 4: Run the test to verify it passes**

Run from `web/`:

```bash
node --test src/lib/gross-plan-b-audit.test.mjs
```

Expected: exit code 0. The output includes `# tests 3`, `# pass 3`, `# fail 0`.

- [ ] **Step 5: Commit**

From the repository root:

```bash
git add web/src/lib/gross-plan-b-audit.ts web/src/lib/gross-plan-b-audit.test.mjs
git commit -m "feat: add August authority sentences as needs-review rows"
```

---

## Self-review

Spec coverage: Task 1 locks `grossPlanBCounts` against the array, the required non-empty fields, and the status union. Task 2 adds only sentences read from the two August files, all `needs-review`, with source, time, impact, adapted, and unused. Observed ids stay the E-3 VALID citation, the v5 opening, and the absent v7 search. The May public staging sentence is named in `unused` and blocked by the needle `broad, opaque local staging`. Gate lists and publication lanes stay out of the stored citation text. No watcher, second ledger, or page edit is required.

Placeholder scan: the tasks contain the test source, the record objects, the commands, and the expected exit codes.

Type consistency: record fields match `GrossPlanBRecord`. `grossPlanBCounts` returns `observed` and `needsReview`. `grossPlanBRecord` looks up `id`. `isObserved` is not imported.

## Execution handoff

Plan complete and saved to `docs/superpowers/plans/2026-11-02-gross-plan-b-register.md`. Two execution options:

**1. Subagent-Driven (recommended)** - I dispatch a fresh subagent per task, review between tasks, fast iteration

**2. Inline Execution** - Execute tasks in this session using executing-plans, batch execution with checkpoints

**Which approach?**

This planning pass stops here. It does not implement Task 1 or Task 2.

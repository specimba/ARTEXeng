# August GROSS Register Sentences Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add seven read-supported sentences from the 17 August master and the 23 August roadmap to the existing GROSS / PLAN B register as `needs-review`.

**Architecture:** The register is the array `GROSS_PLAN_B_RECORDS` in `web/src/lib/gross-plan-b-audit.ts`. `web/src/app/(main)/function/gross-plan-b/page.tsx` and `web/src/app/(main)/function/gross-plan-b/detail/page.tsx` already map that array, so a new sentence is a new object plus a node test. This plan does not add a route, a watcher, or a second data store.

**Tech Stack:** TypeScript register records, Next.js pages left unchanged, `node:test` via `node --test`, Biome line width 120.

## Global Constraints

- Status values are only `observed` and `needs-review`.
- Every new August row uses `needs-review`.
- Do not upgrade the 20 Oct 2026 E-3 log or the 9–10 Oct 2026 v5 review opening.
- The six-lane plan and the May staging sentence are unsettled proposals.
- NEXUS OS v7 behavior is not established.
- Do not put prompts, payloads, keys, canary material, concealment steps, or repository URL lists into the product.
- Do not adapt l1b3rt4s, heretic, obliteratus, g0dm0d3, sparse-jailbreak, payloadsallthethings, p4rs3lt0ngv3, saeg, pentest-product-demo, st3gg, or t3mp3st.
- Parent `session.v4.jsonl` was only read to a 10 MB cap. Do not infer behavior from unread bytes.
- Drive file ids come from search. A 403 is a permission fact and is not retried.
- Branch base is `cursor/gross-plan-b-audit-3219`. Do not stack this work on ARTEXeng PR #1.
- This plan is already applied on `cursor/gross-register-august-docs-dc7a`. Do not append these seven rows a second time.

---

### Task 1: August needs-review rows

**Files:**
- Modify: `web/src/lib/gross-plan-b-audit.ts` (insert immediately after the `child-research-20261017` object, before the array close)
- Test: `web/src/lib/gross-plan-b-audit.test.mjs`
- Do not modify: `web/src/app/(main)/function/gross-plan-b/page.tsx`
- Do not modify: `web/src/app/(main)/function/gross-plan-b/detail/page.tsx`

**Interfaces:**
- Consumes: `GrossPlanBRecord`, `GROSS_PLAN_B_RECORDS`, `grossPlanBRecord(id: string): GrossPlanBRecord | undefined`, `grossPlanBCounts(): { observed: number; needsReview: number }`
- Produces: record ids `master-authority-20260817`, `authority-does-not-increase`, `lifecycle-stages-not-collapsed`, `roadmap-candidate-20260823`, `acceptance-independent-verifier`, `models-do-not-authorize`, `cooperative-channel-not-proof`, each with `status: "needs-review"`

- [x] **Step 1: Write the failing test**

```javascript
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
```

- [x] **Step 2: Run the test to verify it fails before the rows exist**

Run: `node --test src/lib/gross-plan-b-audit.test.mjs` from `web/`

Expected before the seven objects exist: FAIL because `GROSS_PLAN_B_RECORDS.length` is 11, not 18.

- [x] **Step 3: Append the seven records**

Insert these objects after `child-research-20261017` and before `];`:

```typescript
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
      "Drive file 1teLH3xVRjgUqUpMaH0sMVfgaB8CuHkqq, read in full (3,775 lines). Heading ARCHIVIST / NEXUS-GROSS-PLANB-AEEG-MASTER-002. Status line: CANONICAL PARENT DOCUMENT — implementation-ready after live-state revalidation. It says no prose in the file outranks live runtime evidence, and it names four levels: historical evidence, current design authority, live runtime truth, and implementation receipt.",
    adapted: "Document date, self-described status, the four level names, and the live-runtime rule.",
    unused:
      "Mission sequence, scenario expected results, marker format, credential-use steps, and the external reference list.",
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
      "The same file states: No transformation may increase the authority of its source. It also states that no model judgment, summary, compaction, repeated use, trusted-tool reflection, agent consensus, cached tool definition, provider continuation state, task handle, OAuth scope, scanner result, or successful prior execution may grant itself more authority than its authenticated origin possessed.",
    adapted: "That invariant and the listed non-sources of authority.",
    unused: "Grant, ticket, and lease construction.",
  },
  {
    id: "lifecycle-stages-not-collapsed",
    title: "A later data-lifecycle stage is not inferred from an earlier one",
    lane: "GROSS",
    sourceFile: "NEXUS_GROSS_PLANB_AEEG_MASTER_AUTHORITY_2026-08-17.md",
    sessionId: "not stated in this file",
    timeLabel: "17 Aug 2026 (document date)",
    status: "needs-review",
    impact: "Local staging is not treated as transmission, remote receipt, retention, or training use.",
    riskClass: "evidence ceiling",
    citation:
      "Section 4.1 says every data-handling claim names the exact stage, and a later stage is not inferred solely from an earlier one. Section 3.2 says the May evidence did not, by itself, establish for every queued artifact that staged, transmitted, accepted, stored, retained, accessed, and used for training are the same claim.",
    adapted: "The non-inference rule and the stage names that must stay distinct.",
    unused:
      "The affirmative May staging sentence, which stays an unsettled proposal. Queue paths, marker bytes, and watcher timing were not copied.",
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
      "Drive file 12Px63kzFlEvWBwJoVqbnkFVSPPPjypoK, read in full (830 lines). Status line: Planning authority candidate; implementation begins only after Gate 0 live revalidation. Parent authority is the 17 August master filename. The file says no later gate may be promoted merely because a worker says it is complete. Section 0 and section 20 do not list the same gate sequence.",
    adapted:
      "The candidate status, the parent filename, the worker-completion rule, and the disagreement between the two lists.",
    unused:
      "Both gate lists, diagnostic commands, sentinel text, case numbers, and the five publication lanes. Those lanes were not recorded as a six-lane plan.",
  },
  {
    id: "acceptance-independent-verifier",
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
    unused: "Stop-condition handling and marker-registry checks.",
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
      "Roadmap Law 7 says a learned allow does not increase authority, and that learned classifiers do not create permissions. The same file says models advise and TrustKernel authorizes. Law 6 says task success does not imply effect integrity. The 17 August master says models, agents, and semantic auditors are never their own authorization or evidence authority.",
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
    unused: "The compare workflow steps and the instrumentation placement list.",
  },
```

- [x] **Step 4: Run the test to verify it passes**

Run: `node --test src/lib/gross-plan-b-audit.test.mjs` from `web/`

Expected: 2 passed, 0 failed.

- [x] **Step 5: Commit the register and the test**

```bash
git add web/src/lib/gross-plan-b-audit.ts web/src/lib/gross-plan-b-audit.test.mjs
git commit -m "feat: record August GROSS authority sentences as needs-review"
```

### Task 2: Claim-register subagent

**Files:**
- Create: `.cursor/agents/gross-claim-register.md`

**Interfaces:**
- Consumes: the same `GrossPlanBRecord` fields Task 1 writes
- Produces: a project subagent named `gross-claim-register` that appends rows only from text it has read

- [x] **Step 1: Write the subagent**

```markdown
---
name: gross-claim-register
description: Adds GROSS / PLAN B register rows only from text it has read, with status observed or needs-review. Use proactively when a Drive or session source should become a register row. Refuses procedures, payloads, keys, canary material, concealment steps, and the forbidden repositories.
---

You add rows to the ARTEXeng GROSS / PLAN B register and nothing else.

When invoked:

1. Read the source yourself. A Drive file id must come from a fresh search, a folder listing, or a URL the user pasted. Do not invent an id or reuse one from memory.
2. Add a row only for a sentence tied to text you actually read. If the read was truncated, do not infer the unread part.
3. Set status to `observed` or `needs-review`. A new row is `needs-review` unless the sentence is a direct quotation of an already-observed fact from the 20 Oct 2026 E-3 log or the 9–10 Oct 2026 v5 review opening. Do not upgrade those two rows.
4. Each row needs a source file name, a date when the source states one, status, a one-line impact, what was kept, and what was left unused.
5. Refuse procedures, prompts, payloads, keys, canary or marker values, concealment steps, and repository URL lists. A risk class may be named. Stop there.
6. Do not adapt these repositories: l1b3rt4s, heretic, obliteratus, g0dm0d3, sparse-jailbreak, payloadsallthethings, p4rs3lt0ngv3, saeg, pentest-product-demo, st3gg, t3mp3st.
7. Do not treat the six-lane plan, the May staging sentence, NEXUS OS v7 behavior, implemented capture watchers, a finished live exercise, or a reviewed E-3 witness as settled.
8. The parent session log past the 10 MB cap is unread. Do not infer behavior from unread bytes.
9. Edit `web/src/lib/gross-plan-b-audit.ts` by appending `GrossPlanBRecord` entries. Do not change the page renderer to add a row. Extend `web/src/lib/gross-plan-b-audit.test.mjs`.
10. From `web/`, run `node --test src/lib/gross-plan-b-audit.test.mjs` and keep the existing observed ids unchanged.

This agent only maintains the register. Do not build a Cursor SDK integration, start a shell loop, or start a security review.
```

- [x] **Step 2: Commit the subagent with this plan**

```bash
git add .cursor/agents/gross-claim-register.md docs/superpowers/plans/2026-11-02-gross-register-august-docs.md
git commit -m "docs: add the August register plan and claim-register subagent"
```

The page files stay untouched because they render `GROSS_PLAN_B_RECORDS`. Counts become 3 observed and 15 needs-review.

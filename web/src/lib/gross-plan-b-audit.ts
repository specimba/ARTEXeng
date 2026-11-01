// Seeded operator register. Claims below were read from Google Drive.
// Prompts, payloads, keys, canary material, and procedures are intentionally absent.

export const GROSS_PLAN_B_SESSION_ID = "138e2cce-132d-48cb-8d29-0683b30d2d2e";

export type GrossPlanBStatus = "observed" | "needs-review";

export interface GrossPlanBRecord {
  id: string;
  title: string;
  lane: "GROSS" | "PLAN B";
  sourceFile: string;
  sessionId: string;
  timeLabel: string;
  status: GrossPlanBStatus;
  impact: string;
  riskClass: string;
  citation: string;
  adapted: string;
  unused: string;
}

export const GROSS_PLAN_B_RECORDS: readonly GrossPlanBRecord[] = [
  {
    id: "parent-session-log",
    title: "Parent session log is present and was not fully read",
    lane: "GROSS",
    sourceFile: "dsh-session-session-138e2cce-132d-48cb-8d29-0683b30d2d2e/session.v4.jsonl",
    sessionId: GROSS_PLAN_B_SESSION_ID,
    timeLabel: "28 Oct 2026, 04:14 Europe/Istanbul (Drive modified time)",
    status: "needs-review",
    impact: "Later parent-session turns are not treated as verified.",
    riskClass: "incomplete evidence",
    citation:
      "Drive file 1KYyPxcEVhE7tN6ujSUdrDNOqhEB1nCqm, 39,622,834 bytes, modified 2026-10-28T01:14:32Z. The reader rejected it above 10,485,760 bytes. The folder also holds files/ and five subagent logs.",
    adapted: "Presence, size, modified time, and the read limit.",
    unused: "The unread parent bytes. No behavior was inferred from them.",
  },
  {
    id: "e3-receipt-chain",
    title: "E-3 receipt chain rechecked as valid",
    lane: "PLAN B",
    sourceFile: "subagents/55d68692-3c4b-401e-854e-d86074294860/session.v4.jsonl",
    sessionId: GROSS_PLAN_B_SESSION_ID,
    timeLabel: "20 Oct 2026, 12:25 Europe/Istanbul",
    status: "observed",
    impact: "A non-author check reported seven linked receipts and a matching independent recompute.",
    riskClass: "evidence integrity",
    citation:
      "Child session labeled “E-3 offline non-author audit”, parent session-138e2cce-132d-48cb-8d29-0683b30d2d2e. The log says the stock verifier returned VALID for exp-20261020-e3-etw-witness, with seven receipts and a reproduced head.",
    adapted: "Verdict, receipt count, experiment id, and the Istanbul time written in the log.",
    unused: "Witness text, content reconstruction, and probe-file internals.",
  },
  {
    id: "plan-b-layers",
    title: "Plan B manual names four local capture layers",
    lane: "PLAN B",
    sourceFile: "plan-b/README.md",
    sessionId: "not stated in this file",
    timeLabel: "28 Oct 2026, 05:14 Europe/Istanbul (Drive modified time; no run clock in the manual)",
    status: "needs-review",
    impact: "Process, filesystem, network, and resource watchers are described and are not implemented here.",
    riskClass: "covert local capture",
    citation:
      "Drive file 1xxTG7ETqzTCk_kEBcoA6io_HaxP1yiUh. The manual calls Plan B an out-of-process local watcher for the GROSS project.",
    adapted: "The four layer names and the risk class.",
    unused: "Launch commands, concealment instructions, canary material, and local paths.",
  },
  {
    id: "plan-b-drafts",
    title: "Four Plan B protocols are still marked draft",
    lane: "PLAN B",
    sourceFile:
      "plan-b/docs/PLAN-B-EI_EVALUATION_INTEGRITY.md, PLAN-B-IR_INCIDENT_RESPONSE.md, PLAN-B-DUAL_CHANNEL_AUDIT.md, PLAN-B-TOKEN_FRAGMENTATION.md",
    sessionId: "not the 138e2cce session",
    timeLabel: "23 Jul 2026 (document date)",
    status: "needs-review",
    impact:
      "Evaluation containment, guardrail asymmetry, dual-channel evidence, and token fragmentation stay draft names.",
    riskClass: "draft audit protocol",
    citation: "Each file is labeled DRAFT for review and dated 2026-07-23. They were read in full.",
    adapted: "Protocol names, date, draft status, and one-line risk classes.",
    unused: "Canary construction, detection recipes, marker values, and response playbooks.",
  },
  {
    id: "mat-audit-20260723",
    title: "23 July audit left the live sequence unfinished",
    lane: "GROSS",
    sourceFile: "plan-b/docs/MAT_AUDIT_REPORT_20260723.md",
    sessionId: "GROK-0723",
    timeLabel: "23 Jul 2026 (document date)",
    status: "needs-review",
    impact: "The report says earlier phases were complete on paper and the live cross-tool sequence was still waiting.",
    riskClass: "honeypot exercise",
    citation:
      "Drive file 1pYO2bcJ0b7Pe79zRqXJVwc8WCBgWy4jd. It names session GROK-0723 and says Phase D steps D2 and D3 needed a live run.",
    adapted: "The unfinished live-sequence claim and the honeypot risk class.",
    unused: "Tunnel host, bait contents, markers, and the steps that would continue the exercise.",
  },
  {
    id: "repo-sweep",
    title: "Color-team repository list is an inventory only",
    lane: "GROSS",
    sourceFile: "session files/githubREPOsweepSEC_COLORteaming2410.txt",
    sessionId: GROSS_PLAN_B_SESSION_ID,
    timeLabel: "28 Oct 2026, 04:14 Europe/Istanbul (Drive modified time)",
    status: "needs-review",
    impact: "Thirty-four repository URLs were listed. None were cloned or run.",
    riskClass: "unvetted repository inventory",
    citation:
      "Drive file 1xxZxg8HBVgT_-UExnpERlNuwSjQNcnnc, 34 lines, attached under the session files shard. Names include defensive scanners and offensive-adjacent repositories, plus jiwoochris/artex-global and specimba/rise.",
    adapted: "The line count, the session attachment path, and the fact that two ARTEX-related names appear.",
    unused: "The URL list. Offensive-adjacent entries were not copied, and no repository was vendored into ARTEX.",
  },
  {
    id: "supabase-note",
    title: "A session note pastes a Supabase dashboard",
    lane: "GROSS",
    sourceFile: "session files/supaBASEguide1910.txt",
    sessionId: GROSS_PLAN_B_SESSION_ID,
    timeLabel: "Paste says 19 Oct; year not stated. File modified 28 Oct 2026, 04:14 Europe/Istanbul",
    status: "needs-review",
    impact: "A publishable key and database host were in the note and were not copied.",
    riskClass: "credential material in notes",
    citation:
      "Drive file 1x1CoKeclnxogGE78-XHmU8afk8hxTOb9. The paste names project nexus-gspp and GitHub specimba/nexusalpha, with a last migration create_kv_table_1333aad3.",
    adapted: "Project nickname, named GitHub repo, migration name, and the credential risk class.",
    unused: "Project URL, key, connection string, and client configuration snippet.",
  },
  {
    id: "vault-intel-20260609",
    title: "Vault security index is a June research note",
    lane: "GROSS",
    sourceFile: "session files/security-intel.md",
    sessionId: GROSS_PLAN_B_SESSION_ID,
    timeLabel: "9 Jun 2026 (version line in the file)",
    status: "needs-review",
    impact:
      "Spyware, kernel privilege-escalation, and supply-chain classes are named for a vault design, not as observed v7 runtime.",
    riskClass: "threat index",
    citation:
      "Drive file 1pnGN4Upv1XAkoA--Qk9UONjB6ZK7Uk7X, titled NEXUS Vault Security Intelligence, version 2026-06-09. It was read in full.",
    adapted: "Date, risk classes, and the statement that this is not NEXUS OS v7 telemetry.",
    unused: "Exploit mechanics, proof-of-concept links, and secret-handling details.",
  },
  {
    id: "nexus-osv5-review",
    title: "Attached planning review is NEXUS OS v5",
    lane: "GROSS",
    sourceFile: "session files/NEXUSachievementsandPLANSmixed1910.txt",
    sessionId: GROSS_PLAN_B_SESSION_ID,
    timeLabel: "9–10 Oct 2026 (dates stated in the opening)",
    status: "observed",
    impact:
      "The opening flags a GPU-memory arithmetic contradiction, an inconclusive relay status, and judge gates that still need an independence check.",
    riskClass: "evidence reconciliation",
    citation:
      "Drive file 1n-tMSP7hACIcOwf7tFNA-T5qt7U_39b4, 2,552 lines. The first portion was read. It says the achievements note reports about 467 MiB of GPU margin while 8,188 minus 7,461 is 727 MiB, and that a 401 does not by itself prove a route exists.",
    adapted: "Those three planning findings and the v5 label.",
    unused: "The unread remainder of the file, images, and any v7 behavior. None was invented.",
  },
  {
    id: "requested-v7-sources-absent",
    title: "Requested 27 October v7 archives and catch notes are absent",
    lane: "GROSS",
    sourceFile:
      "Searched the evidence folder for newGROSSandPLANBcatchesCODEX2710_01.txt, _02.txt, _03.txt, and the three NEXUS_OSV7 zip names",
    sessionId: GROSS_PLAN_B_SESSION_ID,
    timeLabel: "28 Oct 2026 (Drive search)",
    status: "observed",
    impact: "No NEXUS OS v7 compaction or Codex telemetry behavior was encoded.",
    riskClass: "missing source",
    citation:
      "Title search in folder 1dCa5s8TNUX7VLVZSvZYjnDRtQfXfz_BV returned no matches. A different session zip, dsh-session-session-a5c4a161-edec-4a4b-afdb-03853ed1734b.zip (14,407,282 bytes), sits in the session files and was not opened.",
    adapted: "The absence itself, and the other zip’s name, size, and different session id.",
    unused: "That other zip. It is over the download cap and is not session 138e2cce.",
  },
  {
    id: "child-research-20261017",
    title: "Four child sessions returned research notes",
    lane: "PLAN B",
    sourceFile:
      "subagents/70b54fce-4a1a-4639-a39a-f5438cf7a0bb, a1627f94-9982-41d4-9fa0-30e416072880, c49b7f80-bf0a-423e-b37a-5ceeae1d57d5, e60300b9-65b6-474c-b5e8-a390e1f9f097",
    sessionId: GROSS_PLAN_B_SESSION_ID,
    timeLabel: "17 Oct 2026 (date written in each child task)",
    status: "needs-review",
    impact:
      "Observation doctrine, desktop reverse-engineering, MCP authentication, and registry design were researched and not adopted.",
    riskClass: "runtime instrumentation research",
    citation:
      "Labels: Research harness observation doctrine; Research Electron RE tooling landscape; Research MCP security precedents; Research evidence registry patterns. Each log names the parent session.",
    adapted: "Workstream names, date, and the decision not to turn them into product behavior.",
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
];

export const GROSS_PLAN_B_REFUSED = [
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
] as const;

export function grossPlanBRecord(id: string): GrossPlanBRecord | undefined {
  return GROSS_PLAN_B_RECORDS.find((record) => record.id === id);
}

function isObserved(status: GrossPlanBStatus): boolean {
  switch (status) {
    case "observed":
      return true;
    case "needs-review":
      return false;
    default: {
      const exhaustive: never = status;
      return exhaustive;
    }
  }
}

export function grossPlanBCounts(): { observed: number; needsReview: number } {
  let observed = 0;
  let needsReview = 0;
  for (const record of GROSS_PLAN_B_RECORDS) {
    if (isObserved(record.status)) observed += 1;
    else needsReview += 1;
  }
  return { observed, needsReview };
}

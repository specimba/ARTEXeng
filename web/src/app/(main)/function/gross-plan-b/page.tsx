import Link from "next/link";

import { ClipboardListIcon } from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  GROSS_PLAN_B_RECORDS,
  GROSS_PLAN_B_REFUSED,
  GROSS_PLAN_B_SESSION_ID,
  type GrossPlanBStatus,
  grossPlanBCounts,
} from "@/lib/gross-plan-b-audit";
import { toneClasses } from "@/lib/status";
import { cn } from "@/lib/utils";

function StatusPill({ status }: { status: GrossPlanBStatus }) {
  const tone = status === "observed" ? "green" : "amber";
  return (
    <span className={cn("inline-flex rounded-md border px-2 py-0.5 font-medium text-xs", toneClasses[tone])}>
      {status}
    </span>
  );
}

export default function GrossPlanBPage() {
  const counts = grossPlanBCounts();

  return (
    <div className="flex flex-1 flex-col gap-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h1 className="flex items-center gap-2 font-semibold text-xl tracking-tight">
            <ClipboardListIcon className="size-5 text-muted-foreground" />
            GROSS / PLAN B
          </h1>
          <p className="mt-1 max-w-3xl text-muted-foreground text-sm">
            Audit register for session {GROSS_PLAN_B_SESSION_ID}. Each row has a source, a time, a status, and a
            one-line impact. Prompts, payloads, keys, and procedures are not stored here.
          </p>
        </div>
        <div className="text-right text-muted-foreground text-xs">
          <div>{counts.observed} observed</div>
          <div>{counts.needsReview} needs-review</div>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Findings</CardTitle>
          <CardDescription>
            Seeded from Drive files that were actually read. The coworker run that was building this dashboard was not
            readable from this environment, so the list lives in the existing navigation.
          </CardDescription>
        </CardHeader>
        <CardContent className="px-0">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead className="border-y text-muted-foreground text-xs">
                <tr>
                  <th className="px-4 py-2 font-medium">Claim</th>
                  <th className="px-4 py-2 font-medium">Source</th>
                  <th className="px-4 py-2 font-medium">Session</th>
                  <th className="px-4 py-2 font-medium">Status</th>
                  <th className="px-4 py-2 font-medium">Impact</th>
                </tr>
              </thead>
              <tbody>
                {GROSS_PLAN_B_RECORDS.map((record) => (
                  <tr className="border-b last:border-b-0" key={record.id}>
                    <td className="px-4 py-3 align-top">
                      <Link
                        className="font-medium hover:underline"
                        href={`/function/gross-plan-b/detail?id=${record.id}`}
                      >
                        {record.title}
                      </Link>
                      <div className="mt-1 text-muted-foreground text-xs">
                        {record.lane} · {record.timeLabel}
                      </div>
                    </td>
                    <td className="max-w-56 px-4 py-3 align-top text-xs">{record.sourceFile}</td>
                    <td className="max-w-40 px-4 py-3 align-top font-mono text-[11px]">{record.sessionId}</td>
                    <td className="px-4 py-3 align-top">
                      <StatusPill status={record.status} />
                    </td>
                    <td className="px-4 py-3 align-top text-sm">{record.impact}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <p className="max-w-3xl text-muted-foreground text-xs">
        Refused corpora, recorded as a class and not opened: {GROSS_PLAN_B_REFUSED.join(", ")}. Optional local clones
        were not vendored. evidenceforge was considered for hash-chained evidence pairing and left unused; ARTEX already
        keeps this register in the app.
      </p>
    </div>
  );
}

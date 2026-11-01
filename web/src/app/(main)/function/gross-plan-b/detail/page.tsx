"use client";

import * as React from "react";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { ArrowLeftIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { type GrossPlanBStatus, grossPlanBRecord } from "@/lib/gross-plan-b-audit";
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

function DetailBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="text-sm leading-6">{children}</CardContent>
    </Card>
  );
}

function GrossPlanBDetailInner() {
  const params = useSearchParams();
  const record = grossPlanBRecord(params.get("id") ?? "");

  if (!record) {
    return (
      <div className="flex flex-1 flex-col gap-3">
        <Button asChild size="sm" variant="ghost">
          <Link href="/function/gross-plan-b">
            <ArrowLeftIcon className="size-4" />
            Back to the register
          </Link>
        </Button>
        <p className="text-sm">That audit id is not in the seeded register.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col gap-4">
      <div className="flex items-start gap-2">
        <Button asChild size="icon-sm" variant="ghost">
          <Link href="/function/gross-plan-b">
            <ArrowLeftIcon className="size-4" />
          </Link>
        </Button>
        <div className="min-w-0">
          <div className="mb-1 flex flex-wrap items-center gap-2">
            <StatusPill status={record.status} />
            <span className="text-muted-foreground text-xs">{record.lane}</span>
          </div>
          <h1 className="font-semibold text-xl tracking-tight">{record.title}</h1>
          <p className="mt-1 text-muted-foreground text-sm">{record.impact}</p>
        </div>
      </div>

      <dl className="grid gap-3 text-sm sm:grid-cols-2">
        <div>
          <dt className="text-muted-foreground text-xs">Source file</dt>
          <dd>{record.sourceFile}</dd>
        </div>
        <div>
          <dt className="text-muted-foreground text-xs">Session</dt>
          <dd className="font-mono text-xs">{record.sessionId}</dd>
        </div>
        <div>
          <dt className="text-muted-foreground text-xs">Time</dt>
          <dd>{record.timeLabel}</dd>
        </div>
        <div>
          <dt className="text-muted-foreground text-xs">Risk class</dt>
          <dd>{record.riskClass}</dd>
        </div>
      </dl>

      <DetailBlock title="Source citation">{record.citation}</DetailBlock>
      <DetailBlock title="Adapted">{record.adapted}</DetailBlock>
      <DetailBlock title="Left unused">{record.unused}</DetailBlock>
    </div>
  );
}

export default function GrossPlanBDetailPage() {
  return (
    <React.Suspense fallback={null}>
      <GrossPlanBDetailInner />
    </React.Suspense>
  );
}

"use client";

import { memo, useMemo } from "react";
import { VirtualizedList } from "@/components/ui/virtualized-list";

const SAMPLE_SIZE = 1_200;

const RecordCard = memo(function RecordCard({
  index,
  kind,
}: {
  index: number;
  kind: "organization" | "activity";
}) {
  return (
    <article className="flex min-h-28 items-center justify-between rounded-xl border border-slate-200 bg-white p-4 shadow-xs">
      <div>
        <p className="font-semibold text-slate-950">
          {kind === "organization" ? "Organization" : "Activity"} {index + 1}
        </p>
        <p className="mt-1 text-sm text-slate-500">
          {kind === "organization"
            ? `${8 + (index % 240)} active members`
            : `Platform event batch ${index % 36}`}
        </p>
      </div>
      <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700">
        #{String(index + 1).padStart(4, "0")}
      </span>
    </article>
  );
});

export function PerformanceLab() {
  const records = useMemo(
    () => Array.from({ length: SAMPLE_SIZE }, (_, index) => index),
    [],
  );

  return (
    <div className="mx-auto grid w-full max-w-7xl gap-5 lg:grid-cols-2">
      <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <h1 className="font-semibold text-slate-950">Organization list stress test</h1>
        <p className="mt-1 text-sm text-slate-500">{SAMPLE_SIZE.toLocaleString()} representative records</p>
        <div className="mt-4">
          <VirtualizedList
            items={records}
            ariaLabel="Virtualized organization records"
            estimateSize={124}
            height={560}
            renderItem={(index) => <RecordCard index={index} kind="organization" />}
          />
        </div>
      </section>
      <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <h2 className="font-semibold text-slate-950">Activity list stress test</h2>
        <p className="mt-1 text-sm text-slate-500">{SAMPLE_SIZE.toLocaleString()} representative records</p>
        <div className="mt-4">
          <VirtualizedList
            items={records}
            ariaLabel="Virtualized activity records"
            estimateSize={124}
            height={560}
            renderItem={(index) => <RecordCard index={index} kind="activity" />}
          />
        </div>
      </section>
    </div>
  );
}

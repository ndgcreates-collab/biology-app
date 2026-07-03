import { ContentMeta } from "@/content/schema";

export function DraftBadge({ meta }: { meta: ContentMeta }) {
  if (meta.status === "verified") return null;
  return (
    <span
      title={meta.statusNote}
      className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-800 ring-1 ring-inset ring-amber-300"
    >
      ⚠ Draft — verify on CPALMS
    </span>
  );
}

interface Props {
  count: number;
  label: string;
}

export default function LockedItem({ count, label }: Props) {
  return (
    <div className="inline-flex items-center gap-2 border border-stone-200 rounded-sm px-4 py-2 bg-stone-50 text-sm text-stone-500">
      <span className="text-base">🔒</span>
      <span>
        Our {count} {label} — unlocked when our team builds your full itinerary
      </span>
    </div>
  );
}

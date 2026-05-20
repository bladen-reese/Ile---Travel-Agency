interface Props {
  mistakes: string[];
}

export default function CommonMistakes({ mistakes }: Props) {
  return (
    <div className="bg-amber-50 border border-amber-100 rounded-sm p-6">
      <div className="text-xs font-medium uppercase tracking-widest text-amber-700 mb-4">
        Things people get wrong on this trip
      </div>
      <ul className="space-y-3">
        {mistakes.map((mistake, i) => (
          <li key={i} className="flex gap-3 text-stone-700">
            <span className="text-amber-600 font-bold shrink-0 mt-0.5">—</span>
            <span className="leading-relaxed">{mistake}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

import LockedItem from "./LockedItem";

interface Activity {
  category: string;
  locked_specifics: number;
  polished_description?: string;
}

interface Region {
  name: string;
  nights: number;
  stay_type: string;
  stay_locked_count: number;
  activities: Activity[];
  polished_intro?: string;
  polished_days?: string[];
}

interface Props {
  region: Region;
  index: number;
}

export default function RegionCard({ region, index }: Props) {
  return (
    <div className="py-10 border-t border-stone-100 first:border-t-0">
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <div className="text-xs font-medium uppercase tracking-widest text-stone-400 mb-1">
            Stop {index + 1}
          </div>
          <h3 className="font-serif text-2xl text-stone-900">{region.name}</h3>
          <p className="text-sm text-stone-500 mt-1">
            {region.nights} night{region.nights !== 1 ? "s" : ""}
          </p>
        </div>
      </div>

      {region.polished_intro && (
        <p className="text-stone-700 leading-relaxed mb-6">
          {region.polished_intro}
        </p>
      )}

      {/* Stay */}
      <div className="mb-6">
        <div className="text-xs font-medium uppercase tracking-widest text-stone-400 mb-3">
          Where you&apos;ll stay
        </div>
        <p className="text-stone-700 capitalize mb-3">{region.stay_type}</p>
        <LockedItem
          count={region.stay_locked_count}
          label="vetted stays in this area"
        />
      </div>

      {/* Day breakdown */}
      {region.polished_days && region.polished_days.length > 0 && (
        <div className="mb-6">
          <div className="text-xs font-medium uppercase tracking-widest text-stone-400 mb-3">
            How it unfolds
          </div>
          <div className="space-y-3">
            {region.polished_days.map((day, i) => (
              <p key={i} className="text-stone-700 leading-relaxed">
                {day}
              </p>
            ))}
          </div>
        </div>
      )}

      {/* Activities */}
      <div>
        <div className="text-xs font-medium uppercase tracking-widest text-stone-400 mb-3">
          What you&apos;ll do
        </div>
        <div className="space-y-4">
          {region.activities.map((activity, i) => (
            <div key={i}>
              <p className="text-stone-800 font-medium mb-1">
                {activity.category}
              </p>
              {activity.polished_description && (
                <p className="text-stone-600 text-sm mb-2">
                  {activity.polished_description}
                </p>
              )}
              <LockedItem
                count={activity.locked_specifics}
                label="vetted options here"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

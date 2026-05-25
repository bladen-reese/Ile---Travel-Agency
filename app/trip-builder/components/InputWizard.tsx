"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const COUNTRIES = [
  { id: "Panama", label: "Panama", emoji: "🇵🇦" },
  { id: "Colombia", label: "Colombia", emoji: "🇨🇴" },
  { id: "Ecuador", label: "Ecuador", emoji: "🇪🇨" },
  { id: "Brazil", label: "Brazil", emoji: "🇧🇷" },
  { id: "Argentina", label: "Argentina", emoji: "🇦🇷" },
  { id: "Peru", label: "Peru", emoji: "🇵🇪" },
  { id: "Costa Rica", label: "Costa Rica", emoji: "🇨🇷" },
];

const TRAVELER_TYPES = [
  { id: "couple", label: "Just us two" },
  { id: "family-kids", label: "Family with young kids" },
  { id: "family-teens", label: "Family with teens" },
  { id: "friends", label: "Group of friends" },
];

const INTERESTS = [
  { id: "nature", label: "Nature & wildlife" },
  { id: "beaches", label: "Beaches & islands" },
  { id: "culture", label: "Culture & history" },
  { id: "coffee", label: "Coffee" },
  { id: "adventure", label: "Adventure & hiking" },
  { id: "rest", label: "Rest & slow travel" },
  { id: "holistic", label: "Holistic & wellness" },
  { id: "honeymoon", label: "Romance & honeymoon" },
  { id: "party", label: "Nightlife & party" },
  { id: "photography", label: "Photography" },
  { id: "birdwatching", label: "Birdwatching" },
  { id: "surf", label: "Surf" },
  { id: "gastronomy", label: "Gastronomy" },
];

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export const WizardSchema = z.object({
  countries: z.array(z.string()).min(1, "Pick at least one country"),
  duration: z.number().int().min(5).max(21),
  travelers: z.string().min(1, "Select who's going"),
  budget: z.number().int().min(1500).max(6000),
  interests: z.array(z.string()).min(1, "Pick at least one interest"),
  travelMonth: z.string().min(1, "Pick a month"),
});

export type WizardValues = z.infer<typeof WizardSchema>;

interface Props {
  onSubmit: (values: WizardValues) => void;
  isLoading: boolean;
}

export default function InputWizard({ onSubmit, isLoading }: Props) {
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<WizardValues>({
    resolver: zodResolver(WizardSchema),
    defaultValues: {
      countries: [],
      duration: 10,
      travelers: "",
      budget: 2500,
      interests: [],
      travelMonth: "",
    },
  });

  const duration = watch("duration");
  const budget = watch("budget");

  function toggleArrayField(
    field: "countries" | "interests",
    id: string,
    current: string[]
  ) {
    if (current.includes(id)) {
      setValue(field, current.filter((v) => v !== id), { shouldValidate: true });
    } else {
      setValue(field, [...current, id], { shouldValidate: true });
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-12">
      {/* Q1: Country */}
      <div>
        <label className="block text-xs font-medium uppercase tracking-widest text-stone-500 mb-4">
          Where are you headed?
        </label>
        <Controller
          name="countries"
          control={control}
          render={({ field }) => (
            <div className="flex flex-wrap gap-3">
              {COUNTRIES.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => toggleArrayField("countries", c.id, field.value)}
                  className={cn(
                    "px-5 py-3 rounded-full border text-sm font-medium transition-all",
                    field.value.includes(c.id)
                      ? "border-stone-800 bg-stone-800 text-white"
                      : "border-stone-200 bg-white text-stone-700 hover:border-stone-400"
                  )}
                >
                  {c.emoji} {c.label}
                </button>
              ))}
            </div>
          )}
        />
        {errors.countries && (
          <p className="mt-2 text-xs text-red-600">{errors.countries.message}</p>
        )}
      </div>

      {/* Q2: Duration */}
      <div>
        <label className="block text-xs font-medium uppercase tracking-widest text-stone-500 mb-4">
          How long? <span className="text-stone-800 normal-case font-semibold">{duration} days</span>
        </label>
        <Controller
          name="duration"
          control={control}
          render={({ field }) => (
            <div className="space-y-2">
              <input
                type="range"
                min={5}
                max={21}
                step={1}
                value={field.value}
                onChange={(e) => field.onChange(Number(e.target.value))}
                className="w-full accent-stone-800 h-1 cursor-pointer"
              />
              <div className="flex justify-between text-xs text-stone-400">
                <span>5 days</span>
                <span>21 days</span>
              </div>
            </div>
          )}
        />
      </div>

      {/* Q3: Travelers */}
      <div>
        <label className="block text-xs font-medium uppercase tracking-widest text-stone-500 mb-4">
          Who&apos;s going?
        </label>
        <Controller
          name="travelers"
          control={control}
          render={({ field }) => (
            <div className="flex flex-wrap gap-3">
              {TRAVELER_TYPES.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => field.onChange(t.id)}
                  className={cn(
                    "px-5 py-3 rounded-full border text-sm font-medium transition-all",
                    field.value === t.id
                      ? "border-stone-800 bg-stone-800 text-white"
                      : "border-stone-200 bg-white text-stone-700 hover:border-stone-400"
                  )}
                >
                  {t.label}
                </button>
              ))}
            </div>
          )}
        />
        {errors.travelers && (
          <p className="mt-2 text-xs text-red-600">{errors.travelers.message}</p>
        )}
      </div>

      {/* Q4: Budget */}
      <div>
        <label className="block text-xs font-medium uppercase tracking-widest text-stone-500 mb-4">
          Budget per person (excl. flights){" "}
          <span className="text-stone-800 normal-case font-semibold">
            ${budget.toLocaleString()}
          </span>
        </label>
        <Controller
          name="budget"
          control={control}
          render={({ field }) => (
            <div className="space-y-2">
              <input
                type="range"
                min={1500}
                max={6000}
                step={100}
                value={field.value}
                onChange={(e) => field.onChange(Number(e.target.value))}
                className="w-full accent-stone-800 h-1 cursor-pointer"
              />
              <div className="flex justify-between text-xs text-stone-400">
                <span>$1,500</span>
                <span>$6,000+</span>
              </div>
              <p className="text-xs text-stone-500 pt-1">
                This is mid-range territory — luxury travel available on request
              </p>
            </div>
          )}
        />
      </div>

      {/* Q5: Interests */}
      <div>
        <label className="block text-xs font-medium uppercase tracking-widest text-stone-500 mb-4">
          What pulls you in?
        </label>
        <Controller
          name="interests"
          control={control}
          render={({ field }) => (
            <div className="flex flex-wrap gap-3">
              {INTERESTS.map((i) => (
                <button
                  key={i.id}
                  type="button"
                  onClick={() => toggleArrayField("interests", i.id, field.value)}
                  className={cn(
                    "px-5 py-3 rounded-full border text-sm font-medium transition-all",
                    field.value.includes(i.id)
                      ? "border-amber-700 bg-amber-700 text-white"
                      : "border-stone-200 bg-white text-stone-700 hover:border-stone-400"
                  )}
                >
                  {i.label}
                </button>
              ))}
            </div>
          )}
        />
        {errors.interests && (
          <p className="mt-2 text-xs text-red-600">{errors.interests.message}</p>
        )}
      </div>

      {/* Q6: Month */}
      <div>
        <label className="block text-xs font-medium uppercase tracking-widest text-stone-500 mb-4">
          When?
        </label>
        <Controller
          name="travelMonth"
          control={control}
          render={({ field }) => (
            <div className="flex flex-wrap gap-2">
              {MONTHS.map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => field.onChange(m)}
                  className={cn(
                    "px-4 py-2 rounded-full border text-sm transition-all",
                    field.value === m
                      ? "border-stone-800 bg-stone-800 text-white"
                      : "border-stone-200 bg-white text-stone-700 hover:border-stone-400"
                  )}
                >
                  {m.slice(0, 3)}
                </button>
              ))}
            </div>
          )}
        />
        {errors.travelMonth && (
          <p className="mt-2 text-xs text-red-600">{errors.travelMonth.message}</p>
        )}
      </div>

      <Button
        type="submit"
        variant="cta"
        size="xl"
        disabled={isLoading}
        className="w-full sm:w-auto"
      >
        {isLoading ? "Building…" : "Build my trip →"}
      </Button>
    </form>
  );
}

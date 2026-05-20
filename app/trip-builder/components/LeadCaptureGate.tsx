"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

const GateSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().min(1, "WhatsApp or phone is required"),
});

type GateValues = z.infer<typeof GateSchema>;

interface Props {
  onCapture: (values: GateValues) => Promise<void>;
}

export default function LeadCaptureGate({ onCapture }: Props) {
  const [submitting, setSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<GateValues>({ resolver: zodResolver(GateSchema) });

  async function onSubmit(values: GateValues) {
    setSubmitting(true);
    await onCapture(values);
    setSubmitting(false);
  }

  return (
    <div className="relative">
      {/* Blur gradient overlay above */}
      <div className="absolute -top-32 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-stone-50 pointer-events-none z-10" />

      <div className="bg-stone-50 border border-stone-200 rounded-sm p-8 sm:p-12 relative z-20">
        <div className="max-w-lg">
          <h3 className="font-serif text-2xl text-stone-900 mb-2">
            See the rest of your trip
          </h3>
          <p className="text-stone-600 mb-8 leading-relaxed">
            The remaining regions, day-by-day breakdown, and our planning notes
            are ready. Tell us where to send them.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <Label htmlFor="name">Your name</Label>
              <Input
                id="name"
                placeholder="Alex"
                className="mt-2"
                {...register("name")}
              />
              {errors.name && (
                <p className="text-xs text-red-600 mt-1">{errors.name.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="alex@example.com"
                className="mt-2"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-xs text-red-600 mt-1">{errors.email.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="phone">WhatsApp / Phone</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+1 555 000 0000"
                className="mt-2"
                {...register("phone")}
              />
              {errors.phone && (
                <p className="text-xs text-red-600 mt-1">{errors.phone.message}</p>
              )}
            </div>

            <Button
              type="submit"
              variant="cta"
              size="lg"
              disabled={submitting}
              className="w-full"
            >
              {submitting ? "Unlocking…" : "Send me my trip →"}
            </Button>
          </form>

          <p className="text-xs text-stone-400 mt-4 leading-relaxed">
            We&apos;ll also reach out within 24 hours to talk through
            customizing it with our partner properties — no obligation.
          </p>
        </div>
      </div>
    </div>
  );
}

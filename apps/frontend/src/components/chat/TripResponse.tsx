import { MapPinned, CalendarDays, Wallet, Sparkles } from "lucide-react";

import AgentExecution from "./AgentExecution";
import type { PlanTripApiResponse } from "@trip-adviser/shared";

interface Props {
  response: PlanTripApiResponse;
}
interface ItineraryDay {
  day: number;
  title: string;
  description: string;
  activities: string[];
  transport: string;
  accommodation: string;
  estimatedCost: number;
}
export default function TripResponse({ response }: Props) {
  const destination = response.trip.destination as {
    destination?: string;
    reason?: string;
    bestSeason?: string;
    highlights?: string[];
  };

  const itinerary =
    (
      response.trip.itinerary as {
        itinerary?: ItineraryDay[];
      }
    ).itinerary ?? [];

  const budget = response.trip.budget as {
    total?: number;
    breakdown?: {
      transport?: number;
      accommodation?: number;
      food?: number;
      activities?: number;
    };
  };

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 p-8 text-slate-100">
      {/* Destination */}
      <div className="rounded-2xl border border-slate-700 bg-slate-800 p-6 shadow-lg">
        <div className="mb-5 flex items-center gap-3">
          <MapPinned className="h-6 w-6 text-blue-400" />
          <h2 className="text-2xl font-bold">Destination</h2>
        </div>

        <h3 className="text-3xl font-bold text-white">
          {destination?.destination ?? "Not Available"}
        </h3>

        <p className="mt-4 text-slate-300">{destination?.reason}</p>

        <div className="mt-6">
          <p className="font-semibold text-blue-400">Best Season</p>

          <p className="text-slate-300">{destination?.bestSeason}</p>
        </div>

        {(destination.highlights?.length ?? 0) > 0 && (
          <div className="mt-6">
            <p className="mb-2 font-semibold text-blue-400">Highlights</p>

            <ul className="list-disc space-y-2 pl-5 text-slate-300">
              {(destination.highlights ?? []).map(
                (item: string, index: number) => (
                  <li key={index}>{item}</li>
                ),
              )}
            </ul>
          </div>
        )}
      </div>

      {/* Itinerary */}
      <div className="rounded-2xl border border-slate-700 bg-slate-800 p-6 shadow-lg">
        <div className="mb-6 flex items-center gap-3">
          <CalendarDays className="h-6 w-6 text-green-400" />
          <h2 className="text-2xl font-bold">Itinerary</h2>
        </div>

        <div className="space-y-5">
          {itinerary.map((day) => (
            <div
              key={day.day}
              className="rounded-xl border border-slate-700 bg-slate-900 p-5"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-white">Day {day.day}</h3>

                <span className="rounded-full bg-blue-600 px-3 py-1 text-sm">
                  ₹ {day.estimatedCost}
                </span>
              </div>

              <h4 className="mt-2 text-lg font-semibold text-blue-300">
                {day.title}
              </h4>

              <p className="mt-3 text-slate-300">{day.description}</p>

              <div className="mt-4">
                <p className="font-semibold text-green-400">Activities</p>

                <ul className="mt-2 list-disc pl-5 text-slate-300">
                  {day.activities?.map((activity: string, idx: number) => (
                    <li key={idx}>{activity}</li>
                  ))}
                </ul>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-slate-400">Transport</p>

                  <p>{day.transport}</p>
                </div>

                <div>
                  <p className="text-slate-400">Accommodation</p>

                  <p>{day.accommodation}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Budget */}
      <div className="rounded-2xl border border-slate-700 bg-slate-800 p-6 shadow-lg">
        <div className="mb-6 flex items-center gap-3">
          <Wallet className="h-6 w-6 text-yellow-400" />
          <h2 className="text-2xl font-bold">Budget</h2>
        </div>

        <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
          <BudgetCard title="Transport" value={budget?.breakdown?.transport} />

          <BudgetCard
            title="Accommodation"
            value={budget?.breakdown?.accommodation}
          />

          <BudgetCard title="Food" value={budget?.breakdown?.food} />

          <BudgetCard
            title="Activities"
            value={budget?.breakdown?.activities}
          />
        </div>

        <div className="mt-8 rounded-xl bg-blue-600 p-5 text-center">
          <p className="text-lg">Estimated Total</p>

          <p className="mt-2 text-4xl font-bold">₹ {budget?.total}</p>
        </div>
      </div>

      {/* Agents */}
      <div className="rounded-2xl border border-slate-700 bg-slate-800 p-6 shadow-lg">
        <div className="mb-5 flex items-center gap-3">
          <Sparkles className="h-6 w-6 text-purple-400" />
          <h2 className="text-2xl font-bold">AI Workflow</h2>
        </div>

        <AgentExecution
          agentsExecuted={response.execution?.agentsExecuted ?? []}
        />
      </div>
    </div>
  );
}

function BudgetCard({ title, value }: { title: string; value?: number }) {
  return (
    <div className="rounded-xl bg-slate-900 p-5 text-center">
      <p className="text-sm text-slate-400">{title}</p>

      <p className="mt-2 text-xl font-bold text-white">₹ {value ?? 0}</p>
    </div>
  );
}

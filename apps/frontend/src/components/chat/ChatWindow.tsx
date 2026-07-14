// import { LoaderCircle, MapPinned, Sparkles, Wallet } from "lucide-react";

// import TripResponse from "./TripResponse";
// import type { PlanTripApiResponse } from "@trip-adviser/shared";

// interface ChatWindowProps {
//   response?: PlanTripApiResponse | null;
//   loading?: boolean;
// }

// export default function ChatWindow({
//   response,
//   loading = false,
// }: ChatWindowProps) {
//   return (
//     <div className="flex-1 overflow-y-auto bg-slate-950">
//       {!response && !loading && (
//         <div className="mx-auto flex h-full max-w-4xl flex-col items-center justify-center px-8 text-center">
//           <div className="mb-8 rounded-full bg-blue-600 p-6">
//             <Sparkles size={40} className="text-white" />
//           </div>

//           <h1 className="text-5xl font-bold text-white">Trip Adviser AI</h1>

//           <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-400">
//             Plan smarter trips using multiple AI agents working together. Just
//             describe your dream trip naturally and let the AI create
//             destinations, itineraries and budget estimates.
//           </p>

//           <div className="mt-12 grid w-full max-w-3xl grid-cols-1 gap-6 md:grid-cols-3">
//             <FeatureCard
//               icon={<MapPinned className="h-8 w-8 text-blue-400" />}
//               title="Destination"
//               description="Find destinations matching your interests."
//             />

//             <FeatureCard
//               icon={<Sparkles className="h-8 w-8 text-green-400" />}
//               title="Itinerary"
//               description="Generate realistic day-by-day travel plans."
//             />

//             <FeatureCard
//               icon={<Wallet className="h-8 w-8 text-yellow-400" />}
//               title="Budget"
//               description="Estimate costs and optimize your expenses."
//             />
//           </div>

//           <p className="mt-12 text-slate-500">
//             Start by typing your travel idea below 👇
//           </p>
//         </div>
//       )}

//       {loading && (
//         <div className="flex h-full items-center justify-center">
//           <div className="w-full max-w-md rounded-2xl border border-slate-700 bg-slate-900 p-8 shadow-xl">
//             <div className="flex justify-center">
//               <LoaderCircle className="animate-spin text-blue-500" size={48} />
//             </div>

//             <h2 className="mt-6 text-center text-2xl font-bold text-white">
//               Planning your trip...
//             </h2>

//             <p className="mt-3 text-center text-slate-400">
//               Our AI agents are collaborating to create your itinerary.
//             </p>

//             <div className="mt-8 space-y-4">
//               <AgentStatus title="Destination Agent" />

//               <AgentStatus title="Itinerary Agent" />

//               <AgentStatus title="Budget Agent" />
//             </div>
//           </div>
//         </div>
//       )}

//       {!loading && response && <TripResponse response={response} />}
//     </div>
//   );
// }

// function FeatureCard({
//   icon,
//   title,
//   description,
// }: {
//   icon: React.ReactNode;
//   title: string;
//   description: string;
// }) {
//   return (
//     <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 text-left">
//       <div>{icon}</div>

//       <h3 className="mt-4 text-xl font-bold text-white">{title}</h3>

//       <p className="mt-3 text-sm leading-6 text-slate-400">{description}</p>
//     </div>
//   );
// }

// function AgentStatus({ title }: { title: string }) {
//   return (
//     <div className="flex items-center justify-between rounded-xl bg-slate-800 px-4 py-3">
//       <span className="text-slate-200">{title}</span>

//       <LoaderCircle className="animate-spin text-blue-400" size={18} />
//     </div>
//   );
// }

import { LoaderCircle, MapPinned, Sparkles, Wallet } from "lucide-react";

import TripResponse from "./TripResponse";
import type { PlanTripApiResponse } from "@trip-adviser/shared";

interface ChatWindowProps {
  response?: PlanTripApiResponse | null;
  loading?: boolean;
}

export default function ChatWindow({
  response,
  loading = false,
}: ChatWindowProps) {
  return (
    <div className="flex-1 overflow-y-auto bg-slate-950">
      {!response && !loading && (
        <div className="mx-auto flex h-full max-w-5xl flex-col items-center justify-center px-5 py-10 text-center md:px-8">
          <div className="mb-6 rounded-full bg-blue-600 p-5 md:mb-8 md:p-6">
            <Sparkles size={36} className="text-white md:h-10 md:w-10" />
          </div>

          <h1 className="text-3xl font-bold text-white md:text-5xl">
            Trip Adviser AI
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-7 text-slate-400 md:mt-6 md:text-lg md:leading-8">
            Plan smarter trips using multiple AI agents working together.
            Describe your dream trip naturally and let AI generate destinations,
            itineraries and budget estimates.
          </p>

          <div className="mt-10 grid w-full max-w-4xl grid-cols-1 gap-4 md:mt-12 md:grid-cols-3 md:gap-6">
            <FeatureCard
              icon={<MapPinned className="h-8 w-8 text-blue-400" />}
              title="Destination"
              description="Find destinations that match your interests and travel preferences."
            />

            <FeatureCard
              icon={<Sparkles className="h-8 w-8 text-green-400" />}
              title="Itinerary"
              description="Generate realistic day-by-day travel plans."
            />

            <FeatureCard
              icon={<Wallet className="h-8 w-8 text-yellow-400" />}
              title="Budget"
              description="Estimate costs and suggest ways to optimize your budget."
            />
          </div>

          <p className="mt-10 text-sm text-slate-500 md:mt-12 md:text-base">
            Start by describing your travel idea below 👇
          </p>
        </div>
      )}

      {loading && (
        <div className="flex h-full items-center justify-center px-4">
          <div className="w-full max-w-md rounded-2xl border border-slate-700 bg-slate-900 p-6 shadow-xl md:p-8">
            <div className="flex justify-center">
              <LoaderCircle className="animate-spin text-blue-500" size={46} />
            </div>

            <h2 className="mt-6 text-center text-xl font-bold text-white md:text-2xl">
              Planning your trip...
            </h2>

            <p className="mt-3 text-center text-sm text-slate-400 md:text-base">
              Our AI agents are collaborating to create your perfect itinerary.
            </p>

            <div className="mt-8 space-y-3">
              <AgentStatus title="Destination Agent" />

              <AgentStatus title="Itinerary Agent" />

              <AgentStatus title="Budget Agent" />
            </div>
          </div>
        </div>
      )}

      {!loading && response && <TripResponse response={response} />}
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 text-left transition hover:border-blue-500 md:p-6">
      <div>{icon}</div>

      <h3 className="mt-4 text-lg font-bold text-white md:text-xl">{title}</h3>

      <p className="mt-3 text-sm leading-6 text-slate-400">{description}</p>
    </div>
  );
}

function AgentStatus({ title }: { title: string }) {
  return (
    <div className="flex items-center justify-between rounded-xl bg-slate-800 px-4 py-3">
      <span className="text-sm text-slate-200 md:text-base">{title}</span>

      <LoaderCircle className="animate-spin text-blue-400" size={18} />
    </div>
  );
}

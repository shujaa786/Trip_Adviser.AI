// import { Plus, History, LogOut } from "lucide-react";

// interface TripItem {
//   id: string;
//   title?: string;
//   createdAt?: string;
// }

// interface SidebarProps {
//   trips?: TripItem[];
//   onNewTrip?: () => void;
//   onSelectTrip?: (tripId: string) => void;
//   onDeleteTrip?: (id: string) => void;
//   onLogout?: () => void;
// }

// export default function Sidebar({
//   trips = [],
//   onNewTrip,
//   onSelectTrip,
//   onDeleteTrip,
//   onLogout,
// }: SidebarProps) {
//   return (
//     <aside className="flex h-screen w-80 flex-col border-r border-slate-800 bg-slate-900">
//       {/* Header */}
//       <div className="border-b border-slate-800 p-6">
//         <div className="mb-6">
//           <h1 className="text-2xl font-bold text-white">Trip Adviser AI</h1>

//           <p className="mt-1 text-sm text-slate-400">Multi-Agent Planner</p>
//         </div>

//         <button
//           onClick={onNewTrip}
//           className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700"
//         >
//           <Plus size={18} />
//           New Trip
//         </button>
//       </div>

//       {/* History */}
//       <div className="flex-1 overflow-y-auto p-6">
//         <div className="mb-4 flex items-center gap-2">
//           <History size={18} className="text-slate-400" />

//           <h2 className="font-semibold text-white">Trip History</h2>
//         </div>

//         <div className="space-y-3">
//           {trips.length === 0 && (
//             <div className="rounded-xl border border-dashed border-slate-700 p-5 text-center text-sm text-slate-500">
//               No trips yet.
//             </div>
//           )}

//           {trips.map((trip, index) => (
//             <button
//               key={trip.id}
//               onClick={() => onSelectTrip?.(trip.id)}
//               className="w-full rounded-xl border border-slate-800 bg-slate-800 p-4 text-left transition hover:border-blue-500 hover:bg-slate-700"
//             >
//               <div className="flex items-center justify-between w-full">
//                 <div className="overflow-hidden">
//                   <p className="truncate font-medium text-white">
//                     {trip.title ?? `Trip ${index + 1}`}
//                   </p>

//                   <p className="text-xs text-slate-400">
//                     {new Date(trip.createdAt ?? "").toLocaleDateString()}
//                   </p>
//                 </div>

//                 <button
//                   type="button"
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     onDeleteTrip?.(trip.id);
//                   }}
//                   className="rounded p-2 text-slate-400 transition hover:bg-red-600 hover:text-white"
//                   title="Delete Trip"
//                 >
//                   🗑️
//                 </button>
//               </div>
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* Footer */}
//       <div className="border-t border-slate-800 p-6">
//         <button
//           onClick={onLogout}
//           className="flex w-full items-center justify-center gap-2 rounded-xl border border-red-500 py-3 text-red-400 transition hover:bg-red-500 hover:text-white"
//         >
//           <LogOut size={18} />
//           Logout
//         </button>
//       </div>
//     </aside>
//   );
// }

import { Plus, History, LogOut, Trash2, X } from "lucide-react";

interface TripItem {
  id: string;
  title?: string;
  createdAt?: string;
}

interface SidebarProps {
  trips?: TripItem[];
  onNewTrip?: () => void;
  onSelectTrip?: (tripId: string) => void;
  onDeleteTrip?: (id: string) => void;
  onLogout?: () => void;
  mobile?: boolean;
  onClose?: () => void;
}

export default function Sidebar({
  trips = [],
  onNewTrip,
  onSelectTrip,
  onDeleteTrip,
  onLogout,
  mobile = false,
  onClose,
}: SidebarProps) {
  return (
    // <aside className="flex h-full w-full flex-col border-b border-slate-800 bg-slate-900 lg:h-screen lg:w-80 lg:border-b-0 lg:border-r">
    <aside className="flex h-full w-80 flex-col border-r border-slate-800 bg-slate-900">
      {mobile && (
        <div className="flex items-center justify-between border-b border-slate-800 p-4 lg:hidden">
          <h2 className="text-lg font-bold">Menu</h2>

          <button
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-slate-800"
          >
            <X size={22} />
          </button>
        </div>
      )}
      {/* Header */}
      <div className="border-b border-slate-800 p-4 md:p-6">
        <div className="mb-5">
          <h1 className="text-xl font-bold text-white md:text-2xl">
            Trip Adviser AI
          </h1>

          <p className="mt-1 text-xs text-slate-400 md:text-sm">
            Multi-Agent Planner
          </p>
        </div>

        <button
          onClick={() => {
            onNewTrip?.();
            onClose?.();
          }}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 font-semibold text-white transition hover:bg-blue-700 md:py-3"
        >
          <Plus size={18} />
          New Trip
        </button>
      </div>

      {/* History */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6">
        <div className="mb-4 flex items-center gap-2">
          <History size={18} className="text-slate-400" />

          <h2 className="text-sm font-semibold text-white md:text-base">
            Trip History
          </h2>
        </div>

        <div className="space-y-3">
          {trips.length === 0 && (
            <div className="rounded-xl border border-dashed border-slate-700 p-5 text-center text-sm text-slate-500">
              No trips yet.
            </div>
          )}

          {trips.map((trip, index) => (
            <button
              key={trip.id}
              onClick={() => {
                onSelectTrip?.(trip.id);
                onClose?.();
              }}
              className="group w-full rounded-xl border border-slate-800 bg-slate-800 p-3 text-left transition hover:border-blue-500 hover:bg-slate-700 md:p-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-white md:text-base">
                    {trip.title ?? `Trip ${index + 1}`}
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    {trip.createdAt
                      ? new Date(trip.createdAt).toLocaleDateString()
                      : "Recently created"}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();

                    onDeleteTrip?.(trip.id);

                    onClose?.();
                  }}
                  className="rounded-lg p-2 text-slate-400 transition hover:bg-red-600 hover:text-white"
                  title="Delete Trip"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-slate-800 p-4 md:p-6">
        <button
          onClick={() => {
            onLogout?.();
            onClose?.();
          }}
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-red-500 py-2.5 text-red-400 transition hover:bg-red-500 hover:text-white md:py-3"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
}

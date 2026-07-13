import { Plus, History, LogOut } from "lucide-react";

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
}

export default function Sidebar({
  trips = [],
  onNewTrip,
  onSelectTrip,
  onDeleteTrip,
  onLogout,
}: SidebarProps) {
  return (
    <aside className="flex h-screen w-80 flex-col border-r border-slate-800 bg-slate-900">
      {/* Header */}
      <div className="border-b border-slate-800 p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-white">Trip Adviser AI</h1>

          <p className="mt-1 text-sm text-slate-400">Multi-Agent Planner</p>
        </div>

        <button
          onClick={onNewTrip}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700"
        >
          <Plus size={18} />
          New Trip
        </button>
      </div>

      {/* History */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="mb-4 flex items-center gap-2">
          <History size={18} className="text-slate-400" />

          <h2 className="font-semibold text-white">Trip History</h2>
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
              onClick={() => onSelectTrip?.(trip.id)}
              className="w-full rounded-xl border border-slate-800 bg-slate-800 p-4 text-left transition hover:border-blue-500 hover:bg-slate-700"
            >
              <div className="flex items-center justify-between w-full">
                <div className="overflow-hidden">
                  <p className="truncate font-medium text-white">
                    {trip.title ?? `Trip ${index + 1}`}
                  </p>

                  <p className="text-xs text-slate-400">
                    {new Date(trip.createdAt ?? "").toLocaleDateString()}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteTrip?.(trip.id);
                  }}
                  className="rounded p-2 text-slate-400 transition hover:bg-red-600 hover:text-white"
                  title="Delete Trip"
                >
                  🗑️
                </button>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-slate-800 p-6">
        <button
          onClick={onLogout}
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-red-500 py-3 text-red-400 transition hover:bg-red-500 hover:text-white"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
}

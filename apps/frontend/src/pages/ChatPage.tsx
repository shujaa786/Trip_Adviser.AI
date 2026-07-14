// import { useCallback, useEffect, useMemo, useState } from "react";
// import axios from "axios";

// import Sidebar from "../components/chat/Sidebar";
// import ChatWindow from "../components/chat/ChatWindow";
// import MessageInput from "../components/chat/MessageInput";
// import { useAuth } from "../providers/useAuth";
// import type { PlanTripApiResponse } from "@trip-adviser/shared";
// import { deleteTrip } from "../api/trip.api";

// const API_BASE_URL =
//   import.meta.env.VITE_API_BASE_URL ?? "http://localhost:3000/api/v1";

// interface TripSummary {
//   id: string;
//   title?: string;
//   createdAt?: string;
// }

// export default function ChatPage() {
//   const { token, logout } = useAuth();
//   const [selectedTripId, setSelectedTripId] = useState<string | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [response, setResponse] = useState<PlanTripApiResponse | null>(null);
//   const [trips, setTrips] = useState<TripSummary[]>([]);

//   const headers = useMemo(
//     () => ({
//       Authorization: `Bearer ${token}`,
//     }),
//     [token],
//   );

//   const loadTrips = useCallback(async () => {
//     try {
//       const res = await axios.get(`${API_BASE_URL}/trips`, {
//         headers,
//       });

//       setTrips(res.data.trips ?? []);
//     } catch (error) {
//       console.error("Failed to load trips", error);
//     }
//   }, [headers]);

//   useEffect(() => {
//     void (async () => {
//       await loadTrips();
//     })();
//   }, [loadTrips]);

//   async function sendPrompt(message: string) {
//     try {
//       setLoading(true);

//       const res = await axios.post(
//         `${API_BASE_URL}/trips/plan`,
//         {
//           message,
//         },
//         {
//           headers,
//         },
//       );

//       setResponse(res.data);

//       await loadTrips();
//     } catch (error: unknown) {
//       console.error(error);

//       if (axios.isAxiosError(error)) {
//         alert(error.response?.data?.message ?? "Failed to generate trip.");
//       } else {
//         alert("Unexpected error.");
//       }
//     } finally {
//       setLoading(false);
//     }
//   }

//   async function openTrip(id: string) {
//     try {
//       setLoading(true);
//       setSelectedTripId(id);
//       const res = await axios.get(`${API_BASE_URL}/trips/${id}`, {
//         headers,
//       });

//       setResponse({
//         trip: res.data.trip.trip,
//         execution: {
//           ...res.data.trip.execution,
//           agentsExecuted: ["DestinationAgent", "ItineraryAgent", "BudgetAgent"],
//         },
//         metadata: res.data.trip.metadata,
//       });
//     } catch (error) {
//       console.error(error);

//       alert("Unable to open trip.");
//     } finally {
//       setLoading(false);
//     }
//   }
//   function newTrip() {
//     setSelectedTripId(null);
//     setResponse(null);
//   }
//   async function handleDeleteTrip(id: string) {
//     const confirmed = window.confirm("Delete this trip permanently?");

//     if (!confirmed) return;

//     try {
//       await deleteTrip(id);

//       if (selectedTripId === id) {
//         setSelectedTripId(null);
//         setResponse(null);
//       }

//       await loadTrips();
//     } catch (error) {
//       console.error(error);
//       alert("Failed to delete trip.");
//     }
//   }
//   return (
//     <div
//       style={{
//         display: "flex",
//         height: "100vh",
//         background: "#0f172a",
//         color: "#ffffff",
//       }}
//     >
//       <Sidebar
//         trips={trips}
//         onNewTrip={newTrip}
//         onSelectTrip={openTrip}
//         onDeleteTrip={handleDeleteTrip}
//         onLogout={logout}
//       />

//       <div
//         style={{
//           flex: 1,
//           display: "flex",
//           flexDirection: "column",
//         }}
//       >
//         <ChatWindow response={response} loading={loading} />

//         <MessageInput loading={loading} onSend={sendPrompt} />
//       </div>
//     </div>
//   );
// }

import { useCallback, useEffect, useState, useMemo } from "react";
import axios from "axios";
import { deleteTrip } from "../api/trip.api";
import Sidebar from "../components/chat/Sidebar";
import ChatWindow from "../components/chat/ChatWindow";
import MessageInput from "../components/chat/MessageInput";
import { useAuth } from "../providers/useAuth";
import type { PlanTripApiResponse } from "@trip-adviser/shared";
import { Menu } from "lucide-react";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ??
  "https://trip-adviser-ai.onrender.com/api/v1";

interface TripSummary {
  id: string;
  title?: string;
  createdAt?: string;
}

export default function ChatPage() {
  const { token, logout } = useAuth();
  const [selectedTripId, setSelectedTripId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [response, setResponse] = useState<PlanTripApiResponse | null>(null);
  const [trips, setTrips] = useState<TripSummary[]>([]);

  const headers = useMemo(
    () => ({
      Authorization: `Bearer ${token}`,
    }),
    [token],
  );

  const loadTrips = useCallback(async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/trips`, {
        headers,
      });

      setTrips(res.data.trips ?? []);
    } catch (error) {
      console.error("Failed to load trips", error);
    }
  }, [headers]);

  useEffect(() => {
    void (async () => {
      await loadTrips();
    })();
  }, [loadTrips]);

  async function sendPrompt(message: string) {
    try {
      setLoading(true);

      const res = await axios.post(
        `${API_BASE_URL}/trips/plan`,
        { message },
        { headers },
      );

      setResponse(res.data);

      await loadTrips();
    } catch (error: unknown) {
      console.error(error);

      if (axios.isAxiosError(error)) {
        alert(error.response?.data?.message ?? "Failed to generate trip.");
      } else {
        alert("Unexpected error.");
      }
    } finally {
      setLoading(false);
    }
  }

  async function openTrip(id: string) {
    try {
      setIsSidebarOpen(false);
      setLoading(true);
      setSelectedTripId(id);
      const res = await axios.get(`${API_BASE_URL}/trips/${id}`, {
        headers,
      });

      setResponse({
        trip: res.data.trip.trip,
        execution: {
          ...res.data.trip.execution,
          agentsExecuted: ["DestinationAgent", "ItineraryAgent", "BudgetAgent"],
        },
        metadata: res.data.trip.metadata,
      });
    } catch (error) {
      console.error(error);
      alert("Unable to open trip.");
    } finally {
      setLoading(false);
    }
  }

  function newTrip() {
    setSelectedTripId(null);
    setResponse(null);
    setIsSidebarOpen(false);
  }
  async function handleDeleteTrip(id: string) {
    const confirmed = window.confirm("Delete this trip permanently?");

    if (!confirmed) return;

    try {
      await deleteTrip(id);

      if (selectedTripId === id) {
        setSelectedTripId(null);
        setResponse(null);
      }

      await loadTrips();
    } catch (error) {
      console.error(error);
      alert("Failed to delete trip.");
    }
  }
  function handleLogout() {
    setIsSidebarOpen(false);
    logout();
  }
  return (
    <div className="flex h-screen flex-col bg-slate-950 text-white lg:flex-row">
      {/* Mobile Header */}
      <div className="flex items-center justify-between border-b border-slate-800 bg-slate-900 px-4 py-3 lg:hidden">
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="rounded-lg p-2 transition hover:bg-slate-800"
        >
          <Menu size={22} />
        </button>

        <h1 className="text-lg font-bold">Trip Adviser AI</h1>

        <div className="w-8" />
      </div>

      {/* Overlay */}
      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-80 transform transition-transform duration-300 lg:static lg:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Sidebar
          mobile
          onClose={() => setIsSidebarOpen(false)}
          trips={trips}
          onNewTrip={newTrip}
          onSelectTrip={openTrip}
          onDeleteTrip={handleDeleteTrip}
          onLogout={handleLogout}
        />
      </div>

      {/* Main Chat Area */}
      <div className="flex min-h-0 flex-1 flex-col">
        <div className="flex-1 overflow-y-auto">
          <ChatWindow response={response} loading={loading} />
        </div>

        <MessageInput loading={loading} onSend={sendPrompt} />
      </div>
    </div>
  );
}

import { useCallback, useEffect, useMemo, useState } from "react";
import axios from "axios";

import Sidebar from "../components/chat/Sidebar";
import ChatWindow from "../components/chat/ChatWindow";
import MessageInput from "../components/chat/MessageInput";
import { useAuth } from "../providers/useAuth";
import type { PlanTripApiResponse } from "@trip-adviser/shared";
import { deleteTrip } from "../api/trip.api";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? "http://localhost:3000/api/v1";

interface TripSummary {
  id: string;
  title?: string;
  createdAt?: string;
}

export default function ChatPage() {
  const { token, logout } = useAuth();
  const [selectedTripId, setSelectedTripId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
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
        {
          message,
        },
        {
          headers,
        },
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
  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        background: "#0f172a",
        color: "#ffffff",
      }}
    >
      <Sidebar
        trips={trips}
        onNewTrip={newTrip}
        onSelectTrip={openTrip}
        onDeleteTrip={handleDeleteTrip}
        onLogout={logout}
      />

      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <ChatWindow response={response} loading={loading} />

        <MessageInput loading={loading} onSend={sendPrompt} />
      </div>
    </div>
  );
}

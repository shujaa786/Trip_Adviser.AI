import api from "./axios";

import { API_ENDPOINTS } from "@trip-adviser/shared";

import type { ChatRequest, TripPlanResponse } from "@trip-adviser/shared";

export const planTrip = (payload: ChatRequest) =>
  api.post<TripPlanResponse>(API_ENDPOINTS.TRIPS.PLAN, payload);

export const getTrips = () => api.get(API_ENDPOINTS.TRIPS.LIST);

export const getTrip = (id: string) => api.get(API_ENDPOINTS.TRIPS.DETAIL(id));

export const deleteTrip = (id: string) =>
  api.delete(API_ENDPOINTS.TRIPS.DETAIL(id));

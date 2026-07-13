import api from "./axios";

import { API_ENDPOINTS } from "@trip-adviser/shared";

import type { LoginRequest, RegisterRequest } from "@trip-adviser/shared";

export const login = (payload: LoginRequest) =>
  api.post(API_ENDPOINTS.AUTH.LOGIN, payload);

export const register = (payload: RegisterRequest) =>
  api.post(API_ENDPOINTS.AUTH.REGISTER, payload);

export const me = () => api.get(API_ENDPOINTS.AUTH.ME);

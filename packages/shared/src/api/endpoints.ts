export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    ME: "/auth/me",
  },

  TRIPS: {
    PLAN: "/trips/plan",
    LIST: "/trips",
    DETAIL: (id: string) => `/trips/${id}`,
  },
} as const;

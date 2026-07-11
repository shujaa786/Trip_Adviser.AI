export interface Result<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export function ok<T>(data: T): Result<T> {
  return {
    success: true,
    data,
  };
}

export function fail<T = never>(message: string): Result<T> {
  return {
    success: false,
    error: message,
  };
}

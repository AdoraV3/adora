export type DataPayload<T> = {
  data: T;
  message?: string;
  ok?: boolean;
};

export interface LocationResponse {
  status: string;
  country: string;
  countryCode: string;
  timeZone: string;
}

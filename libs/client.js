import { createClient } from "microcms-js-sdk";

export const client = createClient({
  serviceDomain: "72pjdgm0sb",
  apiKey: process.env.API_KEY,
});

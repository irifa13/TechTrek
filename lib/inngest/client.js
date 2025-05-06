import { Inngest } from "inngest";

export const inngest = new Inngest({
  id: "techtrek", // Unique app ID
  name: "TechTrek",
  credentials: {
    gemini: {
      apiKey: process.env.GEMINI_API_KEY,
    },
  },
});
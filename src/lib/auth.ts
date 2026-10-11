import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
if (!uri) console.warn("MONGODB_URI is missing. Add it to .env.local to enable authentication.");
const client = new MongoClient(uri || "mongodb://127.0.0.1:27017/bazardor");
const databaseName = process.env["MARKET_PRICE_BD"] || process.env["market-price-bd"] || "bazardor";
const database = client.db(databaseName);

export const auth = betterAuth({
  appName: "Bazar Dor",
  database: mongodbAdapter(database),
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
  secret:
    process.env.BETTER_AUTH_SECRET || "development-only-change-this-secret-to-a-long-random-value",
  emailAndPassword: { enabled: true, requireEmailVerification: false },
  socialProviders: {
    ...(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
      ? {
          google: {
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          },
        }
      : {}),
    ...(process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET
      ? {
          github: {
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
          },
        }
      : {}),
  },
  user: { additionalFields: {} },
});

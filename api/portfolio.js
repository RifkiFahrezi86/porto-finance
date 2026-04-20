import { kv } from "@vercel/kv";

const PORTFOLIO_KEY = "portfolio:content";

function isKvConfigured() {
  return Boolean(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);
}

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");

  if (!isKvConfigured()) {
    return res.status(503).json({ error: "Vercel KV is not configured" });
  }

  if (req.method === "GET") {
    const data = await kv.get(PORTFOLIO_KEY);
    return res.status(200).json({ data: data ?? null });
  }

  if (req.method === "PUT") {
    await kv.set(PORTFOLIO_KEY, req.body);
    return res.status(200).json({ data: req.body });
  }

  res.setHeader("Allow", "GET, PUT");
  return res.status(405).json({ error: "Method not allowed" });
}
import { get, put } from "@vercel/blob";

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "4mb",
    },
  },
};

const SNAPSHOT_PATH = "portfolio/content.json";

function isBlobConfigured() {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}

async function readSnapshot(result) {
  if (!result?.stream) return null;

  const text = await new Response(result.stream).text();
  if (!text) return null;

  return JSON.parse(text);
}

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");

  if (!isBlobConfigured()) {
    return res.status(503).json({ error: "Vercel Blob is not configured" });
  }

  if (req.method === "GET") {
    try {
      const result = await get(SNAPSHOT_PATH, { access: "public" });
      const data = result ? await readSnapshot(result) : null;
      return res.status(200).json({ data });
    } catch (error) {
      return res.status(500).json({
        error: error instanceof Error ? error.message : "Failed to load portfolio snapshot",
      });
    }
  }

  if (req.method === "PUT") {
    try {
      const snapshot = req.body ?? null;
      await put(SNAPSHOT_PATH, JSON.stringify(snapshot), {
        access: "public",
        addRandomSuffix: false,
        allowOverwrite: true,
        cacheControlMaxAge: 60,
        contentType: "application/json",
      });

      return res.status(200).json({ data: snapshot });
    } catch (error) {
      return res.status(500).json({
        error: error instanceof Error ? error.message : "Failed to save portfolio snapshot",
      });
    }
  }

  res.setHeader("Allow", "GET, PUT");
  return res.status(405).json({ error: "Method not allowed" });
}
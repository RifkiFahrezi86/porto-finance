import { put } from "@vercel/blob";

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "12mb",
    },
  },
};

function isBlobConfigured() {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}

function sanitizeSegment(value) {
  const cleaned = String(value || "")
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/(^-|-$)/g, "");

  return cleaned || "file";
}

function parseDataUrl(dataUrl) {
  const match = /^data:(image\/[a-zA-Z0-9.+-]+);base64,(.+)$/s.exec(dataUrl || "");
  if (!match) {
    throw new Error("Invalid image data URL");
  }

  return {
    mimeType: match[1],
    buffer: Buffer.from(match[2], "base64"),
  };
}

function extensionFromMime(mimeType) {
  if (mimeType === "image/jpeg") return "jpg";
  if (mimeType === "image/svg+xml") return "svg";
  return mimeType.split("/")[1]?.replace("+xml", "") || "png";
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!isBlobConfigured()) {
    return res.status(503).json({ error: "Vercel Blob is not configured" });
  }

  try {
    const { dataUrl, folder = "uploads", filename = "image" } = req.body || {};
    const { mimeType, buffer } = parseDataUrl(dataUrl);
    const extension = extensionFromMime(mimeType);
    const safeFolder = String(folder)
      .split("/")
      .filter(Boolean)
      .map(sanitizeSegment)
      .join("/");
    const safeFilename = sanitizeSegment(filename);
    const pathname = `${safeFolder}/${Date.now()}-${safeFilename}.${extension}`;

    const uploadedFile = await put(pathname, buffer, {
      access: "public",
      contentType: mimeType,
      addRandomSuffix: false,
    });

    return res.status(200).json({ url: uploadedFile.url });
  } catch (error) {
    return res.status(400).json({
      error: error instanceof Error ? error.message : "Image upload failed",
    });
  }
}
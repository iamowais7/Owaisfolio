import { readdirSync } from "fs";
import { join } from "path";

const VIDEO_EXTS = new Set([".mp4", ".mov", ".webm", ".MP4", ".MOV", ".WEBM"]);
const IMAGE_EXTS = new Set([".jpg", ".jpeg", ".png", ".webp", ".JPG", ".JPEG", ".PNG", ".WEBP"]);

function scanDir(dir: string, urlPrefix: string) {
  try {
    return readdirSync(dir)
      .filter((f) => {
        const ext = f.slice(f.lastIndexOf("."));
        return VIDEO_EXTS.has(ext) || IMAGE_EXTS.has(ext);
      })
      .map((f) => {
        const ext = f.slice(f.lastIndexOf("."));
        return {
          src: `${urlPrefix}/${f}`,
          type: VIDEO_EXTS.has(ext) ? "video" : "image",
        } as { src: string; type: "video" | "image" };
      });
  } catch {
    return [];
  }
}

export async function GET() {
  const root = process.cwd();
  const files = [
    ...scanDir(join(root, "public/videos"), "/videos"),
    ...scanDir(join(root, "public/vibes"),  "/vibes"),
  ];
  return Response.json(files);
}

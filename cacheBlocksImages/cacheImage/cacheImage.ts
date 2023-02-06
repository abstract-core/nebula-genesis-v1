import { stat, writeFile } from "fs/promises";
import fetch from "node-fetch";

export default async function cacheImage(imageUrl: string, siteUrl: string) {
  const filename = imageUrl.split("?")[0].split("/").pop() || "";
  if (filename) {
    const filepath = `src/static/medias/${filename}`;
    try {
      await stat(filepath);
    } catch (err) {
      const res = await fetch(`${siteUrl}/static/medias/${filename}`);
      if (res.status === 404) {
        const res = await fetch(imageUrl);
        const buffer = await res.buffer();
        await writeFile(filepath, buffer);
      }
    }
    return filename;
  }
}

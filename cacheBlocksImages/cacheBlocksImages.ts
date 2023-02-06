import { BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import cacheImage from "./cacheImage/cacheImage";

export default async function cacheBlocksImages(
  blocks: BlockObjectResponse[],
  siteUrl: string
) {
  await Promise.all(
    blocks
      .filter((block) => block.type === "image" && block.image.type === "file")
      .map(async (block) => {
        /* Redudant block type checking for TS typing */
        if (block.type === "image" && block.image.type === "file") {
          const filename = await cacheImage(block.image.file.url, siteUrl);
          if (filename) {
            block.image.file.url = `/static/medias/${filename}`;
          }
        }
      })
  );
}

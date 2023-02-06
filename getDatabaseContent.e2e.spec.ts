import { Client } from "@notionhq/client";
import config from "./config";
import { readdir } from "node:fs/promises";
import getDatabaseContent from "./getDatabaseContent";
import { mkdir, rm, stat } from "node:fs/promises";

const mediaFolderPath = "src/static/medias/";

describe("Main E2E test run", () => {
  describe("Check against live site", () => {
    beforeAll(async () => {
      const notion = new Client({
        auth: config.NOTION_TOKEN,
      });

      await rm(mediaFolderPath, { recursive: true, force: true });
      await mkdir(mediaFolderPath, { recursive: true });

      await getDatabaseContent(
        notion,
        config.DATABASE_ID,
        "https://imrok.fr",
        /* I filter on illustration to avoid querying too much pages */
        {
          filter: {
            property: "Type de contenu",
            select: { equals: "Illustration" },
          },
        }
      );
    }, 15000);

    /**
     * Keep in mind that unpublished pages with pictures
     * may result in copying pages locally, failing test.
     */
    it("should not copy pictures locally", async () => {
      const content = await readdir(mediaFolderPath);
      expect(content.length).toEqual(0);
    });
  });

  describe("Check against inexistent site", () => {
    beforeAll(async () => {
      const notion = new Client({
        auth: config.NOTION_TOKEN,
      });

      await rm(mediaFolderPath, { recursive: true, force: true });
      await mkdir(mediaFolderPath, { recursive: true });

      await getDatabaseContent(
        notion,
        config.DATABASE_ID,
        "https://rimarok.com",
        /* I filter on a specific post to avoid querying too much pages */
        {
          filter: {
            property: "Url",
            rich_text: {
              equals: "/pensees/le-jeu-sans-regles",
            },
          },
        }
      );
    }, 15000);

    /**
     * Keep in mind that unpublished pages with pictures
     * may result in copying pages locally, failing test.
     */
    it("should copy pictures locally", async () => {
      const content = await readdir(mediaFolderPath);
      expect(content.length).toBeGreaterThan(0);
    });

    it("should resize big pictures", async () => {
      const base = await stat(`${mediaFolderPath}/jeu-sans-regles-neveucl.jpg`);
      expect(base).toBeTruthy();
      const resized = await stat(
        `${mediaFolderPath}/jeu-sans-regles-neveucl--min.jpg`
      );
      expect(resized).toBeTruthy();
    });
  });
});

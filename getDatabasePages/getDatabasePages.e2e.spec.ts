import { Client } from "@notionhq/client";
import E2E_CONFIG from "../config";
import getDatabasePages from "./getDatabasePages";

describe("getDatabasePages (e2e)", () => {
  let notionClient: Client;

  beforeAll(async () => {
    notionClient = new Client({
      auth: E2E_CONFIG.NOTION_TOKEN,
    });
  });

  describe("No parameters run", () => {
    it("should return some pages", async () => {
      const pages = await getDatabasePages(
        notionClient,
        E2E_CONFIG.DATABASE_ID
      );

      expect(pages.length).toBeGreaterThan(0);
    });
  });

  describe("Parameters runs", () => {
    describe("Correct parameter filter", () => {
      let pagesId: string[];

      beforeAll(async () => {
        pagesId = (
          await getDatabasePages(notionClient, E2E_CONFIG.DATABASE_ID, {
            filter: { property: "Contexte", select: { equals: "Contenu" } },
          })
        ).map(({ id }) => id);
      });

      it("should return some pages", async () => {
        expect(pagesId.length).toBeGreaterThan(0);
      });

      it("should includes target page id", async () => {
        expect(pagesId).toContain("76aa9f7a-c7f4-4f33-884e-92c2e863f256");
      });

      it("should not includes filtered page id", async () => {
        expect(pagesId).not.toContain("038d5002-7966-40eb-a432-f76ffecdfaac");
      });
    });

    describe("Inconsistent parameter filter", () => {
      it("should not return pages", async () => {
        const pages = await getDatabasePages(
          notionClient,
          E2E_CONFIG.DATABASE_ID,
          {
            filter: {
              property: "Contexte",
              select: { equals: "Inconsistent" },
            },
          }
        );

        expect(pages.length).toEqual(0);
      });
    });
  });
});

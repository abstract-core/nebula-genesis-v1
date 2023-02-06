import { Client } from "@notionhq/client";
import E2E_CONFIG from "../config";
import getPageBlocks from "./getPageBlocks";

describe("getPageBlocks (e2e)", () => {
  let notionClient: Client;

  beforeAll(async () => {
    notionClient = new Client({
      auth: E2E_CONFIG.NOTION_TOKEN,
    });
  });

  describe("No parameters run", () => {
    it("should return some blocks", async () => {
      const blocks = await getPageBlocks(
        notionClient,
        "038d5002-7966-40eb-a432-f76ffecdfaac"
      );

      expect(blocks.length).toBeGreaterThan(0);
    });
  });
});

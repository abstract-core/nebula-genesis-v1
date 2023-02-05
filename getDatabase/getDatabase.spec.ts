import { Client } from "@notionhq/client";
import { ExtendedBlockObjectResponse } from "statikon";
import * as getBlocks from "../getBlocks/getBlocks";
import getDatabase from "./getDatabase";

describe("getDatabase", () => {
  it("minimalistic run", async () => {
    const getBlocksSpy = jest
      .spyOn(getBlocks, "default")
      .mockImplementation(async () => []);
    await getDatabase(
      {
        databases: {
          query: async () => ({
            results: [{}],
          }),
        },
      } as unknown as Client,
      "id"
    );
    expect(getBlocksSpy).toHaveBeenCalled();
  });
});

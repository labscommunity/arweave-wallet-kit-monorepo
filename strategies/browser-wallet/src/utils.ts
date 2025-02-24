import { AoSigner } from "@arweave-wallet-kit/core/src/wallet";
import {
  ArconnectSigner,
  createData,
  Signer,
  DataItem,
} from "@dha-team/arbundles";
import { DataItem as ArconnectDataItem } from "arconnect";
import { z } from "zod";
import { createDataItemSigner } from "@permaweb/aoconnect";
export type ContractSigner = Signer | Window["arweaveWallet"] | AoSigner;

export function isAoSigner(value: unknown): value is AoSigner {
  const TagSchema = z.object({
    name: z.string(),
    value: z.union([z.string(), z.number()]),
  });

  const AoSignerSchema = z
    .function()
    .args(
      z.object({
        data: z.union([z.string(), z.instanceof(Buffer)]),
        tags: z.array(TagSchema).optional(),
        target: z.string().optional(),
        anchor: z.string().optional(),
      }),
    )
    .returns(
      z.promise(
        z.object({
          id: z.string(),
          raw: z.instanceof(ArrayBuffer),
        }),
      ),
    );
  try {
    AoSignerSchema.parse(value);
    return true;
  } catch {
    return false;
  }
}

export function createAoSigner(signer: ContractSigner): AoSigner {
  if (isAoSigner(signer)) {
    return signer;
  }

  if (!("publicKey" in signer)) {
    return createDataItemSigner(signer) as AoSigner;
  }

  const aoSigner = async ({
    data,
    tags,
    target,
    anchor,
  }: ArconnectDataItem) => {
    // ensure appropriate permissions are granted with injected signers.
    if (
      signer.publicKey === undefined &&
      "setPublicKey" in signer &&
      typeof signer.setPublicKey === "function"
    ) {
      await signer.setPublicKey();
    }
    if (signer instanceof ArconnectSigner) {
      // Sign using Arconnect signDataItem API
      const signedDataItem = await signer["signer"].signDataItem({
        data,
        tags,
        target,
        anchor,
      });
      const dataItem = new DataItem(Buffer.from(signedDataItem));
      return {
        id: dataItem.id,
        raw: dataItem.getRaw(),
      };
    }

    const dataItem = createData(data, signer, { tags, target, anchor });
    const signedData = dataItem.sign(signer).then(async () => ({
      id: dataItem.id,
      raw: dataItem.getRaw(),
    }));
    return signedData;
  };

  return aoSigner as unknown as AoSigner;
}

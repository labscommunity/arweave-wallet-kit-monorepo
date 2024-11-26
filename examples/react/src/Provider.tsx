import React from "react";
import { ArweaveWalletKit } from "@arweave-wallet-kit/react";
import BrowserWalletStrategy from "@arweave-wallet-kit/browser-wallet-strategy";
import ArConnectStrategy from "@arweave-wallet-kit/arconnect-strategy";
import OthentStrategy from "@arweave-wallet-kit/othent-strategy";
export default function Provider({ children }: { children: React.ReactNode }) {
  return (
    <ArweaveWalletKit
      config={{
        strategies: [
          new ArConnectStrategy(),
          new BrowserWalletStrategy(),
          new OthentStrategy(),
        ],
        permissions: ["ACCESS_ADDRESS", "SIGN_TRANSACTION","ACCESS_PUBLIC_KEY","ENCRYPT"],
        ensurePermissions: true,
        appInfo: {
          name: "LiquidOps",
          logo: "https://arweave.net/jgP-YC0385KYOc5YvRmqajQWxutpC1lb1_wkCsfWCBo",
        },
      }}
      theme={{
        displayTheme: "light",
        // accent: { r: 72, g: 68, b: 236 },
        // titleHighlight: { r: 72, g: 68, b: 236 },
        // radius: "default",
      }}
    >
      {children}
    </ArweaveWalletKit>
  );
}

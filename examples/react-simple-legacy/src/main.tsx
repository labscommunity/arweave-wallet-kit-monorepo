import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ArweaveWalletKit } from "arweave-wallet-kit";
import WanderStrategy from "@arweave-wallet-kit/wander-strategy";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ArweaveWalletKit
      config={{
        strategies: [new WanderStrategy()],
        permissions: [
          "ACCESS_ADDRESS",
          "SIGN_TRANSACTION",
          "ACCESS_PUBLIC_KEY",
          "ENCRYPT",
          "DECRYPT",
          "SIGNATURE",
          "ACCESS_TOKENS",
        ],
        ensurePermissions: true,
        appInfo: {
          name: "LiquidOps",
          logo: "https://arweave.net/jgP-YC0385KYOc5YvRmqajQWxutpC1lb1_wkCsfWCBo",
        },
      }}
      theme={{
        displayTheme: "light",
      }}
    >
      <App />
    </ArweaveWalletKit>
  </StrictMode>,
);

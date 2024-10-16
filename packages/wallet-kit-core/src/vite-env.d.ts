import { ArweaveWalletApi } from "./wallet";

/// <reference types="vite/client" />

declare global {
  interface Window {
    arweaveWallet?: ArweaveWalletApi;
  }

  interface WindowEventMap {
    walletSwitch: CustomEvent<{ address: string }>;
    arweaveWalletLoaded: CustomEvent<{}>;
  }
}
